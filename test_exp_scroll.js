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

  const scrollTo = async (y) => {
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${y}, behavior: 'instant' }); window.scrollY;`
    });
    await new Promise(r => setTimeout(r, 350));
  };

  console.log('Reloading page...');
  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 2000));

  await scrollTo(0);
  await capture('exp_scroll_0');

  await scrollTo(200);
  await capture('exp_scroll_200');

  await scrollTo(500);
  await capture('exp_scroll_500');

  await scrollTo(750);
  await capture('exp_scroll_750');

  await scrollTo(950);
  await capture('exp_scroll_950');

  console.log('Coming back up...');
  await scrollTo(750);
  await capture('exp_back_750');

  await scrollTo(400);
  await capture('exp_back_400');

  await scrollTo(150);
  await capture('exp_back_150');

  await scrollTo(0);
  await capture('exp_back_0');

  console.log('Done!');
  ws.close();
}

main().catch(console.error);
