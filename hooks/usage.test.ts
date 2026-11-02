import { expect, test } from 'claude-code/testing'

import { memoryLevel, oxygenOf } from './gear'
import { bandSvg, isPinkDay, surfaceVisible, worldShift, ZONES, zoneOf } from './ocean'
import { blocks, resetText, tokensText, toSnapshot, weekKey } from './usage'

const base = { tokens: 1, contextPercent: 10, intro: false, readAt: 0 }

test('대화 기억 단계: 글자와 색이 함께 바뀐다', () => {
  expect([49, 50, 69, 70, 84, 85].map(p => memoryLevel(p).label))
    .toEqual(['여유', '보통', '보통', '빠듯', '빠듯', '곧 정리'])
})

test('토큰·남은 시간·글자 막대', () => {
  expect(tokensText(42150)).toBe('42.1k')
  const now = Date.parse('2026-11-02T00:00:00Z')
  expect(resetText('2026-11-02T02:10:00Z', now)).toBe('2시간 10분')
  expect(resetText('2026-11-01T23:00:00Z', now)).toBe('곧 초기화')
  expect(blocks(40)).toBe('██░░░')
})

test('1%마다 조금씩 내려가고, 10%를 지나면 수면이 안 보인다', () => {
  expect(worldShift(1)).toBeLessThan(worldShift(0))
  expect(worldShift(100)).toBe(worldShift(130))
  expect(surfaceVisible(9)).toBe(true)
  expect(surfaceVisible(10)).toBe(false)
})

test('20%마다 수심 구간이 바뀐다', () => {
  expect([0, 19.9, 20, 39, 40, 60, 79, 80, 100].map(p => ZONES[zoneOf(p)])).toEqual([
    '햇살 바다', '햇살 바다', '푸른 바다', '푸른 바다', '고래의 바다', '심해', '심해', '해구 바닥', '해구 바닥',
  ])
})

test('산소 = 7일 남은 비율, 20% 미만이면 빨간 줄무늬 경고', () => {
  expect(oxygenOf(12)).toBe(88)
  expect(oxygenOf(undefined)).toBeUndefined()
  const svg = (seven: number) => bandSvg({ ...base, fiveHour: { percent: 30 }, sevenDay: { percent: seven } }, 0, false)
  expect(svg(85)).toContain('fill="url(#danger)"')
  expect(svg(85)).toContain('⚠ 산소 15%')
  expect(svg(30)).not.toContain('fill="url(#danger)"')
})

test('새 주가 오면 헬기 등장, 같은 주면 없음', () => {
  const usage = (resetsAt: string) => ({
    startedAt: 0,
    context: { tokens: 10, window: 100, percent: 10 },
    rateLimits: [{ kind: 'seven_day', percentUsed: 1, resetsAt }],
  })
  const week = weekKey('2026-11-09T00:00:12Z')
  expect(toSnapshot(usage('2026-11-09T00:00:40Z'), 0, null, week).intro).toBe(false)
  expect(toSnapshot(usage('2026-11-16T00:00:00Z'), 0, null, week).intro).toBe(true)
  // 날아와서(0~0.3) 잠깐 머물다 뛰어내리고 떠난다
  expect(bandSvg({ ...base, fiveHour: { percent: 5 }, intro: true }, 1000, false)).toContain('keyTimes="0;0.3;0.45;1"')
  // 한참 지난 뒤 다시 그려질 때는 헬기가 또 날아오지 않는다
  expect(bandSvg({ ...base, intro: true }, 1000, false)).toContain('values="420,42;230,42"')
  expect(bandSvg({ ...base, intro: true }, 60000, false)).not.toContain('values="420,42;230,42"')
})

test('0%면 헬기에 걸터앉아 점프 준비, 1%가 되는 순간 첨벙', () => {
  const waiting = bandSvg({ ...base, fiveHour: { percent: 0.4 } }, 60000, false)
  expect(waiting).toContain('class="sit"')
  expect(waiting).toContain('점프 준비')
  expect(waiting).not.toContain('첨벙')
  const jump = bandSvg({ ...base, fiveHour: { percent: 1 }, prevFivePercent: 0 }, 1000, false)
  expect(jump).toContain('첨벙~!')
  // 이미 물속이면 다시 뛰어들지 않는다
  expect(bandSvg({ ...base, fiveHour: { percent: 6 }, prevFivePercent: 3 }, 1000, false)).not.toContain('첨벙')
})

test('한도가 돌아오면 천천히 올라온다', () => {
  const svg = bandSvg({ ...base, fiveHour: { percent: 2 }, prevFivePercent: 90 }, 1000, false)
  expect(svg).toContain('올라오는 중')
  expect(svg).toContain('dur="6s" fill="freeze"')
})

test('깊이 40% 이상이면 머리 등을 켠다', () => {
  expect(bandSvg({ ...base, fiveHour: { percent: 45 } }, 60000, false)).toContain('#fff6b0')
  expect(bandSvg({ ...base, fiveHour: { percent: 15 } }, 60000, false)).not.toContain('#fff6b0')
})

test('바다 식구들: 대왕문어·토끼 태운 자라·해적선·보물·점프 돌고래·물 뿜는 고래', () => {
  const svg = bandSvg({ ...base, fiveHour: { percent: 50 } }, 60000, false)
  for (const name of ['giant-octopus', 'turtle', 'rabbit', 'pirate', 'treasure', 'leap', 'spout']) {
    expect(svg).toContain(`class="${name}"`)
  }
})

test('분홍 돌고래는 8번 중 1번꼴, 같은 답에서는 그대로', () => {
  const pinks = Array.from({ length: 80 }, (_, i) => isPinkDay(i * 1000)).filter(Boolean).length
  expect(pinks).toBe(10)
  const svg = (readAt: number) => bandSvg({ ...base, readAt, fiveHour: { percent: 30 } }, readAt + 60000, false)
  expect(svg(8000)).toContain('#f5a3c0')
  expect(svg(9000)).not.toContain('#f5a3c0')
})

test('인어와 덤보문어는 뺐다', () => {
  const svg = bandSvg({ ...base, fiveHour: { percent: 90 } }, 60000, false)
  expect(svg).not.toContain('class="mermaid"')
  expect(svg).not.toContain('class="dumbo"')
})
