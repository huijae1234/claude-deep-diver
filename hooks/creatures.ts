// 수심 구간별 바다 생물. 모두 원점 기준, 오른쪽을 보고 있다.
import { EYE, bob, eye, wag } from './draw'

// ── 0~20%: 햇살 바다 ──
const tang = wag(-10, 0, 10, 0.6, `<path d="M-10 0 l-7 -6 q1 6 0 12z" fill="#ffb800"/><path d="M-11 0 l-5 -3 M-11 0 l-5 3 M-11 0 h-5" stroke="#e09a00" stroke-width="0.4"/>`)
  + `<path d="M-8 -4 q4 -9 13 -6 l0 2z" fill="#ffc400"/><path d="M-8 4 q4 9 13 6 l0 -2z" fill="#ffc400"/>`
  + `<path d="M-10 0 q4 -11 14 -6 q6 3 6 6 q0 3 -6 6 q-10 5 -14 -6z" fill="#ffd21f"/>`
  + `<path d="M-9 2 q8 6 19 1 q-2 3 -6 4 q-9 3 -13 -5z" fill="#f2b600" opacity="0.6"/>`
  + `<path d="M-4 -7 q4 -3 9 -1" stroke="#fff3a0" fill="none"/>`
  + `<path d="M-7.5 0.6 l2.6 -0.9" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>`
  + `<path d="M2 1 q-4 1 -5 4 q4 0 5 -4z" fill="#ffe680"/><circle cx="9.7" cy="0.2" r="0.5" fill="#c98a00"/>${eye(5, -2)}`

const clown = wag(-9, 0, 12, 0.5, `<path d="M-9 0 l-6 -5 q-1 5 0 10z" fill="#ff7a1a"/><path d="M-15 -5 q-1 5 0 10" stroke="#111" stroke-width="0.9" fill="none"/>`)
  + `<path d="M-6 -4 q4 -5 10 -1z" fill="#ff8c2a" stroke="#111" stroke-width="0.5"/>`
  + `<ellipse rx="9" ry="5" fill="#ff8c2a"/><ellipse cy="2.4" rx="7.5" ry="2.3" fill="#e8650c" opacity="0.5"/>`
  + `<path d="M-5 -3.8 q5 -2 10 -0.5" stroke="#ffc58a" stroke-width="0.7" fill="none"/>`
  + `<path d="M3.5 -4.6 q1.5 4.6 0 9.2 h2.2 q1.5 -4.6 0 -9.2z" fill="#fff" stroke="#111" stroke-width="0.6"/>`
  + `<path d="M-2 -5 q-1.5 5 0 10 h2.6 q-1.5 -5 0 -10z" fill="#fff" stroke="#111" stroke-width="0.6"/>`
  + `<path d="M-7.8 -3 q-0.8 3 0 6 h1.8 q-0.8 -3 0 -6z" fill="#fff" stroke="#111" stroke-width="0.6"/>`
  + `<ellipse cx="1" cy="2.6" rx="2.2" ry="1.1" fill="#ff9d47" stroke="#111" stroke-width="0.4" transform="rotate(30 1 2.6)"/>${eye(6.6, -1, 1.1)}`

const minnow = (x: number, y: number) =>
  `<g transform="translate(${x},${y})"><path d="M-5 0 l-3 -2.2 l1 2.2 l-1 2.2z" fill="#2a9fd6"/><ellipse rx="5" ry="2" fill="#3fc3ff"/>`
  + `<path d="M-5 0 q5 -3.5 10 0 q-5 -1 -10 0z" fill="#1d7fb8"/><ellipse cy="1" rx="4" ry="0.7" fill="#d9f3ff"/>`
  + `<path d="M-4 0.3 h7" stroke="#e0f7ff" stroke-width="0.4"/>${eye(3, -0.4, 0.6)}</g>`
const school = [[0, 0], [9, -5], [10, 5], [19, 0], [-8, 6]].map(([x, y]) => minnow(x, y)).join('')

const seal = wag(-22, 0, 8, 1.2, `<path d="M-22 0 l-9 -6 l3 6 l-3 6z" fill="#6f7b88"/><path d="M-27 -2 l3 2 l-3 2" stroke="#59636f" stroke-width="0.5" fill="none"/>`)
  + `<ellipse rx="22" ry="8" fill="#8d99a6"/><ellipse cy="3.5" rx="15" ry="3.5" fill="#c3ccd4"/>`
  + `<path d="M-16 -5 q14 -6 32 -3" stroke="#a9b4bf" stroke-width="1" fill="none"/>`
  + [[-10, -4, 1.2], [-4, -5.5, 0.9], [2, -3.5, 1.1], [-14, -1, 0.8], [8, -5, 0.8]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#6f7b88"/>`).join('')
  + `<circle cx="19" cy="-2.5" r="8" fill="#8d99a6"/>`
  // 부리처럼 보이지 않게 주둥이는 둥근 머리 안에 통통하게, 코는 점 하나
  + `<circle cx="23.5" cy="0.5" r="2.6" fill="#b4bec8"/><circle cx="23.5" cy="2.6" r="2.2" fill="#b4bec8"/>`
  + `<ellipse cx="25.6" cy="-1.3" rx="1.3" ry="0.9" fill="${EYE}"/>${eye(20.5, -5, 1.8)}`
  + `<path d="M24 1 q4 -1 6 -3 M24 2 q4 0 6.5 0.5 M24 3 q3.5 1 5.5 3" stroke="#e5e7eb" stroke-width="0.4" fill="none"/>`
  + `<path d="M4 6 l-4 8 l8 -6z" fill="#6f7b88"/><path d="M1 12 l1 -2 M3 11.5 l1 -2" stroke="#4b5563" stroke-width="0.4"/>`

// ── 20~40%: 상어(사납게), 돌고래(얄쌍하게) ──
// 상어: 위가 긴 초승달 꼬리, 뾰족한 코, 벌린 입과 이빨 두 줄, 찡그린 눈
const shark = wag(-28, 0, 7, 0.9, `<path d="M-28 -1 q-8 -10 -14 -22 q3 13 1 22 q-2 5 -7 10 q10 -4 20 -9z" fill="#4b5563"/>`)
  + `<path d="M-19 -6 l2 -5 l4 5z M-17 6 l1 4 l3 -4z" fill="#4b5563"/>`
  + `<path d="M-30 0 q10 -12 34 -10 q16 1 28 9 q-10 8 -26 9 q-24 2 -36 -8z" fill="#5f6b78"/>`
  + `<path d="M-26 2 q20 8 48 3 q-8 5 -22 6 q-16 1 -26 -9z" fill="#eef0f2"/>`
  + `<path d="M-26 -3 q14 -9 38 -8" stroke="#77838f" stroke-width="1" fill="none"/>`
  + `<path d="M-6 -10 l4 -18 l12 17z" fill="#4b5563"/><path d="M6 6 l-10 12 l16 -9z" fill="#4b5563"/>`
  + `<path d="M-6 -3 l4 2 M-4 -4.5 l3 3 M-12 1 l3 1" stroke="#9ca3af" stroke-width="0.5"/>`
  + [10, 12.4, 14.8, 17.2].map(x => `<path d="M${x} -4 q-1 3.5 0 7" stroke="#374151" stroke-width="0.8" fill="none"/>`).join('')
  + `<path d="M17 3.5 q7 1 15 -3 l-1.5 3 q-6 4.5 -13.5 3z" fill="#7f1d1d"/>`
  + `<path d="M18 3.8 l0.8 1.3 l0.8 -1.3 l0.8 1.3 l0.8 -1.4 l0.8 1.2 l0.8 -1.5 l0.8 1.1 l0.8 -1.7 l0.7 1" stroke="#fff" stroke-width="0.5" fill="none"/>`
  + `<path d="M19 6.4 l0.8 -1 l0.8 1 l0.8 -1.1 l0.8 1 l0.8 -1.2 l0.8 0.9" stroke="#fff" stroke-width="0.5" fill="none"/>`
  + `${eye(23, -3, 1.2)}<path d="M20.4 -5.6 l5 1.8" stroke="#1f2937" stroke-width="1" stroke-linecap="round"/><circle cx="29" cy="-1.5" r="0.5" fill="#374151"/>`

// 돌고래: 가늘고 긴 몸, 둥근 이마와 긴 주둥이, 뒤로 휜 등지느러미, 가로로 누운 꼬리
const dolphinOf = (back: string, side: string, belly: string) =>
  wag(-22, 1, 9, 0.8, `<path d="M-22 1 q-6 -4 -13 -3 q4 3 0 6 q7 1 13 -3z" fill="${back}"/>`)
  + `<path d="M-3 -6 q1 -7 -5 -12 q9 2 11 11z" fill="${back}"/>`
  + `<path d="M-23 1 q8 -8 24 -8 q9 0 14 3 q2 -1 4 1 l10 2 q1 1 0 1.6 l-10 0.6 q-6 4 -18 4.5 q-16 0.5 -24 -4.7z" fill="${side}"/>`
  + `<path d="M-18 2.5 q16 5 36 1.5 q-8 3.5 -18 3.5 q-12 0 -18 -5z" fill="${belly}"/>`
  + `<path d="M-16 -2 q12 -7 30 -4" stroke="#ffffff" stroke-opacity="0.35" stroke-width="0.8" fill="none"/>`
  + `<path d="M5 3 q-1 5 -6 7 q2 -4 3 -7z" fill="${back}"/><path d="M4 -7.3 q1 -0.7 2 0" stroke="${back}" stroke-width="0.7" fill="none"/>`
  + `${eye(16, -1.8, 1.1)}<path d="M19 1.3 q5 1.2 10 0.5" stroke="${back}" stroke-width="0.6" fill="none"/>`
export const DOLPHIN = dolphinOf('#4f7aa3', '#6b97c2', '#dde9f4')
// 아마존 분홍 돌고래: 가끔만 나온다
export const PINK_DOLPHIN = dolphinOf('#d9638f', '#f5a3c0', '#ffe0ec')

// ── 40~60%: 고래 가족, 대왕오징어, 토끼 태운 자라 ──
const whaleBody = wag(-70, 0, 6, 3, `<path d="M-70 0 l-20 -15 q7 15 0 15 q7 2 0 15z" fill="#22406c"/>`)
  + `<path d="M-70 0 q10 -25 60 -25 q42 0 54 17 q4 8 -4 14 q-30 14 -82 10 q-20 -2 -28 -16z" fill="#2c4a7a"/>`
  + `<path d="M-58 -10 q20 -14 60 -13" stroke="#3d5f93" stroke-width="2" fill="none"/>`
  + `<path d="M-40 12 q30 8 70 -2 q-30 14 -70 2z" fill="#c9d8e6" opacity="0.45"/>`
  + `<path d="M-50 8 q40 10 88 0" stroke="#5d7fae" fill="none" stroke-width="1.2"/>`
  + `<path d="M-46 12 q40 8 80 -1 M-40 15 q36 6 68 -2" stroke="#5d7fae" fill="none" stroke-width="1"/>`
  + `<path d="M24 4 q12 2 20 -6" stroke="#1a3459" fill="none" stroke-width="1"/>`
  + [[20, -14], [26, -11], [32, -8], [37, -5], [29, -13]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="#4a6ea3"/>`).join('')
  + `<path d="M0 10 q-10 18 -30 20 q10 -6 22 -20z" fill="#22406c"/><path d="M-2 13 q-10 14 -26 16" stroke="#d6e4f2" stroke-width="0.8" fill="none"/>${eye(30, -2, 1.8)}`
  + `<circle cx="10" cy="-18" r="1.2" fill="#9fc3e8"/><circle cx="-14" cy="-12" r="1" fill="#9fc3e8"/>`
const whales = whaleBody + `<g transform="translate(-48,26) scale(0.42)">${whaleBody}</g>`

// 수면 근처 고래: 8초마다 숨구멍으로 물을 뿜는다
const spout = `<path d="M0 0 q-3 -60 -22 -100 q14 14 22 44 q8 -30 22 -44 q-19 40 -22 100z" fill="#ffffff" opacity="0.85"/>`
  + [[-24, -104], [22, -102], [-12, -112], [10, -114], [0, -118]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#e0f7ff"/>`).join('')
const spoutingWhale = whaleBody
  + `<g class="spout" transform="translate(16,-24)"><g><animateTransform attributeName="transform" type="scale" values="1 0;1 0;1 1;1 1.1;1 0;1 0" keyTimes="0;0.6;0.66;0.76;0.82;1" dur="8s" repeatCount="indefinite"/>${spout}</g></g>`

const tentacle = (x: number, y: number, len: number, swing: number, dur: number) =>
  `<path d="M${x} ${y} q${len / 3} ${swing} ${len / 1.5} 0 t${len / 3} ${-swing / 2}" stroke="#c2412d" stroke-width="2" fill="none" stroke-linecap="round">`
  + `<animate attributeName="d" values="M${x} ${y} q${len / 3} ${swing} ${len / 1.5} 0 t${len / 3} ${-swing / 2};M${x} ${y} q${len / 3} ${-swing} ${len / 1.5} 0 t${len / 3} ${swing / 2};M${x} ${y} q${len / 3} ${swing} ${len / 1.5} 0 t${len / 3} ${-swing / 2}" dur="${dur}s" repeatCount="indefinite"/></path>`
// 오징어는 뒤로(왼쪽으로) 헤엄치므로 촉수가 오른쪽
const squid = `<path d="M-22 0 l-14 -9 l-4 9 l4 9z" fill="#a8321f"/>`
  + `<path d="M-30 0 q12 -10 36 -6 q6 2 6 6 q0 4 -6 6 q-24 4 -36 -6z" fill="#c2412d"/>`
  + `<path d="M-26 -3 q14 -7 32 -4" stroke="#e0715a" stroke-width="0.8" fill="none" opacity="0.8"/>`
  + [[-12, -2, 1.6], [-4, 2, 1.4], [-18, 2, 1.2], [-22, -1, 0.9], [-8, -4, 1], [0, -2, 0.9], [-14, 3.5, 0.8]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#e0715a"/>`).join('')
  + [-4, -1.5, 1, 3.5].map((dy, i) => tentacle(12, dy, 26 + i * 3, 4, 1.6 + i * 0.3)).join('')
  + tentacle(12, 0, 52, 6, 2.4)
  + `<ellipse cx="10" cy="0" rx="4" ry="4.8" fill="#b33a27"/>`
  + `<circle cx="8" cy="-1" r="3.2" fill="#fff6d6" stroke="#7a1f12" stroke-width="0.6"/>${eye(8.6, -1, 1.6)}`

// 별주부전: 자라 등에 토끼가 앉아 간다
const flipper = (x: number, d: string) => wag(x, 4, 18, 1.4, `<path d="${d}" fill="#7d9a4f"/>`)
const rabbit = `<g class="rabbit" stroke="#cbd5e1" stroke-width="0.4">`
  + `<circle cx="-7" cy="-16" r="2" fill="#ffffff"/><ellipse cx="-1" cy="-17" rx="6" ry="5" fill="#ffffff"/>`
  + wag(4, -26, 6, 1.6, `<ellipse cx="2.5" cy="-32" rx="1.7" ry="5.5" fill="#ffffff" transform="rotate(-15 2.5 -32)"/><ellipse cx="2.5" cy="-32" rx="0.7" ry="4" fill="#f9a8d4" stroke="none" transform="rotate(-15 2.5 -32)"/>`
    + `<ellipse cx="6" cy="-31.5" rx="1.7" ry="5.5" fill="#ffffff" transform="rotate(10 6 -31.5)"/><ellipse cx="6" cy="-31.5" rx="0.7" ry="4" fill="#f9a8d4" stroke="none" transform="rotate(10 6 -31.5)"/>`)
  + `<circle cx="5" cy="-23" r="4.2" fill="#ffffff"/><ellipse cx="3" cy="-13" rx="2" ry="1.2" fill="#ffffff"/></g>`
  + `${eye(6.8, -24, 0.8)}<circle cx="9" cy="-22.4" r="0.6" fill="#f472b6"/><ellipse cx="6.5" cy="-21" rx="1.1" ry="0.6" fill="#fbcfe8"/>`
const turtleRabbit = `<g class="turtle">`
  + flipper(-14, 'M-14 4 q-4 6 -10 8 q4 -5 6 -9z') + `<path d="M-18 1 l-5 1.5 l5 1z" fill="#7d9a4f"/>`
  + `<path d="M16 0 q6 -3 11 -2 q4 0.5 6 2 q-2 2.5 -6 2.5 q-6 0 -11 -0.5z" fill="#7d9a4f"/>${eye(27, -0.6, 0.9)}`
  + `<path d="M-18 2 q2 -14 18 -14 q16 0 18 14z" fill="#5f7a3a"/>`
  + `<path d="M-8 -10 l-4 6 l4 6 h16 l4 -6 l-4 -6z" fill="none" stroke="#3f5326" stroke-width="0.8"/>`
  + `<path d="M-12 -4 h-5 M12 -4 h5 M-8 2 v-12 M8 2 v-12" stroke="#3f5326" stroke-width="0.6"/>`
  + `<ellipse cy="3.4" rx="17" ry="2.3" fill="#d8c58a"/><path d="M-19 2 h38" stroke="#3f5326" stroke-width="1.6"/>`
  + flipper(10, 'M10 4 q6 4 12 10 q-8 -1 -14 -7z')
  + rabbit + `</g>`

// ── 60~80%: 못생긴 심해어 ──
const blobfish = `<path d="M-12 2 q-5 2 -4 6 q2 -2 4 -3z" fill="#f2a7b5"/>`
  + `<path d="M-14 4 q-3 -15 12 -15 q16 0 14 15 q-2 7 -13 7 q-11 0 -13 -7z" fill="#f2a7b5"/>`
  + `<ellipse cx="-4" cy="-7" rx="4" ry="2" fill="#fff" opacity="0.35"/>`
  + [[-8, -3], [-5, 2], [10, -6], [-10, 5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.9" fill="#f7c3cd"/>`).join('')
  + `<path d="M-8 -2 q2 2 4 0 M-10 3 q2 2 4 0" stroke="#d98597" stroke-width="0.6" fill="none"/>`
  // 축 늘어진 코
  + `<path d="M3 -4 q8 0 7 6 q-1 4 -5 3 q-4 -1 -2 -9z" fill="#e88a9c"/>`
  + eye(1, -6, 1.3) + eye(9, -6, 1.3)
  + `<path d="M-1 8.5 q6 -3 12 0" stroke="#a24d60" fill="none" stroke-width="1"/>`

const viper = `<path d="M-26 0 l-8 -5 v10z" fill="#1e2433"/><path d="M-27 0 l-6 -3 M-27 0 l-6 3" stroke="#3b4660" stroke-width="0.4"/>`
  + `<path d="M-26 0 q10 -6 30 -5 q10 1 15 5 q-5 4 -15 5 q-20 1 -30 -5z" fill="#1e2433"/>`
  + `<path d="M-24 -1 q14 -6 34 -4" stroke="#3b4660" stroke-width="0.8" fill="none"/>`
  // 등지느러미 끝의 작은 미끼
  + `<path d="M-2 -5 q-4 -10 8 -13" stroke="#3b4660" stroke-width="0.6" fill="none"/><circle cx="6" cy="-18" r="1" fill="#67e8f9"/>`
  + `<path d="M12 1 q1.5 3 1 6 M15 1 l0.5 5 M18 1 q0 4 -1 7 M14 -1 l1 -5 M17 -1 l0.5 -4" stroke="#f3f4f6" stroke-width="0.9" fill="none"/>`
  + `<circle cx="11" cy="-2" r="2.2" fill="#a5f3fc"/><circle cx="11.4" cy="-2" r="1.1" fill="${EYE}"/>`
  + [-18, -12, -6, 0, 6].map(x =>
    `<circle cx="${x}" cy="3" r="0.9" fill="#67e8f9"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin="${x / 20}s" repeatCount="indefinite"/></circle>`
    + `<circle cx="${x + 3}" cy="4.4" r="0.6" fill="#67e8f9" opacity="0.6"/>`).join('')

// ── 80~100%: 해구 바닥 ──
const angler = wag(-13, 0, 10, 1, `<path d="M-13 0 l-8 -7 q1 7 0 14z" fill="#2b2f3a"/>`)
  + `<path d="M-10 -8 l2 -4 l2 3 l2 -4 l2 4 l2 -3 l1 3z" fill="#2b2f3a"/>`
  + `<ellipse rx="14" ry="10" fill="#2b2f3a"/>`
  + [[-8, -3], [-4, 4], [-9, 3], [0, -6], [2, 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.8" fill="#3d4352"/>`).join('')
  // 크게 벌린 아래턱과 들쭉날쭉한 이빨
  + `<path d="M2 2 q10 0 14 -4 q-2 10 -16 10z" fill="#1c1f27"/>`
  + `<path d="M4 3 l1 3 l1.5 -3 l1.5 4 l1.5 -4 l1.5 3 l1.5 -3.5" stroke="#e5e7eb" fill="none" stroke-width="0.8"/>`
  + `<path d="M5 8 l1 -3 l1.5 3 l1.5 -4 l1.5 3.5 l1.5 -3" stroke="#e5e7eb" fill="none" stroke-width="0.7"/>`
  + `<path d="M-4 2 q-4 4 -2 7 q2 -3 3 -6z" fill="#3d4352"/>${eye(6, -4, 1.5)}`
  + `<path d="M2 -10 q9 -11 16 -2" stroke="#6b7280" fill="none" stroke-width="1"/>`
  + `<circle cx="18" cy="-2" r="3" fill="#ffe96b"><animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite"/></circle>`
  + `<circle cx="18" cy="-2" r="8" fill="#ffe96b" opacity="0.15"/>`

const gulper = `<path d="M-40 0 q10 -5 20 0 t20 0 q4 -2 8 -2 l14 -9 l-4 11 l4 11 l-14 -9 q-4 0 -8 -2 q-10 4 -20 0 t-20 0z" fill="#111318"/>`
  + `<path d="M8 -2 l14 -9 M8 2 l14 9" stroke="#4b5563" stroke-width="0.6"/>`
  + `<path d="M12 -4.5 l0.5 1.2 M15 -6.5 l0.5 1.2 M18 -8.5 l0.5 1.2 M12 4.5 l0.5 -1.2 M15 6.5 l0.5 -1.2 M18 8.5 l0.5 -1.2" stroke="#d1d5db" stroke-width="0.5"/>`
  + `<path d="M-38 0 q10 -3 20 0 t20 0" stroke="#2d3240" stroke-width="0.6" fill="none"/>`
  + `<circle cx="-42" cy="0" r="2" fill="#ff4fa3"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/></circle>`
  + `<circle cx="-42" cy="0" r="5" fill="#ff4fa3" opacity="0.15"/>${eye(3, -3, 1)}`

const atolla = bob(-3, 2.2, [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5].map((x, i) =>
  `<path d="M${x} 1 q${i % 2 ? 1 : -1} 6 ${i % 2 ? -0.5 : 0.5} ${10 + (i % 3) * 2}" stroke="#9b1c31" fill="none" stroke-width="0.7"/>`).join('')
  + `<path d="M0 1 q3 12 -2 24 q-3 6 1 10" stroke="#b9324a" fill="none" stroke-width="0.5"/>`
  + `<path d="M-9 0 a9 7 0 0 1 18 0z" fill="#9b1c31"/>`
  + `<path d="M0 -6.5 v6 M-4.5 -5.2 l1.5 5 M4.5 -5.2 l-1.5 5 M-7.5 -3 l3 3 M7.5 -3 l-3 3" stroke="#7a1426" stroke-width="0.6"/>`
  + `<path d="M-5 -4.5 q4 -2.5 8 -1" stroke="#e46a80" stroke-width="0.8" fill="none"/>`
  + `<ellipse cy="0.5" rx="9" ry="2" fill="none" stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="2 1.4"><animate attributeName="stroke-opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/></ellipse>`)

// pinkChance: 운 좋은 날엔 분홍 돌고래로 바뀐다. rest: 지나간 뒤 화면 밖에서 쉬는 초(가끔 지나가게)
export type Swimmer = { y: number; dur: number; begin: number; body: string; flip?: boolean; scale?: number; pinkChance?: boolean; rest?: number }

// 세계 좌표 y(수심)마다 지나다니는 생물들. 20%마다 160px
export const SWIMMERS: Swimmer[] = [
  { y: 22, dur: 44, begin: 10, body: spoutingWhale, scale: 0.45 },
  { y: 40, dur: 10, begin: 2, body: tang },
  { y: 66, dur: 14, begin: 8, body: school, flip: true },
  { y: 95, dur: 12, begin: 4, body: clown },
  { y: 128, dur: 18, begin: 11, body: seal, flip: true },
  { y: 150, dur: 9, begin: 1, body: tang, flip: true },
  { y: 192, dur: 12, begin: 3, body: DOLPHIN },
  { y: 238, dur: 16, begin: 10, body: shark, flip: true, scale: 1.1 },
  { y: 278, dur: 13, begin: 6, body: DOLPHIN, flip: true, scale: 0.9, pinkChance: true },
  { y: 306, dur: 20, begin: 14, body: shark, scale: 0.75 },
  { y: 372, dur: 34, begin: 12, body: whales },
  { y: 420, dur: 28, begin: 2, body: turtleRabbit, scale: 1.3 },
  { y: 456, dur: 24, begin: 5, body: squid, flip: true },
  { y: 505, dur: 22, begin: 9, body: blobfish },
  { y: 548, dur: 17, begin: 3, body: viper, flip: true },
  { y: 672, dur: 21, begin: 7, body: angler, flip: true },
  { y: 716, dur: 16, begin: 2, body: atolla },
  { y: 762, dur: 25, begin: 15, body: gulper },
]
