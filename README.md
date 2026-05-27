# AI Smart Humidifier

라즈베리파이를 활용한 AI 기반 실내 습도 예측 스마트 자동 가습 시스템 프로젝트입니다.

실내 온습도와 외부 날씨 API 데이터를 기반으로 AI 모델이 10분 후 실내 습도를 예측하고, 예측값과 비접촉식 수위센서의 물 부족 감지 결과에 따라 물병형 초음파 가습기 모듈을 자동 제어하는 AIoT 시스템을 목표로 합니다.

## Project Page

- [배포된 기획서 웹페이지](https://raspberrypi-project.vercel.app/)
- [Markdown 기획서](./PROJECT_PLAN.md)
- [HTML 기획서 소스](./project-plan/index.html)

## Web Page Structure

```text
project-plan/
├── index.html
├── style.css
├── script.js
└── image.png
```

## Key Features

- DHT22 기반 실내 온습도 측정
- OpenWeatherMap API 외부 날씨 데이터 연동
- RandomForestRegressor 기반 10분 후 실내 습도 예측
- XKC-Y25-V 비접촉식 수위센서 기반 물 부족 감지
- 릴레이를 이용한 초음파 가습기 모듈 자동 제어
- 물 부족 시 가습기 강제 OFF
- LCD1602, LED, 부저 상태 표시
- Flask 웹 대시보드
- CSV 데이터 로깅, MAE 평가, Feature Importance 분석

## Tech Stack

Raspberry Pi, Python, DHT22, XKC-Y25-V, Relay Module, LCD1602, OpenWeatherMap API, scikit-learn, RandomForestRegressor, Flask, gpiozero, CSV logging
