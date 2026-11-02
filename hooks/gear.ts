// 잠수 장비: 대화 기억 = 손목 잠수 시계, 7일 사용량 = 쌍둥이 산소통과 압력계
import { tokensText } from './usage'

const INK = '#1f2937'
const RED = '#b3261e'

const clamp = (n: number) => Math.max(0, Math.min(100, n))

const text = (x: number, y: number, body: string, opts = '', fill = INK) =>
  `<text x="${x}" y="${y}" font-size="14" fill="${fill}" text-anchor="middle" ${opts}>${body}</text>`

const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180
  return [+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1)]
}
const arc = (cx: number, cy: number, r: number, from: number, to: number) =>
  `M${polar(cx, cy, r, from).join(' ')} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${polar(cx, cy, r, to).join(' ')}`

// ── 대화 기억: 글자 + 색 + 시계 테두리 양으로 같이 보여 준다 ──
export type MemoryLevel = { label: string; color: string }
export const memoryLevel = (percent = 0): MemoryLevel =>
  percent < 50 ? { label: '여유', color: '#22c55e' }
    : percent < 70 ? { label: '보통', color: '#eab308' }
      : percent < 85 ? { label: '빠듯', color: '#f97316' }
        : { label: '곧 정리', color: '#ef4444' }

export const diveWatch = (tokens: number | undefined, percent: number | undefined, w: number, h: number) => {
  const [cx, cy, r] = [w / 2, 46, 30]
  const level = memoryLevel(percent)
  const fill = clamp(percent ?? 0)
  const bezelTicks = Array.from({ length: 12 }, (_, i) => {
    const [x1, y1] = polar(cx, cy, r + 5, i * 30)
    const [x2, y2] = polar(cx, cy, r + 2, i * 30)
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#cbd5e1" stroke-width="${i % 3 ? 1 : 2}"/>`
  }).join('')
  return `<rect width="${w}" height="${h}" rx="16" fill="#dbeafe"/>`
    // 시곗줄
    + `<rect x="${cx - 14}" y="4" width="28" height="84" rx="6" fill="#1e293b"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="#334155"/>${bezelTicks}`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b1a17"/>`
    + `<path d="${arc(cx, cy, r - 4, -90, 269.9)}" stroke="#1f3b35" stroke-width="5" fill="none"/>`
    + (fill > 0 ? `<path d="${arc(cx, cy, r - 4, -90, -90 + 3.599 * fill)}" stroke="${level.color}" stroke-width="5" fill="none" stroke-linecap="round"/>` : '')
    + `<text x="${cx}" y="${cy - 4}" font-size="14" fill="#86efac" text-anchor="middle" font-family="ui-monospace, monospace" font-weight="700">${tokensText(tokens)}</text>`
    + `<text x="${cx}" y="${cy + 12}" font-size="14" fill="#86efac" text-anchor="middle" font-family="ui-monospace, monospace">${percent === undefined ? '—' : `${Math.round(percent)}%`}</text>`
    + text(cx, h - 22, '대화 기억', 'font-weight="600"')
    + `<circle cx="${cx - 26}" cy="${h - 12}" r="4" fill="${level.color}"/>`
    + text(cx + 4, h - 7, level.label, 'font-weight="700"')
}

// ── 7일 사용량: 노란 쌍둥이 산소통 + 압력계 ──
const tank = (x: number) =>
  `<path d="M${x} 44 q0 -12 13 -12 q13 0 13 12 v58 h-26z" fill="#fbb321"/>`
  + `<path d="M${x} 44 q0 -12 13 -12 v70 h-13z" fill="#e0952b"/>`
  + `<rect x="${x - 1}" y="102" width="28" height="12" rx="3" fill="#2b2b2b"/>`
  + `<rect x="${x + 9}" y="24" width="8" height="8" rx="1.5" fill="#fbb321"/>`

export const oxygenOf = (sevenDayPercent?: number): number | undefined =>
  sevenDayPercent === undefined ? undefined : Math.round(100 - clamp(sevenDayPercent))

const gauge = (cx: number, cy: number, r: number, left: number) => {
  const start = 150
  const angle = (v: number) => start + (240 * v) / 100
  const ticks = Array.from({ length: 21 }, (_, i) => {
    const v = i * 5
    const [x1, y1] = polar(cx, cy, r - 3, angle(v))
    const [x2, y2] = polar(cx, cy, r - (i % 2 ? 6 : 9), angle(v))
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${v < 20 ? RED : '#334155'}" stroke-width="${i % 2 ? 0.8 : 1.4}"/>`
  }).join('')
  const [nx, ny] = polar(cx, cy, r - 7, angle(left))
  const [tx, ty] = polar(cx, cy, 6, angle(left) + 180)
  const nums = [0, 50, 100].map(v => {
    const [x, y] = polar(cx, cy, r - 16, angle(v))
    return `<text x="${x}" y="${y + 3}" font-size="8" fill="#334155" text-anchor="middle">${v}</text>`
  }).join('')
  return `<circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#1f2a44"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r + 1.5}" fill="#c7cfdb"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fbfbfd"/>`
    + `<path d="${arc(cx, cy, r - 5, angle(0), angle(20))}" stroke="${RED}" stroke-width="4" fill="none"/>`
    + `<path d="${arc(cx, cy, r - 5, angle(80), angle(100))}" stroke="#22c55e" stroke-width="4" fill="none"/>`
    + ticks + nums
    + `<text x="${cx}" y="${cy + 18}" font-size="7" fill="#64748b" text-anchor="middle" letter-spacing="1">O₂ BAR</text>`
    + `<line x1="${tx}" y1="${ty}" x2="${nx}" y2="${ny}" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>`
    + `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#1f2a44"/><circle cx="${cx}" cy="${cy}" r="1.3" fill="#94a3b8"/>`
    // 유리 반사
    + `<path d="${arc(cx, cy, r - 2, 200, 260)}" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.8"/>`
}

export const oxygenPanel = (sevenDayPercent: number | undefined, w: number, h: number) => {
  const o2 = oxygenOf(sevenDayPercent)
  const left = o2 ?? 0
  const isLow = o2 !== undefined && o2 < 20
  const [gx, gy, gr] = [w - 40, 54, 30]
  return `<defs><pattern id="danger" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">`
    + `<rect width="6" height="6" fill="${RED}"/><rect width="3" height="6" fill="#e57373"/></pattern></defs>`
    + `<rect width="${w}" height="${h}" rx="16" fill="#ede9fe"/>`
    + `<ellipse cx="34" cy="114" rx="30" ry="3" fill="#000" opacity="0.15"/>`
    + tank(6) + tank(34)
    + `<rect x="4" y="54" width="58" height="6" fill="#9ca3af"/><rect x="4" y="82" width="58" height="6" fill="#9ca3af"/>`
    + `<rect x="30" y="53" width="6" height="8" rx="1" fill="#4b5563"/><rect x="30" y="81" width="6" height="8" rx="1" fill="#4b5563"/>`
    // 밸브와 연결관
    + `<rect x="18" y="20" width="32" height="3" fill="#6b7280"/><rect x="10" y="18" width="8" height="6" rx="1" fill="#111827"/>`
    + `<rect x="50" y="18" width="8" height="6" rx="1" fill="#111827"/>`
    + `<circle cx="22" cy="20" r="4" fill="#fff" stroke="#1f2a44" stroke-width="1.5"/><circle cx="46" cy="20" r="4" fill="#fff" stroke="#1f2a44" stroke-width="1.5"/>`
    // 호스: 왼쪽 밸브 → 압력계
    + `<path d="M58 21 q20 -2 ${gx - 58} ${gy - gr - 25}" stroke="#a16207" stroke-width="2.5" fill="none"/>`
    + gauge(gx, gy, gr, left)
    + (isLow ? `<rect x="${gx - 39}" y="${h - 26}" width="76" height="20" rx="6" fill="url(#danger)"/>` : '')
    + text(gx, h - 11, o2 === undefined ? '산소 —' : `${isLow ? '⚠ ' : ''}산소 ${o2}%`, 'font-weight="700"', isLow ? '#ffffff' : INK)
    + text(w / 2 + 14, 13, '7일', 'font-weight="600"')
}
