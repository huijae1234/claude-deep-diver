// 수면 이벤트: 가끔 돌고래가 물 위로 점프한다(긴 주기 중 잠깐만 보인다)
import { DOLPHIN } from './creatures'

const CYCLE = 26 // 초: 이만큼마다 한 번
const ACTIVE = 2.4 // 초: 점프 길이
const k = +(ACTIVE / CYCLE).toFixed(4)

// 물에서 나와 포물선을 그리고 다시 들어간다(세계 좌표, 수면 y=0). 왼쪽 위 글자 띠에 가리지 않게 오른쪽에서
const arc = Array.from({ length: 7 }, (_, i) => {
  const t = i / 6
  return `${(200 + 110 * t).toFixed(1)},${(16 - 52 * (1 - (2 * t - 1) ** 2)).toFixed(1)}`
})
const times = Array.from({ length: 7 }, (_, i) => +((k * i) / 6).toFixed(4))

const loop = (attr: string, values: string, keyTimes: string, extra = '') =>
  `<animate${extra ? 'Transform' : ''} attributeName="${attr}"${extra} values="${values}" keyTimes="${keyTimes}" dur="${CYCLE}s" begin="4s" repeatCount="indefinite"/>`

const splashAt = (x: number, at: number) =>
  `<g opacity="0">${loop('opacity', '0;0;1;0;0', `0;${at};${+(at + 0.001).toFixed(4)};${+(at + 0.05).toFixed(4)};1`)}`
  + `<circle cx="${x}" cy="0" r="10" fill="none" stroke="#ffffff" stroke-width="1.6"/>`
  + [-8, -3, 3, 8].map(dx => `<circle cx="${x + dx}" cy="${-6 - Math.abs(dx) / 2}" r="1.6" fill="#e0f7ff"/>`).join('')
  + `</g>`

export const dolphinLeap = `<g class="leap" opacity="0">`
  + `<animate attributeName="opacity" values="1;0" keyTimes="0;${k}" calcMode="discrete" dur="${CYCLE}s" begin="4s" repeatCount="indefinite"/>`
  + `<g>${loop('transform', `${arc.join(';')};${arc[6]}`, `${times.join(';')};1`, ' type="translate"')}`
  + `<g>${loop('transform', `-55;0;55;55`, `0;${+(k / 2).toFixed(4)};${k};1`, ' type="rotate"')}${DOLPHIN}</g></g></g>`
  + splashAt(200, 0.0005) + splashAt(310, k)
