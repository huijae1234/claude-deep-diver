# claude-deep-diver 🤿

Claude Code 데스크톱 앱의 입력창 위에 **사용량 상태 띠**를 그려 주는 모드(mod)입니다.
사용량이 늘수록 잠수부가 더 깊은 바다로 내려갑니다.

## 띠가 보여 주는 것

| 칸 | 보여 주는 것 |
|---|---|
| ⌚ 잠수 시계 | **대화 기억**(지금 대화가 쓰는 토큰과 %). 여유 → 보통 → 빠듯 → 곧 정리 |
| 🌊 바다 | **5시간 한도**. 1%마다 잠수부가 조금씩 내려갑니다. 100%면 해구 바닥 |
| 🫧 산소통 | **7일 한도**. 남은 비율을 산소 압력계로 보여 줍니다. 20% 밑이면 빨간 줄무늬 경고 |

숫자는 상태줄과 같은 곳(`$.session.usage()`)에서 답이 끝날 때마다 읽습니다. 모델을 부르지 않고, 돈이 들지 않습니다.

## 바다 이야기

- **0%**: 잠수부가 빨간 헬기 발판에 걸터앉아 점프를 준비합니다. 1%가 되는 순간 "첨벙~!" 하고 뛰어듭니다.
- **새 주의 첫 실행**: 헬기가 날아와 잠수부가 뛰어내립니다.
- **5시간 한도가 초기화되면** 잠수부가 천천히 헤엄쳐 올라옵니다.

20%마다 바다가 바뀝니다.

| 깊이 | 바다 | 만나는 것 |
|---|---|---|
| 0~20% | 햇살 바다 | 노랑 쥐치, 흰동가리, 물고기 떼, 물개. 가끔 **돌고래가 물 위로 점프**하고, **고래가 물을 뿜습니다** |
| 20~40% | 푸른 바다 | 사나운 상어, 얄쌍한 돌고래. 낮은 확률로 **분홍 돌고래** |
| 40~60% | 고래의 바다 | 고래 가족, 대왕오징어, **토끼를 태운 자라**(별주부전). 잠수부 머리 등이 켜집니다 |
| 60~80% | 심해 | 화면을 꽉 채우는 **대왕문어**, 블롭피시, 독사고기 |
| 80~100% | 해구 바닥 | **해적선**과 흩어진 **보물**, 아귀, 해파리, 펠리컨장어 |

## 설치

터미널의 Claude Code 입력창에서:

```
/plugin install usage-band --marketplace huijae1234/claude-deep-diver
```

셸에서:

```bash
claude plugin install usage-band --marketplace huijae1234/claude-deep-diver
```

`Add marketplace?`가 나오면 `y`를 누르고, 범위는 Enter(사용자 범위)를 누릅니다.

데스크톱 앱에서는 입력창 옆 **+** → Plugins → Add marketplace에 `huijae1234/claude-deep-diver`를 넣고 → Add plugin을 누릅니다.

## 직접 고쳐 쓰기

```bash
claude --plugin-dir .
claude plugin test .
claude plugin validate .
```

## 폴더 구조

```
.claude-plugin/
  plugin.json        모드 정보
  marketplace.json   설치 목록
hooks/
  register.tsx   띠 그리기·사용량 읽기
  usage.ts       숫자 다듬기(토큰, 남은 시간)
  ocean.ts       바다·잠수부·헬기 장면
  creatures.ts   바다 생물
  deep.ts        대왕문어·해적선·보물
  surface.ts     돌고래 점프
  gear.ts        잠수 시계·산소통
  draw.ts        눈·꼬리 흔들기 같은 그리기 도구
  usage.test.ts  시험
```
