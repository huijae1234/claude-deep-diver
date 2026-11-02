import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Snapshot } from '../types'
import { memoryLevel, oxygenOf } from './gear'
import { BAND_H, BAND_W, bandAlt, bandSvg, ZONES, zoneOf } from './ocean'
import { blocks, resetText, tokensText, toSnapshot, weekKey } from './usage'

const snapshot = atom({ plugin: 'usage-band', key: 'snapshot' } as const, null as Snapshot | null)

// 숫자는 상태줄과 같은 곳($.session.usage)에서 읽는다. 모델 호출·금액 없음.
async function refresh($: EngineInterface) {
  const usage = await $.session.usage()
  const lastWeek = (await $.store.get('week')) as string | undefined
  const next = toSnapshot(usage, await $.clock.now(), await read($, snapshot), lastWeek)
  // 헬기 등장은 새 주에 한 번만
  const week = weekKey(next.sevenDay?.resetsAt)
  if (week) await $.store.set('week', week)
  await update($, snapshot, () => next)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    await refresh($)
    return result
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    await refresh($)
    return result
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const s = await read($, snapshot)
    if (e.props.hasSurvey || s === null) return next(e)

    const now = await $.clock.now()

    if (e.surface === 'desktop') {
      const { Svg } = $.ui.resolve(e)
      return (
        <Svg
          source={bandSvg(s, now, e.props.isWorking)}
          alt={bandAlt(s, now)}
          width={BAND_W}
          height={BAND_H}
          isInteractive
        />
      )
    }

    const { Box, Text } = $.ui.resolve(e)
    const reset = resetText(s.fiveHour?.resetsAt, now)
    const o2 = oxygenOf(s.sevenDay?.percent)
    return (
      <Box gap={2}>
        <Text color={memoryLevel(s.contextPercent).color}>
          ⌚ 대화 기억 {tokensText(s.tokens)} · {memoryLevel(s.contextPercent).label}
        </Text>
        <Text color={(s.fiveHour?.percent ?? 0) > 80 ? 'red' : 'blue'}>
          🤿 5시간 {blocks(s.fiveHour?.percent)} {Math.round(s.fiveHour?.percent ?? 0)}% · {ZONES[zoneOf(s.fiveHour?.percent)]}
          {reset ? ` · ${reset}` : ''}
        </Text>
        <Text color={(o2 ?? 100) < 20 ? 'red' : 'magenta'}>🫧 7일 산소 {o2 ?? '—'}% 남음</Text>
      </Box>
    )
  })
}
