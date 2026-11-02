import type { Snapshot } from '../types'
import { PINK_DOLPHIN, SWIMMERS } from './creatures'
import type { Swimmer } from './creatures'
import { GIANT_OCTOPUS, PIRATE_SHIP, TREASURE } from './deep'
import { dolphinLeap } from './surface'
import { diveWatch, oxygenOf, oxygenPanel } from './gear'
import { resetText, tokensText } from './usage'

export const BAND_W = 640
export const BAND_H = 120

const WATCH_W = 110
const OX = 118 // 바다 창 시작 x
const OW = 360 // 바다 창 폭
const PANEL_X = 486
const PER_PERCENT = 8 // 사용량 1%마다 내려가는 픽셀
const DIVER_X = 120 // 바다 창 안 잠수부 x
const DIVER_Y = 80 // 바다 창 안 잠수부 머리 y(화면은 잠수부를 따라간다)
const FLOOR = 800 // 세계 좌표 바닥: 100%면 잠수부 머리가 바닥에 닿는다

const clamp = (n: number) => Math.max(0, Math.min(100, n))

export const ZONES = ['햇살 바다', '푸른 바다', '고래의 바다', '심해', '해구 바닥']
export const zoneOf = (percent = 0): number => Math.min(4, Math.floor(clamp(percent) / 20))

// 세계를 위로 끌어올리는 양: 0%면 수면이 잠수부 머리 높이, 10%부터 수면이 화면 밖
export const worldShift = (percent = 0): number => DIVER_Y - PER_PERCENT * clamp(percent)
export const surfaceVisible = (percent = 0): boolean => worldShift(percent) > 0

// 답을 읽은 때(초)로 정해서, 같은 답에서는 다시 그려져도 바뀌지 않는다
export const isPinkDay = (readAt: number): boolean => Math.floor(readAt / 1000) % 8 === 0

const swim = (pink: boolean) => ({ y, dur, begin, body, flip, scale = 1, pinkChance, rest = 0 }: Swimmer) => {
  const [a, b] = flip ? [`${OW + 60},${y}`, `-80,${y}`] : [`-80,${y}`, `${OW + 60},${y}`]
  // rest가 있으면 지나간 뒤 화면 밖에서 쉬었다 다시 온다
  const move = rest ? `values="${a};${b};${b}" keyTimes="0;${+(dur / (dur + rest)).toFixed(3)};1"` : `values="${a};${b}"`
  return `<g><animateTransform attributeName="transform" type="translate" ${move} dur="${dur + rest}s" begin="-${begin}s" repeatCount="indefinite"/>`
    + `<g transform="scale(${flip ? -scale : scale},${scale})">${pink && pinkChance ? PINK_DOLPHIN : body}</g></g>`
}

const snow = () =>
  Array.from({ length: 14 }, (_, i) => {
    const x = (i * 53) % OW
    const y0 = 480 + ((i * 97) % 300)
    return `<circle cx="${x}" cy="${y0}" r="0.9" fill="#e5e7eb" opacity="0.6"><animate attributeName="cy" values="${y0};${y0 + 60}" dur="${7 + (i % 5)}s" repeatCount="indefinite"/></circle>`
  }).join('')

const sky = () =>
  `<rect x="0" y="-120" width="${OW}" height="120" fill="#dff3ff"/>`
  + `<circle cx="${OW - 40}" cy="-60" r="12" fill="#ffe27a"/>`
  + `<ellipse cx="70" cy="-50" rx="22" ry="6" fill="#ffffff"/><ellipse cx="200" cy="-66" rx="18" ry="5" fill="#ffffff"/>`

const waves = () => {
  const crest = Array.from({ length: 22 }, () => 'q5 -4 10 0 q5 4 10 0').join(' ')
  return `<g><animateTransform attributeName="transform" type="translate" values="0,0;-20,0" dur="2s" repeatCount="indefinite"/>`
    + `<path d="M0 0 ${crest} V8 H0z" fill="#9fe0ff" opacity="0.6"/><path d="M0 0 ${crest}" stroke="#ffffff" stroke-width="2" fill="none"/></g>`
}

// 수심 0 ~ 바닥까지 한 장으로 그린 바다(세계 좌표)
const world = (pink: boolean) =>
  `<defs><linearGradient id="depth" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${FLOOR}">`
  + `<stop offset="0" stop-color="#7fd8ff"/><stop offset="0.19" stop-color="#2a9fd8"/><stop offset="0.39" stop-color="#1663a8"/>`
  + `<stop offset="0.58" stop-color="#0b2f66"/><stop offset="0.77" stop-color="#061430"/><stop offset="1" stop-color="#010205"/></linearGradient>`
  + `<linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>`
  + sky()
  + `<rect y="0" width="${OW}" height="${FLOOR + 40}" fill="url(#depth)"/>`
  // 햇살 줄기
  + [40, 150, 260].map(x => `<path d="M${x} 0 l30 0 l40 150 l-50 0z" fill="url(#ray)"/>`).join('')
  + waves()
  + dolphinLeap
  + `<g transform="translate(250,568) scale(1.2)">${GIANT_OCTOPUS}</g>`
  + SWIMMERS.map(swim(pink)).join('')
  + snow()
  + `<path d="M0 ${FLOOR + 40} V${FLOOR} q40 -8 80 -2 t90 0 t100 -4 t90 2 V${FLOOR + 40}z" fill="#120d08"/>`
  + `<g transform="translate(150,${FLOOR - 2})">${PIRATE_SHIP}</g>`
  + `<g transform="translate(0,${FLOOR})">${TREASURE}</g>`
  + `<path d="M30 ${FLOOR} q-4 -16 2 -26 M36 ${FLOOR} q4 -12 -2 -22" stroke="#1d3b2a" stroke-width="2" fill="none"/>`

// ── 머리를 아래로 하고 내려가는 잠수부 ──
const bubble = (delay: number, dur: number) =>
  `<circle cx="6" cy="-4" r="2" fill="none" stroke="#e6f7ff" stroke-width="1">`
  + `<animate attributeName="cy" values="-4;-70" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>`
  + `<animate attributeName="opacity" values="1;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/></circle>`

const diverBody = (isWorking: boolean, hasLamp: boolean) => {
  const kick = isWorking ? 0.35 : 1.2
  const fin = (x: number, phase: string) =>
    `<g><animateTransform attributeName="transform" type="rotate" values="${phase}" dur="${kick}s" repeatCount="indefinite"/>`
    + `<path d="M${x - 3} -40 l-2 -12 h10 l-2 12z" fill="#00a3a3"/></g>`
  return (hasLamp ? `<path d="M-3 6 L3 6 L22 70 L-22 70z" fill="#fff6b0" opacity="0.18"/>` : '')
    + `<g shape-rendering="crispEdges">`
    + fin(-3, `-10 -3 -40;10 -3 -40;-10 -3 -40`) + fin(5, `10 5 -40;-10 5 -40;10 5 -40`)
    + `<rect x="-6" y="-42" width="5" height="16" fill="#1b2433"/><rect x="2" y="-42" width="5" height="16" fill="#1b2433"/>` // 다리
    + `<rect x="-7" y="-27" width="15" height="22" rx="3" fill="#1b2433"/>` // 몸통
    + `<rect x="8" y="-28" width="7" height="18" rx="3" fill="#ffb300"/><rect x="9" y="-31" width="5" height="3" fill="#374151"/>` // 등의 산소통
    + `<rect x="-10" y="-22" width="3" height="17" fill="#1b2433"/>` // 팔
    + `<circle cx="0" cy="0" r="6" fill="#ffd23f"/><rect x="-5" y="1" width="9" height="4" rx="1.5" fill="#8fe3ff"/>` // 머리·마스크
    + `</g>`
    + [0, 0.8, 1.6].map(d => bubble(d, isWorking ? 1.4 : 2.6)).join('')
}

// 작은 헬기: 원점이 기체 가운데, 1.5배로 그려 발판(스키드)은 y=13.5~16.5, 오른쪽 끝 x=27
const helicopter = `<g transform="scale(1.5)"><rect x="-12" y="-5" width="20" height="10" rx="5" fill="#dc2626"/>`
  + `<rect x="1" y="-3" width="6" height="5" rx="2" fill="#8fe3ff"/><rect x="-30" y="-2" width="18" height="3" fill="#dc2626"/>`
  + `<rect x="-33" y="-6" width="4" height="8" fill="#b91c1c"/><path d="M-6 5 v4 M4 5 v4" stroke="#374151" stroke-width="1.2"/>`
  + `<rect x="-12" y="9" width="30" height="2" rx="1" fill="#374151"/>`
  + `<rect x="-22" y="-9" width="36" height="2" fill="#1f2937"><animate attributeName="width" values="36;5;36" dur="0.22s" repeatCount="indefinite"/></rect></g>`

// 헬기 발판에 걸터앉아 다리를 흔드는 잠수부(원점 = 엉덩이)
const sittingDiver = `<g class="sit" shape-rendering="crispEdges">`
  + `<rect x="-9" y="-15" width="5" height="12" rx="2" fill="#ffb300"/>` // 등의 산소통
  + `<rect x="-4" y="-16" width="9" height="15" rx="2" fill="#1b2433"/>` // 몸통
  + `<circle cx="1" cy="-21" r="5" fill="#ffd23f"/><rect x="2" y="-23" width="5" height="4" rx="1.5" fill="#8fe3ff"/>` // 머리·마스크
  + `<rect x="4" y="-12" width="3" height="10" fill="#1b2433"/>` // 발판을 잡은 팔
  + `<g><animateTransform attributeName="transform" type="rotate" values="-15 0 0;15 0 0;-15 0 0" dur="1.1s" repeatCount="indefinite"/>`
  + `<rect x="-2" y="-1" width="6" height="12" fill="#1b2433"/><path d="M-3 11 h10 l-2 9 h-6z" fill="#00a3a3"/></g>` // 다리·오리발
  + `</g>`

type Motion = { from?: number; to: number; intro: boolean; isWorking: boolean; pink: boolean }

const translate = (values: string, dur: number, keyTimes = '') =>
  `<animateTransform attributeName="transform" type="translate" values="${values}"${keyTimes ? ` keyTimes="${keyTimes}"` : ''} dur="${dur}s" fill="freeze"/>`

const HELI_X = DIVER_X + 110
const HELI_Y = 42
// 잠수부가 앉는 발판 끝(헬기 기준)
const SEAT = { x: 22, y: 14 }
const SCENE_DUR = 6

// 0%는 헬기 위에서 점프 준비
export const isOnHelicopter = (percent = 0): boolean => percent < 1

const splash = (begin: number) =>
  `<g opacity="0"><set attributeName="opacity" to="1" begin="${begin}s"/><animate attributeName="opacity" values="1;0" begin="${begin + 0.9}s" dur="0.5s" fill="freeze"/>`
  + [-1, 1].map(s => `<circle cx="${DIVER_X}" cy="${DIVER_Y}" r="0" fill="none" stroke="#fff" stroke-width="2"><animate attributeName="r" values="0;${s > 0 ? 22 : 12}" begin="${begin}s" dur="0.8s" fill="freeze"/></circle>`).join('')
  + [-14, -7, 7, 14].map(dx => `<circle cx="${DIVER_X}" cy="${DIVER_Y}" r="2.2" fill="#e0f7ff"><animate attributeName="cx" values="${DIVER_X};${DIVER_X + dx}" begin="${begin}s" dur="0.7s" fill="freeze"/><animate attributeName="cy" values="${DIVER_Y};${DIVER_Y - 16};${DIVER_Y - 4}" begin="${begin}s" dur="0.7s" fill="freeze"/></circle>`).join('')
  + `<text x="${DIVER_X + 18}" y="${DIVER_Y - 18}" font-size="16" font-weight="800" fill="#ffffff" stroke="#0b4f7a" stroke-width="0.8">첨벙~!</text></g>`

const scene = ({ from, to, intro, isWorking, pink }: Motion) => {
  const shift = worldShift(to)
  const top = worldShift(0)
  const bob = `<animateTransform attributeName="transform" type="translate" values="0,0;0,${isWorking ? 3 : -2};0,0" dur="${isWorking ? 1.4 : 3}s" repeatCount="indefinite" additive="sum"/>`
  const diver = (anim: string, extra = '') =>
    `<g transform="translate(${DIVER_X},${DIVER_Y})">${anim}${extra}<g>${bob}${diverBody(isWorking, to >= 40)}</g></g>`
  const heliBob = `<animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="1.6s" repeatCount="indefinite" additive="sum"/>`
  const heli = (anim: string, seated: string) =>
    `<g transform="translate(${HELI_X},${HELI_Y})">${anim}<g>${heliBob}${helicopter}${seated}</g></g>`
  const seat = (leaveAt?: number) =>
    `<g transform="translate(${SEAT.x},${SEAT.y})">${leaveAt === undefined ? '' : `<set attributeName="opacity" to="0" begin="${leaveAt}s"/>`}${sittingDiver}</g>`
  const flyIn = translate(`${OW + 60},${HELI_Y};${HELI_X},${HELI_Y}`, 2.4)

  if (isOnHelicopter(to)) {
    // 헬기에 걸터앉아 대기(새 주 첫 실행이면 헬기가 날아온다)
    const moved = from !== undefined && Math.abs(from - to) >= 0.5
    const pan = moved ? translate(`0,${worldShift(from)};0,${top}`, 6) : ''
    return `<g transform="translate(0,${top})">${pan}${world(pink)}</g>` + heli(intro ? flyIn : '', seat())
  }

  const jumps = intro || (from !== undefined && isOnHelicopter(from))
  if (jumps) {
    // 1%라도 쓰는 순간: 뛰어내려 첨벙, 화면이 지금 깊이까지 따라 내려간다
    const j = intro ? 0.4 : 0.15 // 점프 시점(전체 길이 비율)
    const land = j + 0.12
    const jumpAt = +(j * SCENE_DUR).toFixed(2)
    const landAt = +(land * SCENE_DUR).toFixed(2)
    const heliPath = intro
      ? `${OW + 60},${HELI_Y};${HELI_X},${HELI_Y};${HELI_X},${HELI_Y};-80,${HELI_Y - 8}`
      : `${HELI_X},${HELI_Y};${HELI_X},${HELI_Y};-80,${HELI_Y - 8}`
    const heliKeys = intro ? `0;0.3;${j + 0.05};1` : `0;${j + 0.05};1`
    const fall = translate(`${HELI_X + SEAT.x},${HELI_Y + SEAT.y};${HELI_X + SEAT.x},${HELI_Y + SEAT.y};${DIVER_X},${DIVER_Y};${DIVER_X},${DIVER_Y}`, SCENE_DUR, `0;${j};${land};1`)
    return `<g transform="translate(0,${shift})">${translate(`0,${top};0,${top};0,${shift}`, SCENE_DUR, `0;${land + 0.08};1`)}${world(pink)}</g>`
      + heli(translate(heliPath, SCENE_DUR, heliKeys), seat(jumpAt))
      + diver(fall, `<set attributeName="opacity" to="0" begin="0s"/><set attributeName="opacity" to="1" begin="${jumpAt}s"/>`)
      + splash(landAt)
  }

  const moved = from !== undefined && Math.abs(from - to) >= 0.5
  // 한도가 돌아오면(숫자가 줄면) 바닥에서 천천히 헤엄쳐 올라온다
  const pan = moved ? translate(`0,${worldShift(from)};0,${shift}`, to < from ? 6 : 3) : ''
  return `<g transform="translate(0,${shift})">${pan}${world(pink)}</g>` + diver('')
}

// 오른쪽 가장자리 수심 자: 20%마다 구간 색
const ruler = (percent: number) => {
  const [x, y0, len] = [OW - 12, 26, 84]
  const colors = ['#7fd8ff', '#2a9fd8', '#1663a8', '#0b2f66', '#020409']
  const y = y0 + (len * clamp(percent)) / 100
  return colors.map((c, i) => `<rect x="${x}" y="${y0 + (len / 5) * i}" width="5" height="${len / 5}" fill="${c}" stroke="#ffffff" stroke-width="0.5"/>`).join('')
    + `<path d="M${x - 1} ${y} l-6 -4 v8z" fill="#ffd23f" stroke="#111827" stroke-width="0.6"/>`
}

const pill = (x: number, y: number, body: string) =>
  `<g><rect x="${x}" y="${y - 14}" width="${body.length * 13 + 14}" height="20" rx="8" fill="#000" opacity="0.45"/>`
  + `<text x="${x + 7}" y="${y + 1}" font-size="14" fill="#ffffff" font-weight="600">${body}</text></g>`

const ocean = (s: Snapshot, now: number, motion: Motion) => {
  const p = s.sevenDay?.percent
  const reset = resetText(s.sevenDay?.resetsAt, now)
  const isRising = motion.from !== undefined && motion.to < motion.from - 0.5
  const place = isOnHelicopter(p) ? '🚁 점프 준비' : ZONES[zoneOf(p)]
  const head = p === undefined ? '7일 —' : `7일 ${Math.round(p)}% · ${place}${isRising ? ' · ⬆ 올라오는 중' : ''}`
  return `<defs><clipPath id="sea"><rect width="${OW}" height="${BAND_H}" rx="16"/></clipPath></defs>`
    + `<g transform="translate(${OX},0)"><g clip-path="url(#sea)">`
    + scene(motion)
    + ruler(p ?? 0)
    + pill(8, 20, head)
    + (reset ? pill(8, BAND_H - 10, `${reset} 뒤 초기화`) : '')
    + `</g></g>`
}

export const bandSvg = (s: Snapshot, now: number, isWorking: boolean): string => {
  // 새 숫자를 읽은 직후에만 움직임을 보여 준다(다시 그려질 때마다 반복되지 않게)
  const isFresh = now - s.readAt < 8000
  const motion: Motion = {
    from: isFresh ? s.prevSevenPercent : undefined,
    to: s.sevenDay?.percent ?? 0,
    intro: isFresh && s.intro,
    isWorking,
    pink: isPinkDay(s.readAt),
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BAND_W}" height="${BAND_H}" viewBox="0 0 ${BAND_W} ${BAND_H}" font-family="system-ui, sans-serif">`
    + diveWatch(s.tokens, s.contextPercent, WATCH_W, BAND_H)
    + ocean(s, now, motion)
    + `<g transform="translate(${PANEL_X},0)">${oxygenPanel(s.fiveHour?.percent, BAND_W - PANEL_X, BAND_H)}</g>`
    + '</svg>'
}

export const bandAlt = (s: Snapshot, now: number): string => {
  const reset = resetText(s.sevenDay?.resetsAt, now)
  const p = s.sevenDay?.percent
  return `대화 기억 ${tokensText(s.tokens)}, 7일 한도 ${p ?? '—'}%${p === undefined ? '' : ` (${ZONES[zoneOf(p)]})`}`
    + `${reset ? `, ${reset} 뒤 초기화` : ''}, 5시간 산소 ${oxygenOf(s.fiveHour?.percent) ?? '—'}% 남음`
}
