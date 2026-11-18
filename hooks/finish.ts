// 100% 도착: 해구 바닥에 똑바로 서서 만세하고 깃발을 꽂는다(원점 = 발바닥)

export const isAtBottom = (percent = 0): boolean => percent >= 100

// 팔 하나: 어깨(sx, -28)를 축으로 위로 뻗은 채 흔든다
const arm = (sx: number, from: number, to: number, dur: number) =>
  `<g><animateTransform attributeName="transform" type="rotate" values="${from} ${sx} -28;${to} ${sx} -28;${from} ${sx} -28" dur="${dur}s" repeatCount="indefinite"/>`
  + `<rect x="${sx - 1.5}" y="-44" width="3" height="16" rx="1.5" fill="#1b2433"/><circle cx="${sx}" cy="-45" r="2.2" fill="#ffd23f"/></g>`

const cheeringDiver = `<g class="cheer"><g>`
  + `<animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0;0,0" keyTimes="0;0.25;0.5;1" dur="0.9s" repeatCount="indefinite"/>`
  + `<g shape-rendering="crispEdges">`
  + `<rect x="-11" y="-30" width="5" height="13" rx="2" fill="#ffb300"/>` // 등의 산소통
  + `<path d="M-9 0 h7 v-3 h-7z M2 0 h7 v-3 h-7z" fill="#00a3a3"/>` // 오리발
  + `<rect x="-6" y="-16" width="4" height="13" fill="#1b2433"/><rect x="2" y="-16" width="4" height="13" fill="#1b2433"/>` // 다리
  + `<rect x="-7" y="-31" width="14" height="16" rx="3" fill="#1b2433"/>` // 몸통
  + arm(-6, -30, -10, 0.45) + arm(6, 30, 10, 0.45)
  + `<circle cx="0" cy="-37" r="6" fill="#ffd23f"/><rect x="-4.5" y="-39" width="9" height="4" rx="1.5" fill="#8fe3ff"/>` // 머리·마스크
  + `<path d="M-2 -32.5 q2 2 4 0" stroke="#7c2d12" stroke-width="1" fill="none"/>` // 웃는 입
  + `</g></g></g>`

// 바닥에 꽂힌 깃발: 천이 물살에 펄럭인다
const flag = `<g class="flag" transform="translate(26,0)">`
  + `<ellipse cy="0" rx="7" ry="2" fill="#3b2a1a"/>`
  + `<rect x="-1" y="-48" width="2" height="48" fill="#cbd5e1"/><circle cy="-49" r="2" fill="#facc15"/>`
  + `<g><animateTransform attributeName="transform" type="skewY" values="0;-8;0;6;0" dur="1.6s" repeatCount="indefinite"/>`
  + `<path d="M1 -47 h22 l-5 7 l5 7 h-22z" fill="#b3261e"/>`
  + `<text x="10" y="-37" font-size="7" font-weight="800" fill="#ffffff" text-anchor="middle">100</text></g></g>`

// 위에서 반짝이 종이가 팔랑팔랑 떨어진다
const confetti = [[-30, '#facc15', 0], [-12, '#f472b6', 0.6], [8, '#60a5fa', 1.1], [40, '#34d399', 0.3], [56, '#facc15', 0.9], [-44, '#a78bfa', 1.4]]
  .map(([x, color, begin]) =>
    `<rect x="${x}" y="-90" width="3" height="5" fill="${color}">`
    + `<animate attributeName="y" values="-90;4" dur="2.2s" begin="${begin}s" repeatCount="indefinite"/>`
    + `<animateTransform attributeName="transform" type="rotate" values="0 ${x} -40;180 ${x} -40;360 ${x} -40" dur="2.2s" begin="${begin}s" repeatCount="indefinite"/></rect>`)
  .join('')

// 깜깜한 바닥이라 위에서 축하 조명을 비춰 잘 보이게 한다
const spotlight = `<path d="M-14 -90 h28 l26 90 h-80z" fill="#fff6b0" opacity="0.22"/>`
  + `<ellipse cy="0" rx="34" ry="5" fill="#fff6b0" opacity="0.35"/>`

export const celebration = (x: number, y: number) =>
  `<g transform="translate(${x},${y})">${spotlight}${flag}<g transform="scale(1.15)">${cheeringDiver}</g>${confetti}</g>`
