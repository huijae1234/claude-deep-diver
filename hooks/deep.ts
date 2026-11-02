// 심해와 해구 바닥: 대왕문어, 해적선과 보물
import { EYE, bob, r2 } from './draw'

// ── 대왕문어: 원점 = 다리가 모이는 곳, 머리는 위, 다리 8개는 아래로 꿈틀 ──
// 굵게 시작해 S자로 늘어지다 끝이 돌돌 말린 다리, 안쪽에 빨판 줄
const octoArm = (rot: number, L: number, dur: number, fill: string) => {
  const suckers = [0.12, 0.25, 0.38, 0.5, 0.62, 0.74, 0.85].map((t, i) =>
    `<circle cx="${r2(7 - t * 5)}" cy="${r2(L * t)}" r="${r2(2.6 - i * 0.25)}" fill="#fed7aa" stroke="#c2410c" stroke-width="0.4"/>`).join('')
  return `<g transform="rotate(${rot})"><animateTransform attributeName="transform" type="rotate" values="${rot - 6};${rot + 6};${rot - 6}" dur="${dur}s" repeatCount="indefinite"/>`
    + `<path d="M-11 0 C-17 ${r2(L * 0.3)} 6 ${r2(L * 0.5)} -2 ${r2(L * 0.78)} C-8 ${r2(L * 0.9)} -6 ${L + 8} 4 ${L + 6} C12 ${L + 4} 10 ${L - 6} 3 ${L - 4} C10 ${r2(L * 0.62)} 13 ${r2(L * 0.3)} 11 0Z" fill="${fill}"/>`
    + suckers + `</g>`
}
const octoEye = (x: number) => `<circle cx="${x}" cy="-6" r="6.5" fill="#f97316"/><circle cx="${x}" cy="-6" r="4.2" fill="#fde68a"/>`
  + `<rect x="${x - 2.6}" y="-6.9" width="5.2" height="1.8" rx="0.9" fill="${EYE}"/><circle cx="${x + 1.5}" cy="-7.8" r="0.8" fill="#fff"/>`
  + `<path d="M${x - 6} -12 q6 -4 12 0" stroke="#9a3412" stroke-width="1.4" fill="none"/>`
export const GIANT_OCTOPUS = bob(-4, 5, `<g class="giant-octopus">`
  // 뒤쪽 다리는 조금 어둡게 먼저, 앞쪽 다리는 밝게 나중에 그려 겹친 느낌을 낸다
  + [[-50, 74, 5], [-18, 90, 5.4], [18, 88, 4.8], [50, 72, 4.4]].map(([rot, len, dur]) => octoArm(rot, len, dur, '#b8400b')).join('')
  + `<ellipse cy="4" rx="30" ry="11" fill="#e2581a"/>`
  + [[-64, 66, 4.2], [-32, 84, 4.6], [-6, 92, 5.2], [6, 90, 5.8], [32, 82, 5.2], [64, 64, 5.6]].map(([rot, len, dur]) => octoArm(rot, len, dur, '#dc4f0e')).join('')
  + `<path d="M-24 0 q-6 -30 6 -50 q18 -22 36 0 q12 20 6 50z" fill="#ea580c"/>`
  + `<path d="M-14 -40 q8 -12 20 -6" stroke="#fdba74" stroke-width="3" fill="none" opacity="0.6"/>`
  + [[-10, -30, 2.2], [6, -38, 1.8], [12, -24, 2], [-4, -46, 1.5], [-16, -18, 1.6], [16, -44, 1.3]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#c2410c"/>`).join('')
  + octoEye(-13) + octoEye(13)
  + `<path d="M22 -4 q6 -1 7 3 q-3 2 -6 0z" fill="#c2410c"/>` // 숨 쉬는 관
  + `</g>`)

// ── 해적선: 원점 = 왼쪽 용골, 바닥에 기울어 가라앉아 있다 ──
const jollyRoger = `<g transform="translate(50,-92)"><g><animateTransform attributeName="transform" type="skewY" values="0;8;0" dur="2.4s" repeatCount="indefinite"/>`
  + `<path d="M0 0 h20 l-2 6 l2 6 h-20z" fill="#111111"/>`
  + `<circle cx="9" cy="5" r="3" fill="#f5f5f4"/><rect x="7.5" y="7" width="3" height="2" fill="#f5f5f4"/>`
  + `<circle cx="8" cy="4.7" r="0.8" fill="#111"/><circle cx="10.2" cy="4.7" r="0.8" fill="#111"/>`
  + `<path d="M4.5 8.5 l9 3 M13.5 8.5 l-9 3" stroke="#f5f5f4" stroke-width="1.1" stroke-linecap="round"/></g></g>`
export const PIRATE_SHIP = `<g class="pirate" transform="rotate(-6 60 0)">`
  + `<path d="M-30 -34 l-16 -8" stroke="#3a2414" stroke-width="2"/><path d="M-18 -26 l-14 -10 l6 14z" fill="#4a2f1b"/>`
  + `<path d="M110 -26 v-16 h32 l4 16z" fill="#5a3a22"/>`
  + [116, 126, 136].map(x => `<rect x="${x}" y="-38" width="5" height="5" fill="#1a120b" stroke="#c9a227" stroke-width="0.5"/>`).join('')
  + `<path d="M110 -42 h32" stroke="#c9a227" stroke-width="1"/>`
  + `<path d="M-18 -26 h162 l-8 20 q-70 10 -146 0z" fill="#4a2f1b"/>`
  + `<path d="M-18 -26 h162" stroke="#c9a227" stroke-width="1.5"/><path d="M-14 -18 h154 M-10 -10 h146" stroke="#3a2414" stroke-width="1"/>`
  + [10, 35, 60, 85].map(x => `<rect x="${x}" y="-22" width="6" height="5" fill="#120c07"/><rect x="${x + 5}" y="-20.6" width="5" height="2.4" fill="#262626"/>`).join('')
  + `<path d="M40 -8 l6 -6 l5 3 l4 -5 l3 8 l-4 6 l-8 1z" fill="#0d0805"/>`
  + [[0, -4], [24, -12], [96, -6], [130, -14], [70, -3]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#3f6b3a"/>`).join('')
  + `<path d="M60 -26 L50 -92" stroke="#3a2414" stroke-width="4"/><path d="M38 -76 l26 4" stroke="#3a2414" stroke-width="2.5"/>`
  + `<path d="M40 -74 l22 3.5 l-3 22 l-4 -4 l-3 5 l-5 -6 l-4 4z" fill="#d6c7a1" opacity="0.8"/>`
  + `<path d="M100 -26 l4 -24 l3 4 l2 -6" stroke="#3a2414" stroke-width="3" fill="none"/>`
  + `<path d="M50 -88 q20 30 60 62" stroke="#8b6b45" stroke-width="0.6" fill="none"/>`
  + jollyRoger + `</g>`

// ── 바닥에 흩어진 보물: 원점 = 바닥 높이 ──
const coin = ([x, y]: number[]) => `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.2" fill="#facc15" stroke="#a16207" stroke-width="0.4"/>`
const gem = ([x, y]: number[], color: string) => `<path d="M${x} ${y - 2.5} l2 2.5 l-2 2.5 l-2 -2.5z" fill="${color}" stroke="#ffffff" stroke-width="0.3"/>`
const sparkle = ([x, y]: number[], begin: number) =>
  `<path d="M${x} ${y - 3} v6 M${x - 3} ${y} h6" stroke="#fff7c2" stroke-width="0.8" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="${begin}s" repeatCount="indefinite"/></path>`
const chest = `<g transform="translate(70,-2)"><ellipse cy="-12" rx="16" ry="8" fill="#fde68a" opacity="0.18"/>`
  + `<path d="M-11 -10 l-3 -10 h22 l3 10z" fill="#7c4a1e" stroke="#c9a227" stroke-width="0.8"/>`
  + [[-8, -12], [-4, -13], [0, -12.5], [4, -13], [8, -12], [-6, -10.5], [2, -10.5]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="2.2" fill="#fbbf24" stroke="#a16207" stroke-width="0.3"/>`).join('')
  + `<rect x="-11" y="-10" width="22" height="10" fill="#8b5a2b" stroke="#c9a227" stroke-width="0.8"/>`
  + `<path d="M-4 -10 v10 M4 -10 v10" stroke="#c9a227" stroke-width="1.2"/><rect x="-1.5" y="-8" width="3" height="3" fill="#facc15"/>`
  + [[11, -8], [12.5, -6], [13.5, -4], [14.5, -2], [15.5, 0]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.9" fill="#f8fafc"/>`).join('')
  + sparkle([-3, -14], 0) + sparkle([6, -13], 1) + `</g>`
export const TREASURE = `<g class="treasure">` + chest
  + [[20, -2], [30, -1], [42, -2], [52, -1], [96, -1], [104, -2], [118, -1], [318, -5], [330, -6], [340, -5]].map(coin).join('')
  + gem([36, -3], '#ef4444') + gem([58, -3], '#22c55e') + gem([110, -3], '#3b82f6') + gem([326, -7], '#a855f7') + gem([345, -6], '#ef4444')
  + `<path d="M85 -9 h6 q0 4 -3 5 v3 h2 v1 h-6 v-1 h2 v-3 q-3 -1 -3 -5z" fill="#eab308" stroke="#a16207" stroke-width="0.4"/>`
  + sparkle([42, -3], 0.5) + sparkle([330, -7], 1.4) + sparkle([104, -3], 0.9)
  + `</g>`
