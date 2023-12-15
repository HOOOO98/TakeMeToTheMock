import { useState } from "react";
import "./App.css";

function App() {
  const [firstList, setFirstList] = useState();
  const [secondList, setSecondList] = useState();

  return (
    <>
      <button>투두 리스트 불러오기</button>
      <ul>
        <li>{firstList}</li>
        <li>{secondList}</li>
      </ul>
    </>
  );
}

export default App;
