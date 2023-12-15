import { useState } from "react";
import "./App.css";
import { api } from "./api/request";

function App() {
  const [firstList, setFirstList] = useState();
  const [secondList, setSecondList] = useState();

  const clickButton = () => {
    api
      .testMockServer()
      .then((response) => {
        console.log(response);
        setFirstList(response[0]);
        setSecondList(response[1]);
      })
      .catch((error) => {
        console.error("API 요청 중 에러 발생:", error);

        setFirstList("에러");
        setSecondList("에러");
      });
  };

  return (
    <>
      <button onClick={clickButton}>투두 리스트 불러오기</button>
      <ul>
        <li>{firstList}</li>
        <li>{secondList}</li>
      </ul>
    </>
  );
}

export default App;
