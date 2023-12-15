# MSW를 이용하여 Mock Server 와 API 미리 맞춰보기
[postman으로도 가능하다.](https://github.com/HOOOO98/TakeMeToTheMock/tree/postman?tab=readme-ov-file#postman%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-mock-server%EC%99%80-api%EB%A5%BC-%EC%97%B0%EC%8A%B5%ED%95%B4%EB%B3%B4%EC%9E%90)

## msw 설정하기
- 디펜던시 설치하기<br>
`npm install msw --save-dev`

- public 폴더에 CLI 설치하기<br>
  `npx msw init public/ --save`

- 생선된 파일 확인하기
  - mockServiceWorker.js : CLI로 자동 생성된 파일
```
  /* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.0.11).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = 'c5f7f8e188b673ea4e677df7ea3c5a39'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

...

async function respondWithMock(response) {
  // Setting response status code to 0 is a no-op.
  // However, when responding with a "Response.error()", the produced Response
  // instance will have status code set to 0. Since it's not possible to create
  // a Response instance with status code 0, handle that use-case separately.
  if (response.status === 0) {
    return Response.error()
  }

  const mockedResponse = new Response(response.body, response)

  Reflect.defineProperty(mockedResponse, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  })

  return mockedResponse
}
```
  - src/mocks/handler.js : 응답할 api
```
import { HttpResponse, http } from "msw";

const todos = ["postman", "msw"];

export const handlers = [
  http.get("/main", () => {
    return HttpResponse.json(todos);
  }),
];

```
  - src/mocks/workers.js : 서버에서 request 가로챌 코드
```
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```
  - src/api/request.js : 요청할 api
```
export const api = {
  testMockServer: () => {
    return fetch("/main", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};
```
  -src/index.js : entry point에서 서버를 시작해 줘야 한다.
```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { worker } from "./mocks/workers";

worker.start();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```
