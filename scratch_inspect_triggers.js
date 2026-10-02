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

  // Check ScrollTriggers
  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const triggers = window.ScrollTrigger ? window.ScrollTrigger.getAll().map(st => ({
        id: st.vars.id || 'unnamed',
        trigger: st.trigger ? (st.trigger.tagName + '.' + st.trigger.className) : 'no trigger',
        start: st.start,
        end: st.end,
        pin: !!st.pin,
        scrub: st.vars.scrub
      })) : 'no ScrollTrigger on window';
      return {
        triggers,
        threeCanvas: document.querySelectorAll('canvas').length,
        hasLenis: !!window.lenis,
      };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(res.result.value, null, 2));
  ws.close();
}
main().catch(console.error);
