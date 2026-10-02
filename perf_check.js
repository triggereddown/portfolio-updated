const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/deepm/.gemini/antigravity-ide/brain/13fb7a42-18cd-4087-82aa-bb6aed5f7f03';

async function main() {
  const jsonRes = await fetch('http://127.0.0.1:9222/json');
  const pages = await jsonRes.json();
  const page = pages.find(p => p.type === 'page' && p.url.includes('localhost:3001'));
  if (!page) {
    console.error('Page not found');
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) cb.reject(new Error(JSON.stringify(msg.error)));
      else cb.resolve(msg.result);
    }
  };

  await new Promise((resolve) => (ws.onopen = resolve));

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const reqId = id++;
      callbacks.set(reqId, { resolve, reject });
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  };

  const capture = async (name) => {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const filePath = path.join(ARTIFACT_DIR, `${name}.png`);
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${name}.png`);
    return filePath;
  };

  console.log('Reloading page...');
  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 2000));

  // Run smooth continuous scroll test
  const perfRes = await send('Runtime.evaluate', {
    expression: `(async () => {
      const frameDeltas = [];
      let lastTime = performance.now();

      function scrollSmooth(targetY, durationMs) {
        return new Promise(resolve => {
          const startY = window.scrollY;
          const startTime = performance.now();

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            window.scrollTo(0, startY + (targetY - startY) * progress);

            const delta = now - lastTime;
            lastTime = now;
            frameDeltas.push(delta);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              resolve();
            }
          }
          requestAnimationFrame(tick);
        });
      }

      // 1. Scroll down through pin (1300px)
      await scrollSmooth(1300, 1000);
      await new Promise(r => setTimeout(r, 100));

      // 2. Scroll back up to 0
      await scrollSmooth(0, 1000);
      await new Promise(r => setTimeout(r, 100));

      // 3. Cycle 2 down
      await scrollSmooth(1300, 800);
      await new Promise(r => setTimeout(r, 100));

      // 4. Cycle 2 back up
      await scrollSmooth(0, 800);
      await new Promise(r => setTimeout(r, 100));

      const fps = frameDeltas.map(d => 1000 / d);
      const avgFps = fps.reduce((a, b) => a + b, 0) / fps.length;
      const minFps = Math.min(...fps);
      const droppedFrames = frameDeltas.filter(d => d > 33.3).length; // below 30fps

      return {
        totalFrames: frameDeltas.length,
        avgFps: avgFps.toFixed(1),
        minFps: minFps.toFixed(1),
        droppedFramesCount: droppedFrames,
        droppedFramesPercent: ((droppedFrames / frameDeltas.length) * 100).toFixed(1) + '%'
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });

  console.log('Scroll Benchmark Results:', perfRes.result.value);

  // Take screenshot at scroll 0 to verify restoration
  await capture('smooth_restored_0');

  // Scroll to 650px (mid-reveal) and capture
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 650);` });
  await new Promise(r => setTimeout(r, 400));
  await capture('smooth_mid_650');

  // Scroll to 1300px (full reveal) and capture
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 1300);` });
  await new Promise(r => setTimeout(r, 400));
  await capture('smooth_full_1300');

  // Scroll back to 0 and capture
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await new Promise(r => setTimeout(r, 400));
  await capture('smooth_final_back_0');

  ws.close();
}

main().catch(console.error);
