# AIoT 기반 실내 환경 데이터로거 및 이상 알림 시스템 최종 기획서

## 1. 프로젝트명

국문 제목:

**라즈베리파이를 활용한 AIoT 기반 실내 환경 데이터로거 및 이상 알림 시스템 구현**

영문 제목:

**Development of an AIoT-based Indoor Environmental Data Logger and Anomaly Alert System Using Raspberry Pi**

GitHub 레포지토리명 추천:

```text
aiot-env-anomaly-logger
```

YouTube 제목 추천:

```text
[기말 프로젝트] 라즈베리파이 AIoT 실내 환경 데이터로거 | DHT Sensor + MQ-2 + Flask + AI Anomaly Detection
```

## 2. 프로젝트 한 줄 요약

본 프로젝트는 라즈베리파이와 온습도 센서, MQ-2 가스 센서를 활용하여 실내 환경 데이터를 실시간으로 수집·저장하고, AI 이상탐지 모델을 통해 평소와 다른 환경 변화를 감지하여 LED, 부저, LCD, 웹 대시보드, Telegram 알림으로 사용자에게 경고하는 AIoT 기반 실내 환경 모니터링 시스템이다.

## 3. 프로젝트 기획 배경

기존 AIoT 실습에서는 각각의 센서를 개별적으로 제어하거나 단일 기능 중심의 시스템을 구현하였다. MQ-2 가스 센서를 활용한 가스/연기 감지 실습에서는 센서 입력에 따라 부저를 제어하였고, Flask 웹서버 실습에서는 웹페이지와 GPIO 출력을 연동하였다. 또한 Telegram 알림 실습에서는 외부 데이터를 메시지 형태로 사용자에게 전달하는 구조를 구현하였다.

이번 기말 프로젝트에서는 이러한 개별 실습들을 통합하여, 단순 센서 제어가 아닌 데이터 수집 -> 저장 -> AI 분석 -> 로컬 경고 -> 웹 모니터링 -> 원격 알림까지 이어지는 하나의 완성형 AIoT 시스템을 구현하고자 한다.

특히 단순히 "온도가 높으면 위험", "가스가 감지되면 위험"처럼 조건문만 사용하는 것이 아니라, 정상 상태의 온도·습도·가스 센서값 패턴을 학습한 뒤 현재 데이터가 평소와 다르면 AI가 이상 상태로 판단하도록 구성한다.

## 4. 프로젝트 목표

1. 라즈베리파이에 온습도 센서와 MQ-2 가스 센서를 연결하여 실내 환경 데이터를 실시간으로 측정한다.
2. 측정된 데이터를 CSV 또는 SQLite 형태로 저장하여 시간별 환경 변화 기록을 남긴다.
3. 정상 상태 데이터를 기반으로 AI 이상탐지 모델을 학습시키고, 실시간 센서 데이터가 정상 패턴에서 벗어나는지 판단한다.
4. 이상 상태가 발생하면 LED, 부저, LCD를 이용해 현장에서 즉시 확인할 수 있도록 한다.
5. Flask 웹 대시보드를 통해 현재 온도, 습도, 가스값, AI 판단 결과, 최근 로그를 웹에서 확인할 수 있도록 한다.
6. 이상 상태 발생 시 Telegram 알림을 전송하여 원격에서도 환경 이상을 확인할 수 있도록 한다.

## 5. 과제 조건 충족 계획

| 과제 조건 | 충족 방법 |
| --- | --- |
| 지난 수업 내용 2개 이상 활용 | MQ-2 가스 감지, Flask 웹서버, Telegram 알림, GPIO LED/부저 제어 활용 |
| 브레드보드와 센서 활용 | DHT 온습도 센서, MQ-2 가스 센서, 브레드보드 회로 구성 |
| 결과보고서 제출 | 기존 AIoT 보고서 양식 기반으로 작성 |
| 결과 링크 제출 | YouTube 시연 영상 업로드 |
| GitHub 제출 | 전체 소스코드와 README 정리 |
| 소스코드 첨부 | GitHub 및 과제 제출 파일에 포함 |

보고서 형식은 기존 실험보고서와 동일하게 요약, 키워드, 실험 목적, 실험 내용, 2-1 이론 및 기술, 2-2 실험 환경 및 절차, 실험 결과, GitHub, YouTube, 참고문헌 흐름으로 작성한다.

## 6. 최종 기능 구성

### 6-1. 온습도 측정 기능

DHT11 또는 DHT22 센서를 사용하여 실내 온도와 습도를 측정한다.

```text
Temperature: 25.4℃
Humidity: 48.2%
```

DHT11은 현재 보유한 키트로 구현 가능하고, DHT22를 추가로 사용하면 더 정밀한 습도 측정이 가능하다. 과제 구현만 보면 DHT11도 가능하지만, 포트폴리오 완성도까지 생각하면 DHT22 사용이 더 좋다.

### 6-2. 가스/연기 감지 기능

MQ-2 센서를 사용하여 가스 또는 연기 상태를 감지한다. 기존 실험에서는 MQ-2 센서의 DOUT 값을 이용해 LOW 상태일 때 가스가 감지된 것으로 판단하고 부저를 작동시키는 구조를 구현하였다.

이번 프로젝트에서는 가능하면 MQ-2의 아날로그 출력값을 PCF8591 ADC 모듈로 읽는 방향이 좋다.

단순 디지털 방식:

```text
가스 감지됨 / 감지 안 됨
```

아날로그 방식:

```text
Gas Value: 135
Gas Value: 220
Gas Value: 480
```

아날로그값을 사용하면 AI 모델이 "가스값이 평소보다 얼마나 증가했는지"를 분석할 수 있기 때문에 이상탐지 기능을 훨씬 자연스럽게 구현할 수 있다.

### 6-3. 데이터 저장 기능

센서값과 AI 판단 결과를 CSV 파일에 저장한다.

파일명 예시:

```text
data/sensor_log.csv
```

저장 항목:

```text
timestamp
temperature
humidity
gas_value
temp_change
humidity_change
gas_change
ai_result
anomaly_score
system_status
```

저장 예시:

```csv
timestamp,temperature,humidity,gas_value,temp_change,humidity_change,gas_change,ai_result,anomaly_score,system_status
2026-06-01 14:20:00,24.8,48.2,135,0.1,-0.2,3,NORMAL,0.124,NORMAL
2026-06-01 14:21:00,25.2,65.4,148,0.4,17.2,13,ANOMALY,-0.221,WARNING
2026-06-01 14:22:00,25.6,52.0,510,0.4,-13.4,362,ANOMALY,-0.512,DANGER
```

처음에는 CSV로 구현하고, 시간이 남으면 SQLite로 확장한다.

### 6-4. 로컬 상태 표시 기능

LED, 부저, LCD를 사용하여 현재 시스템 상태를 표시한다.

| 상태 | 의미 | 출력 |
| --- | --- | --- |
| NORMAL | 정상 상태 | 초록 LED ON, 부저 OFF |
| WARNING | AI가 이상 패턴 감지 | 노랑 LED ON, 부저 짧게 울림 |
| DANGER | 가스값 위험 또는 심각한 이상 | 빨강 LED ON, 부저 반복 울림 |

LCD 표시 예시:

```text
T:25.4 H:48.2
G:135 NORMAL
```

WARNING 상태:

```text
AI: ANOMALY
CHECK ENV
```

DANGER 상태:

```text
GAS DANGER
CHECK NOW!
```

### 6-5. Flask 웹 대시보드 기능

Flask 웹서버를 이용하여 현재 센서값과 AI 판단 결과를 웹페이지에서 확인한다.

웹 대시보드 표시 항목:

- 현재 온도
- 현재 습도
- 현재 가스값
- 온도 변화량
- 습도 변화량
- 가스 변화량
- AI 판단 결과
- Anomaly Score
- 시스템 상태
- 최근 로그

대시보드 예시:

```text
AIoT Indoor Environment Logger

Temperature: 25.4℃
Humidity: 48.2%
Gas Value: 138

AI Result: NORMAL
Anomaly Score: 0.124
System Status: NORMAL

Recent Logs
2026-06-01 14:20:00 | 25.4 | 48.2 | 138 | NORMAL
2026-06-01 14:21:00 | 25.6 | 49.0 | 142 | NORMAL
2026-06-01 14:22:00 | 25.9 | 63.5 | 150 | ANOMALY
```

### 6-6. Telegram 원격 알림 기능

이상 상태가 발생하면 Telegram 봇을 통해 알림 메시지를 전송한다.

WARNING 알림 예시:

```text
[AIoT 실내 환경 모니터링 알림]

상태: WARNING
AI 판단: ANOMALY

온도: 26.2℃
습도: 67.8%
가스값: 210
가스 변화량: +85

평소 정상 환경 패턴과 다른 센서값 변화가 감지되었습니다.
실내 환경 상태를 확인하세요.
```

DANGER 알림 예시:

```text
[AIoT 긴급 알림]

상태: DANGER
가스/연기 이상 감지

온도: 25.8℃
습도: 52.1%
가스값: 520

즉시 현장을 확인하고 환기 또는 안전 조치를 수행하세요.
```

## 7. AI 이상탐지 기능 상세 기획

### 7-1. AI가 하는 역할

AI는 온도, 습도, 가스값의 현재 값과 변화량을 기반으로 현재 환경이 평소 정상 상태와 비슷한지, 아니면 비정상적인 패턴인지 판단한다.

```text
정상 상태 데이터 패턴 학습
-> 현재 센서값 입력
-> 정상 패턴과 비교
-> NORMAL 또는 ANOMALY 판단
```

### 7-2. 조건문과 AI의 차이

조건문 방식은 사람이 기준을 직접 정한다.

```python
if humidity > 80:
    status = "DANGER"

if gas_value > 500:
    status = "DANGER"
```

이 방식은 기준이 명확하다는 장점이 있지만, 기준 이하의 이상 변화는 감지하기 어렵다.

예를 들어 평소 환경이 다음과 같다고 가정한다.

```text
온도: 24~25℃
습도: 45~50%
가스값: 120~150
```

현재 상태가 다음과 같다면:

```text
온도: 27℃
습도: 63%
가스값: 280
```

사람이 설정한 위험 기준이 습도 80%, 가스값 500이라면 조건문은 아직 정상으로 판단할 수 있다. 그러나 평소 환경과 비교하면 온도, 습도, 가스값이 모두 평소 범위에서 크게 벗어났으므로 AI는 이를 이상 상태로 판단할 수 있다.

### 7-3. AI 입력 데이터

| 입력값 | 설명 |
| --- | --- |
| temperature | 현재 온도 |
| humidity | 현재 습도 |
| gas_value | 현재 MQ-2 센서값 |
| temp_change | 직전 측정값 대비 온도 변화량 |
| humidity_change | 직전 측정값 대비 습도 변화량 |
| gas_change | 직전 측정값 대비 가스값 변화량 |

예시:

```text
24.5, 48, 135, +0.1, -0.2, +3 -> NORMAL
25.2, 50, 430, +0.2, +1.0, +280 -> ANOMALY
27.0, 68, 150, +2.1, +18.0, +5 -> ANOMALY
```

### 7-4. 사용할 AI 모델

추천 모델은 **Isolation Forest**이다.

Isolation Forest를 사용하는 이유는 다음과 같다.

1. 일반 분류 모델은 정상 데이터와 이상 데이터를 많이 모으고 각각 라벨링해야 한다.
2. 과제 환경에서는 다양한 이상 상황 데이터를 많이 수집하기 어렵다.
3. Isolation Forest는 정상 데이터 중심으로 학습한 뒤, 평소와 다른 데이터를 이상값으로 판단할 수 있다.

학습 과정:

1. 정상 상태에서 온도·습도·가스값 데이터 수집
2. 각 센서값의 변화량 계산
3. temperature, humidity, gas_value, 변화량 feature 생성
4. Isolation Forest 모델 학습
5. 학습된 모델 저장
6. 실시간 센서값을 입력해 NORMAL / ANOMALY 판단

### 7-5. 안전 조건문과 AI의 역할 분리

가스/연기처럼 위험도가 높은 상황은 AI 판단만 기다리면 안 된다. 따라서 가스값이 특정 위험 기준 이상이면 조건문으로 즉시 DANGER 상태로 처리한다.

```text
가스값이 위험 기준 이상 -> 즉시 DANGER
```

AI는 다음과 같은 상황을 담당한다.

```text
위험 기준까지는 도달하지 않았지만,
평소와 다른 온습도·가스값 조합이나 변화량이 나타나는 경우
-> ANOMALY 판단
```

최종 판단 구조:

```text
센서값 측정
-> 안전 조건 검사
-> AI 이상탐지 검사
-> 최종 상태 결정
-> 로컬 경고 및 원격 알림
```

## 8. 시스템 동작 시나리오

### 8-1. 정상 상태

```text
온도: 24.8℃
습도: 48.2%
가스값: 135
AI 판단: NORMAL
시스템 상태: NORMAL
```

동작:

- 초록 LED ON
- 부저 OFF
- LCD NORMAL 표시
- 웹 대시보드 NORMAL 표시
- CSV 로그 저장

### 8-2. 습도 급변 상태

```text
온도: 25.3℃
습도: 68.0%
가스값: 142
습도 변화량: +18.0
AI 판단: ANOMALY
시스템 상태: WARNING
```

동작:

- 노랑 LED ON
- 부저 짧게 울림
- LCD WARNING 표시
- 웹 대시보드 WARNING 표시
- Telegram 알림 전송
- CSV 로그 저장

### 8-3. 가스값 상승 상태

```text
온도: 25.1℃
습도: 50.2%
가스값: 430
가스 변화량: +260
AI 판단: ANOMALY
시스템 상태: WARNING 또는 DANGER
```

동작:

- 노랑 또는 빨강 LED ON
- 부저 작동
- 웹 대시보드 상태 변경
- Telegram 알림 전송
- CSV 로그 저장

### 8-4. 가스 위험 상태

```text
온도: 25.8℃
습도: 52.1%
가스값: 520
안전 조건: 위험 기준 초과
시스템 상태: DANGER
```

동작:

- 빨강 LED ON
- 부저 반복 울림
- LCD GAS DANGER 표시
- 웹 대시보드 DANGER 표시
- Telegram 긴급 알림 전송
- CSV 로그 저장

## 9. 하드웨어 구성

### 사용 부품

| 부품 | 용도 |
| --- | --- |
| Raspberry Pi 4B 또는 5 | 메인 제어 장치 |
| DHT11 또는 DHT22 | 온도·습도 측정 |
| MQ-2 가스 센서 | 가스/연기 감지 |
| PCF8591 ADC | MQ-2 아날로그값 읽기 |
| LED 3개 | 상태 표시 |
| 330Ω 저항 | LED 보호 |
| 능동부저 | 경고음 출력 |
| 1602 LCD | 로컬 상태 표시 |
| 브레드보드 | 회로 구성 |
| 점퍼 케이블 | 배선 |

### GPIO 연결 예시

| 장치 | 연결 예시 |
| --- | --- |
| DHT DATA | GPIO 4 |
| MQ-2 DOUT | GPIO 17 |
| MQ-2 AOUT | PCF8591 AIN0 |
| PCF8591 SDA | Raspberry Pi SDA |
| PCF8591 SCL | Raspberry Pi SCL |
| 초록 LED | GPIO 20 |
| 노랑 LED | GPIO 21 |
| 빨강 LED | GPIO 26 |
| 부저 | GPIO 18 |
| LCD 1602 | I2C 또는 GPIO 방식 |

처음에는 MQ-2 DOUT으로 가스 감지 여부를 확인하고, 이후 PCF8591을 이용해 AOUT 값을 읽는 방식으로 확장하는 것을 추천한다.

## 10. 소프트웨어 구성

### 폴더 구조 추천

```text
aiot-env-anomaly-logger/
├── README.md
├── requirements.txt
├── main.py
├── app.py
├── sensor_reader.py
├── anomaly_model.py
├── train_model.py
├── logger.py
├── notifier.py
├── config.py
├── templates/
│   └── index.html
├── static/
│   └── style.css
├── data/
│   └── sensor_log.csv
├── models/
│   └── isolation_forest.pkl
└── images/
    ├── circuit.jpg
    ├── dashboard.png
    └── result.jpg
```

### 파일별 역할

| 파일 | 역할 |
| --- | --- |
| main.py | 센서 측정, AI 판단, LED/부저 제어, 로그 저장 |
| app.py | Flask 웹 대시보드 실행 |
| sensor_reader.py | DHT, MQ-2, PCF8591 센서값 읽기 |
| train_model.py | 정상 데이터 기반 AI 모델 학습 |
| anomaly_model.py | AI 모델 로드 및 실시간 이상탐지 |
| logger.py | CSV 로그 저장 |
| notifier.py | Telegram 알림 전송 |
| config.py | GPIO 핀, 기준값, Telegram 설정 관리 |
| templates/index.html | 웹 대시보드 HTML |
| static/style.css | 웹 대시보드 CSS |

## 11. 구현 단계

1. 온습도 센서 테스트: DHT11 또는 DHT22를 연결하여 온도와 습도가 정상적으로 출력되는지 확인한다.
2. MQ-2 센서 테스트: 먼저 DOUT을 이용해 가스 감지 여부를 확인하고, 가능하면 PCF8591을 사용해 AOUT 아날로그값을 읽는다.
3. LED/부저 테스트: NORMAL, WARNING, DANGER 상태에 따라 LED와 부저가 정상적으로 동작하는지 확인한다.
4. 데이터 저장 구현: 센서값을 2초 또는 5초 주기로 CSV에 저장한다.
5. 정상 데이터 수집: 정상 환경에서 데이터를 10~30분 정도 수집한다.
6. AI 모델 학습: 수집한 정상 데이터를 바탕으로 Isolation Forest 모델을 학습한다.
7. 실시간 AI 판단 적용: 실시간 센서값을 AI 모델에 입력하여 NORMAL 또는 ANOMALY 결과를 출력한다.
8. Flask 대시보드 구현: 웹에서 현재 센서값과 AI 결과를 확인할 수 있도록 한다.
9. Telegram 알림 구현: WARNING 또는 DANGER 상태일 때 Telegram 알림을 전송한다.
10. 통합 테스트 및 시연 영상 촬영: 정상 상태, 습도 변화, 가스 변화, 로그 저장, 웹 대시보드, Telegram 알림을 모두 확인한다.

## 12. 시연 영상 구성

영상은 2~3분 정도로 구성하면 좋다.

### 장면 1. 프로젝트 소개

보여줄 것:

- 전체 회로
- 라즈베리파이
- DHT 센서
- MQ-2 센서
- LED
- 부저
- LCD
- 웹 대시보드

멘트 예시:

> 본 프로젝트는 라즈베리파이를 활용하여 실내 온습도와 가스 데이터를 측정하고, AI 이상탐지 모델을 통해 비정상 환경 변화를 감지하는 AIoT 기반 실내 환경 데이터로거입니다.

### 장면 2. 정상 상태

- 초록 LED ON
- 부저 OFF
- LCD NORMAL 표시
- 웹 대시보드 NORMAL
- CSV 로그 저장

### 장면 3. 습도 변화 시연

센서에 물을 직접 닿게 하지 않고, 입김 또는 젖은 휴지를 센서 근처에 둔다.

- 습도값 상승
- AI Result: ANOMALY
- System Status: WARNING
- 노랑 LED ON
- Telegram 알림 도착
- 웹 대시보드 상태 변경

### 장면 4. 가스 변화 시연

불을 사용하지 않고, 손소독제나 알코올 솜을 MQ-2 센서 근처에 살짝 접근시킨다.

- 가스값 상승
- AI Result: ANOMALY
- System Status: DANGER
- 빨강 LED ON
- 부저 ON
- Telegram 긴급 알림 도착
- 웹 대시보드 DANGER 표시

### 장면 5. 로그 저장 확인

- sensor_log.csv 파일
- 시간, 온도, 습도, 가스값, AI 판단 결과, 상태 저장 확인

## 13. 보고서 작성 방향

보고서는 기존 AIoT 실험보고서 형식에 맞춘다.

목차 추천:

```text
요 약
키워드

1. 실험 목적

2. 실험 내용

2-1. 실험 관련 이론 및 기술
  2-1-1. AIoT와 실내 환경 데이터로거
  2-1-2. DHT 온습도 센서
  2-1-3. MQ-2 가스 센서
  2-1-4. Flask 웹 대시보드
  2-1-5. Telegram 원격 알림
  2-1-6. Isolation Forest 기반 이상탐지

2-2. 실험 환경 및 절차
  하드웨어 구성
  소프트웨어 구성
  센서 데이터 수집 절차
  AI 모델 학습 절차
  알림 및 대시보드 구현 절차

3. 실험 결과
  정상 상태 결과
  습도 변화 감지 결과
  가스값 변화 감지 결과
  웹 대시보드 결과
  Telegram 알림 결과
  로그 저장 결과

[소스코드: 깃허브]
[데모영상: 유튜브]

참고문헌
```

## 14. README 구성

GitHub README는 포트폴리오용으로 보기 좋게 작성한다.

목차 추천:

```text
# AIoT Indoor Environment Logger

## 1. Project Overview
## 2. Features
## 3. System Architecture
## 4. Hardware Components
## 5. Circuit Configuration
## 6. Software Stack
## 7. AI Anomaly Detection
## 8. Web Dashboard
## 9. Telegram Alert
## 10. Demo
## 11. How to Run
## 12. Result
## 13. Future Improvements
```

## 15. 최종 기대 결과

1. 온도와 습도가 실시간으로 측정된다.
2. MQ-2 센서로 가스/연기 값 변화를 측정할 수 있다.
3. 센서값이 CSV 파일에 시간별로 저장된다.
4. AI 모델이 정상 패턴과 다른 센서값 변화를 ANOMALY로 판단한다.
5. 이상 상태 발생 시 LED와 부저가 동작한다.
6. LCD에 현재 상태가 표시된다.
7. Flask 웹 대시보드에서 센서값과 AI 결과를 확인할 수 있다.
8. Telegram으로 이상 알림이 전송된다.
9. YouTube 영상에서 정상/이상/위험 상태 시연이 가능하다.
10. GitHub에 포트폴리오용 프로젝트로 정리할 수 있다.

## 16. 최종 정리

최종 주제:

**라즈베리파이를 활용한 AIoT 기반 실내 환경 데이터로거 및 이상 알림 시스템 구현**

이 주제는 과제 조건을 충족하면서도 단순 센서 실습보다 완성도가 높다. 온습도 센서, MQ-2 가스 센서, 브레드보드, LED, 부저, LCD를 활용하고, Flask 웹 대시보드와 Telegram 알림, AI 이상탐지 모델까지 포함하기 때문에 AIoT 설계실습 기말 프로젝트로 충분히 좋은 구성이다.

핵심 차별점:

```text
단순 조건문 기반 경고 시스템이 아니라,
정상 환경 데이터 패턴을 학습한 AI 모델이
평소와 다른 센서값 변화까지 감지하는 실내 환경 모니터링 시스템
```
