# Postman을 이용하여 Mock Server와 API를 연습해보자.
아니면 MSW도 이용해도 된다.


## Mock Server를 사용하는 이유

<img width="639" alt="스크린샷 2023-12-15 오후 2 59 59" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/d7af687b-cd42-4ef3-b1d1-b704a3eeb2a9"><br>
프로젝트를 시작할 때 위와 같은 상황을 자주 접하게 된다.<br>
즉, 백엔드 진행상황에 의존적인 개발을 하게 된다.<br>
따라서 가짜 서버와 api를 명세서 대로만 먼저 구축한 뒤<br>
API연결을 미리 해보면 연속적인 개발을 할 수 있게 된다.<br>

## Server & API 생성
- 워크 스페이스 만들기
<img width="1440" alt="스크린샷 2023-12-15 오후 3 06 21" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/a0462173-d07f-4dde-aa4d-439ff35a42cb">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 06 48" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/56a68062-51a9-4f96-812a-1e3167832d16">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 07 21" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/028c897e-8d3e-45ca-b33e-f81503d1d802">

- 콜렉션 생성하여 간단한 API 만들기
<img width="1440" alt="스크린샷 2023-12-15 오후 3 07 44" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/e9400563-c09a-480e-9f54-4cccf3d62b2a">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 08 04" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/ccb96945-e3f8-4857-b89b-f7ca41b4d33d">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 08 29" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/a8495c2d-6a27-4aef-8ba1-35c366a95c35">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 09 37" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/52ab761c-9539-4c65-8239-a6af1391b2ae">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 10 01" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/185a7074-2fef-408c-aab9-14a41030fa69">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 11 47" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/24defcc1-cf88-49d1-902f-e98569c7a369">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 12 02" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/4e923a7a-4543-48b8-bebf-a8772eff50df">

- 이미 존재하는 콜렉션을 골라 Server 만들기
<img width="1440" alt="스크린샷 2023-12-15 오후 3 12 25" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/3ea0475a-7e1b-456e-8105-a55456756598">
<img width="1440" alt="스크린샷 2023-12-15 오후 3 14 17" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/0805fd14-3e9d-4f76-ae73-b59a6770362a">

## 실제 코드에서 Mock Server & API 적용
<img width="1153" alt="스크린샷 2023-12-15 오후 2 25 32" src="https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/983973f7-d7e8-4746-9c93-ebd50bba692e">

![ezgif-5-517f25af32](https://github.com/HOOOO98/TakeMeToTheMock/assets/120024673/c5fc4c58-98dc-4f8b-922d-19b9cadce6db)

### 코드
- App.js

```
import { useState } from "react";
import "./App.css";
import { api } from "./api/request";

function App() {
  const [status, setStatus] = useState();
  const [data, setData] = useState();

  const clickButton = () => {
    api
      .testMockServer()
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        setData(response.data);
      })
      .catch((error) => {
        console.error("API 요청 중 에러 발생:", error);

        setStatus("에러");
        setData(null);
      });
  };

  return (
    <div className="center">
      <button onClick={clickButton}>목 서버 요청</button>
      <>
        <h1>응답 상태: {status}</h1>
        <p>데이터 : {data}</p>
      </>
    </div>
  );
}

export default App;
```

- request.js
```
const URL =
  "https://efbc8546-fb36-48dd-9494-d086ccab61ab.mock.pstmn.io/practice/firstapi";

export const api = {
  testMockServer: () => {
    return fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};

```
