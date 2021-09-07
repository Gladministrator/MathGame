import { useRef, useState } from "react";
import Question1 from "./Components/Question1";
import Subtract from "./Components/Subtract";
import Multiply from "./Components/Multiply";
import Divide from "./Components/Divide";
import Main from "./Main.module.scss";

function App() {
  const [status, setStatus] = useState<boolean>(false);
  const val = useRef<string | null>(null);
  const startGame = (ops: string): void => {
    val.current = ops;
    setStatus(true);
  };

  function questionType(): JSX.Element {
    switch (val.current) {
      case "+":
        return <Question1 setStatus={setStatus} />;
      case "-":
        return <Subtract setStatus={setStatus} />;
      case "*":
        return <Multiply setStatus={setStatus} />;
      default:
        return <Divide setStatus={setStatus} />;
    }
  }

  return (
    <div className={Main.Main}>
      <h1>Mathematics</h1>
      {!status ? (
        <div>
          <h1>What would you like to do today?</h1>
          <div className={Main.operatordiv}>
            <button className={Main.startbutton} onClick={() => startGame("+")}>
              Addition
            </button>
            <button className={Main.startbutton} onClick={() => startGame("-")}>
              Subtraction
            </button>
            <button className={Main.startbutton} onClick={() => startGame("*")}>
              Multiplication
            </button>
            <button className={Main.startbutton} onClick={() => startGame("/")}>
              Division
            </button>
          </div>
        </div>
      ) : (
        questionType()
      )}
    </div>
  );
}

export default App;
