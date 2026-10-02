async function main() {
  const jsonRes = await fetch('http://127.0.0.1:9222/json');
  const pages = await jsonRes.json();
  const page = pages.find(p => p.type === 'page' && p.url.includes('localhost:3001'));
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const reqId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === reqId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: reqId, method, params }));
  });

  const testOps = await send('Runtime.evaluate', {
    expression: `(() => {
      const results = {};

      // 1. Time mask transform setAttribute
      const maskG = document.querySelector('#hero-bat-mask g');
      let t0 = performance.now();
      for (let i = 0; i < 50; i++) {
        maskG.setAttribute('transform', \`translate(180, 560) scale(\${0.4 + i*0.1}) translate(-193.7, -117)\`);
        // force layout / style
        maskG.getBoundingClientRect();
      }
      results.maskTransform50x = (performance.now() - t0).toFixed(2) + 'ms';

      // 2. Time stroke transform setAttribute
      const strokeG = document.querySelector('svg g');
      t0 = performance.now();
      for (let i = 0; i < 50; i++) {
        strokeG.setAttribute('transform', \`translate(180, 560) scale(\${0.4 + i*0.1}) translate(-193.7, -117)\`);
        strokeG.getBoundingClientRect();
      }
      results.strokeTransform50x = (performance.now() - t0).toFixed(2) + 'ms';

      // 3. Time window.scrollTo
      t0 = performance.now();
      for (let i = 0; i < 20; i++) {
        window.scrollTo(0, i * 50);
      }
      results.scrollTo20x = (performance.now() - t0).toFixed(2) + 'ms';

      // 4. Check all scroll listeners on window
      results.scrollY = window.scrollY;

      return results;
    })()`,
    returnByValue: true
  });

  console.log('DOM operation timings:', testOps.result.value);
  ws.close();
}
main().catch(console.error);
