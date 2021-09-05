import { useState } from "react";
import Question1 from "./Components/Question1";
import Main from "./Main.module.scss";

function App() {
  interface TrackerInt {
    Question: number;
    Answer: number;
  }
  const [status, setStatus] = useState<boolean>(false);
  const [tracker, setTracker] = useState<TrackerInt>({ Question: 1, Answer: 0 });

  const startGame = (): void => {
    return setStatus(true);
  };

  const [Card, setCard] = useState<JSX.Element>(<button onClick={startGame}>START GAME</button>);

  //we need a start game button
  //asks 10 questions
  //multiple choice 4
  //click answer
  //

  return (
    <div className={Main.Main}>
      <h1>Mathematics PrototypeA</h1>
      {!status ? (
        <button className={Main.startbutton} onClick={startGame}>
          START GAME
        </button>
      ) : (
        <Question1 />
      )}
    </div>
  );
}

export default App;
