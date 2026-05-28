# AIoT Indoor Environment Logger

라즈베리파이를 활용한 AIoT 기반 실내 환경 데이터로거 및 이상 알림 시스템 프로젝트입니다.

온습도 센서와 MQ-2 가스 센서로 실내 환경 데이터를 수집하고, 정상 환경 데이터 패턴을 학습한 AI 이상탐지 모델로 평소와 다른 변화를 감지합니다. 이상 상태가 발생하면 LED, 부저, LCD, Flask 웹 대시보드, Telegram 알림으로 사용자에게 경고합니다.

## Project Page

- [배포된 기획서 웹페이지](https://raspberrypi-project.vercel.app/)
- [Markdown 기획서](./PROJECT_PLAN.md)
- [HTML 기획서 소스](./project-plan/index.html)

## Repository Name

```text
aiot-env-anomaly-logger
```

## Key Features

- DHT11/DHT22 기반 온도·습도 측정
- MQ-2 가스 센서 기반 가스/연기 감지
- PCF8591 ADC를 이용한 MQ-2 아날로그값 수집 확장
- CSV 기반 센서 데이터 로깅
- Isolation Forest 기반 AI 이상탐지
- NORMAL, WARNING, DANGER 상태 분류
- LED, 부저, LCD 로컬 경고 출력
- Flask 웹 대시보드
- Telegram 원격 알림

## Planned Structure

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
└── models/
    └── isolation_forest.pkl
```

## Tech Stack

Raspberry Pi, Python, DHT Sensor, MQ-2, PCF8591 ADC, LCD1602, Flask, Telegram Bot API, scikit-learn, Isolation Forest, CSV logging
