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

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const maskG = document.querySelector('#hero-bat-mask g');
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = Math.max(120, Math.min(240, w * 0.12));
      const cy = h * 0.78;

      // Test scales from 5 to 25 to see when all 4 corners (0,0), (w,0), (0,h), (w,h) are inside the bat path
      const path = maskG.querySelector('path');
      const svg = document.querySelector('svg');

      function isPointInBat(px, py, scale) {
        // Inverse transform point to path space
        // point in svg: (px, py)
        // transform: translate(cx, cy) scale(scale) translate(-193.7, -117)
        // px = cx + (ptx - 193.7) * scale => ptx = 193.7 + (px - cx) / scale
        // py = cy + (pty - 117.0) * scale => pty = 117.0 + (py - cy) / scale
        const ptx = 193.7 + (px - cx) / scale;
        const pty = 117.0 + (py - cy) / scale;
        const svgPt = svg.createSVGPoint();
        svgPt.x = ptx;
        svgPt.y = pty;
        return path.isPointInFill(svgPt);
      }

      const corners = [
        { name: 'top-left (0,0)', x: 0, y: 0 },
        { name: 'top-right (w,0)', x: w, y: 0 },
        { name: 'bottom-left (0,h)', x: 0, y: h },
        { name: 'bottom-right (w,h)', x: w, y: h }
      ];

      const scaleResults = [];
      for (let s = 4; s <= 22; s += 0.5) {
        const covered = corners.every(c => isPointInBat(c.x, c.y, s));
        scaleResults.push({ s, covered });
        if (covered) break;
      }

      return {
        w, h, cx, cy,
        firstCoveredScale: scaleResults.find(r => r.covered)?.s
      };
    })()`,
    returnByValue: true
  });

  console.log('Scale coverage analysis:', res.result.value);
  ws.close();
}
main().catch(console.error);
