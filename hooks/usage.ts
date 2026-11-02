import type { SessionUsage } from 'claude-code'

import type { Snapshot } from '../types'

export const tokensText = (tokens?: number): string =>
  tokens === undefined ? '—' : tokens < 1000 ? `${tokens}` : `${(tokens / 1000).toFixed(1)}k`

export const resetText = (resetsAt: string | undefined, now: number): string => {
  if (!resetsAt) return ''
  const minutes = Math.ceil((Date.parse(resetsAt) - now) / 60000)
  if (Number.isNaN(minutes)) return ''
  if (minutes <= 0) return '곧 초기화'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h >= 24) return `${Math.floor(h / 24)}일 ${h % 24}시간`
  return h > 0 ? `${h}시간 ${m}분` : `${m}분`
}

// 같은 주인지 비교: 초 단위 흔들림은 무시하고 시(hour)까지만 본다
export const weekKey = (resetsAt?: string): string | undefined =>
  resetsAt ? new Date(Math.round(Date.parse(resetsAt) / 3600000) * 3600000).toISOString() : undefined

export const toSnapshot = (
  usage: SessionUsage,
  readAt: number,
  prev: Snapshot | null,
  lastWeek: string | undefined,
): Snapshot => {
  const pick = (kind: string) => usage.rateLimits.find(r => r.kind === kind)
  const five = pick('five_hour')
  const seven = pick('seven_day')
  const week = weekKey(seven?.resetsAt)
  return {
    tokens: usage.context.tokens,
    contextPercent: usage.context.percent,
    fiveHour: five && { percent: five.percentUsed, resetsAt: five.resetsAt },
    sevenDay: seven && { percent: seven.percentUsed, resetsAt: seven.resetsAt },
    prevSevenPercent: prev?.sevenDay?.percent,
    intro: week !== undefined && week !== lastWeek,
    readAt,
  }
}

// 터미널용 글자 막대
export const blocks = (percent?: number): string => {
  const n = Math.round(Math.max(0, Math.min(100, percent ?? 0)) / 20)
  return '█'.repeat(n) + '░'.repeat(5 - n)
}
