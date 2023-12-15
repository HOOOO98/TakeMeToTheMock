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
