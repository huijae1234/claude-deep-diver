export type Snapshot = {
  tokens?: number
  contextPercent?: number
  fiveHour?: { percent: number; resetsAt?: string }
  sevenDay?: { percent: number; resetsAt?: string }
  // 바로 전 7일 사용량: 잠수부가 어디서부터 움직일지
  prevSevenPercent?: number
  // 새 주가 시작된 뒤 처음 켰을 때: 헬기에서 뛰어내린다
  intro: boolean
  readAt: number
}

declare module 'claude-code' {
  interface PluginState {
    'usage-band': { snapshot: Snapshot | null }
  }
}
