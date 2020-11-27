# Proxy API Server

This project is base on my [typescript-koa-starter](https://github.com/EastSun5566/typescript-koa-starter)

## Required features

- 必須使用 Node.js 來實作這個 API server
- 完成後的 API 需要有相對應的測試
- 你的 code 裡面必須包含你所寫的註解
- 實作的過程必須使用 git 來做版本控管
- 可以使用第三方的 library
- 提供一份 README 文件說明
  - 我們該如何跑起這個 server
  - 專案的架構，API server 的架構邏輯
  - 你對於所有使用到的第三方 library 的理解，以及他們的功能簡介
  - 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解
    在這份專案中你遇到的困難、問題，以及解決的方法

## Using stack

- Node.js v12 w/ TypeScript
- Jest

## Table of Contents

- [Proxy API Server](#proxy-api-server)
  - [Required features](#required-features)
  - [Using stack](#using-stack)
  - [Table of Contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Requirement](#requirement)
    - [Installation](#installation)
    - [Building & Starting](#building--starting)
    - [Testing](#testing)
  - [Test cases](#test-cases)
  - [Architecture](#architecture)
    - [Folder structure](#folder-structure)
  - [Request & Response flow](#request--response-flow)
  - [Third party library](#third-party-library)
  - [Comment principle](#comment-principle)
  - [Problem](#problem)
  - [Others](#others)

## Getting started

### Requirement

- Node.js v10+

### Installation

```sh
npm i
```

### Building & Starting

```sh
npm run build && npm start
```

### Testing

```sh
npm test
```

## Test cases

- Scenario: List heroes

  ```sh
  curl -i http://localhost:8080/heroes

  HTTP/1.1 200 OK

  {
    "heroes": [
      {
        "id": "1",
        "name": "Daredevil",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
      },
      {
        "id": "2",
        "name": "Thor",
        "image": "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
      },
      // ...
    ]
  }
  ```

- Scenario: Get single hero

  ```sh
  curl -i http://localhost:8080/heroes/1

  HTTP/1.1 200 OK

  {
    "id": "1",
    "name": "Daredevil",
    "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
  }
  ```

- Scenario: Get single hero with invalid ID

  ```sh
  curl -i http://localhost:8080/heroes/999

  HTTP/1.1 404 Not Found

  {
    "message": "Not Found"
  }
  ```

- Scenario: List authenticated heroes

  ```sh
  curl -H "Name: hahow" -H "Password: rocks" http://localhost:8080/heroes

  HTTP/1.1 200 OK

  {
    "heroes": [
      {
        "id": "1",
        "name": "Daredevil",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
        "profile": {
          "str": 2,
          "int": 7,
          "agi": 9,
          "luk": 7
        },
      },
      {
        "id": "2",
        "name": "Thor",
        "image": "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
        "profile": {
          "str": 8,
          "int": 2,
          "agi": 5,
          "luk": 9
        },
      },
      // ...
    ]
  }
  ```

- Scenario: List authenticated heroes with invalid auth

  ```sh
  curl -H "Name: hahow" -H "Password: rockssss" http://localhost:8080/heroes

  HTTP/1.1 401 Unauthorized

  {
    "message": "Unauthenticated"
  }
  ```

- Scenario: Get authenticated single hero

  ```sh
  curl -H "Name: hahow" -H "Password: rocks" http://localhost:8080/heroes/1

  HTTP/1.1 200 OK

  {
    "id": "1",
    "name": "Daredevil",
    "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
    "profile": {
      "str": 2,
      "int": 7,
      "agi": 9,
      "luk": 7
    }
  }
  ```

- Scenario: Get authenticated single hero with invalid auth

  ```sh
  curl -H "Name: hahow" -H "Password: rockssss" http://localhost:8080/heroes/1

  HTTP/1.1 401 Unauthorized

  {
    "message": "Unauthenticated"
  }
  ```

## Architecture

### Folder structure

```sh
├── __test__
│   └── integration # 整合測試
├── src
│   ├── controllers # 控制器，處理請求與回應
│   ├── datascources # 資料來源，可能是 DB 或第三方 API，如：Hahow API
│   ├── middlewares # 中間件，請求進入的前後處理，如：驗證權限
│   ├── models # 資料模型，資料來源的映射與存取操作，如 Hero 模型
│   ├── router # 路由，依據路徑分發對應的控制器
│   └── services # 服務，主要的業務邏輯，會被注入控制器或中間件，如：驗證權限與存取 Hero 資源
└── server.ts
```

## Request & Response flow

請求進入會先經過的 auth middleware 驗證權限，再經過 router 找到對應 controller，
controller 注入 service 執行對應操作，service 視情況注入 Model 存取資料，最後回應

## Third party library

- Typescript: 引入靜態型別至 JS 讓開發階段減少錯誤與增強自動提示
- Koa/Koa-router: 快速建構 web App 的 web framework
- Axios: 發送請求至 Hahow API 的 HTTP client
- Jest/TS-Jest: 整合測試的 testing framework
- Eslint\*: 程式碼風格限制與修正
- Husky: commit 時啟動 linter 檢查與修正
- Nodemon/TS-Node: 開發階段自動重啟 server

## Comment principle

- 要注意的事項與參考來源
- 較為複雜或無法直覺理解的的邏輯或函式

## Problem

主要是架構設計上的思考，為了讓每一層都可測與獨立，大多採用依賴注入的方式，也須清楚定義各層的職責與避免強耦合

## Others

- 程式碼風格採用 [Airbnb JS Style Guide](https://github.com/airbnb/javascript)
- commit message 使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- 開發流程使用 [GitHub flow](https://guides.github.com/introduction/flow/)
