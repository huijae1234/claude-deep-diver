// 생물 그림에서 같이 쓰는 도구
export const EYE = '#111827'

export const r2 = (n: number) => +n.toFixed(2)

// 눈마다 반짝이는 점을 넣어 살아 있는 느낌을 준다
export const eye = (x: number, y: number, r = 1.3) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${EYE}"/>`
  + `<circle cx="${r2(x + r * 0.35)}" cy="${r2(y - r * 0.35)}" r="${r2(Math.max(0.3, r * 0.35))}" fill="#fff"/>`

// (cx, cy)를 축으로 살랑살랑 흔든다
export const wag = (cx: number, cy: number, deg: number, dur: number, body: string) =>
  `<g>${body}<animateTransform attributeName="transform" type="rotate" values="${-deg} ${cx} ${cy};${deg} ${cx} ${cy};${-deg} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/></g>`

// 위아래로 둥실둥실
export const bob = (dy: number, dur: number, body: string) =>
  `<g>${body}<animateTransform attributeName="transform" type="translate" values="0,0;0,${dy};0,0" dur="${dur}s" repeatCount="indefinite"/></g>`
