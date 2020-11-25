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
- Docker
- Jest

## Getting started

### Installation

```sh
npm i
```

### Starting server with docker

```sh
npm run start:docker
```

### Starting test with docker

```sh
npm run test:docker
```

## Test cases

- Scenario: List heroes

  ```sh
  # when request path is /heroes
  curl -i http://localhost:8080/heroes

  # then response status should be 200
  # then response body should have heroes props
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
  # when request path is /heroes/1
  curl -i http://localhost:8080/heroes/1

  # then response status should be 200
  # then response body should be hero with id 1
  HTTP/1.1 200 OK

  {
    "id": "1",
    "name": "Daredevil",
    "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
  }
  ```

- Scenario: List authenticated heroes

  ```sh
  # when request path is /heroes
  # when request has auth headers
  curl -H "Name: hahow" -H "Password: rocks" http://localhost:8080/heroes

  # then response status should be 200
  # then response body should have heroes props
  # then each hero of heros should have profile props
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

- Scenario: Get authenticated single hero

  ```sh
  # when request path is /heroes/1
  # when request has auth headers
  curl -H "Name: hahow" -H "Password: rocks" https://yourapiserver/heroes/1

  # then response status should be 200
  # then response body should be hero
  # then hero should have profile props
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
