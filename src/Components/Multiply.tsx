import React, { useEffect, useState } from "react";
import QuestionCSS from "./CoreComponent.module.scss";
interface TrackerInt {
  Question: number;
  Answer: number;
}
interface IOptions {
  a: number;
  b: number;
  c: number;
  d: number;
}
interface Inumber {
  x: number;
  y: number;
}
interface Iproperator {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Multiply = ({ setStatus }: Iproperator): JSX.Element => {
  const [qsstate, setqssstate] = useState<TrackerInt>({ Question: 1, Answer: 0 });
  const [number, setNumber] = useState<Inumber>({
    x: Math.floor(Math.random() * 11),
    y: Math.floor(Math.random() * 11),
  });
  const [displayer, setDisplayer] = useState<JSX.Element[]>([]);

  useEffect(answerQuestion, [number]);
  function nextQuestion(points: number): void {
    setqssstate({ Question: qsstate.Question + 1, Answer: qsstate.Answer + points });
    setNumber({ x: Math.floor(Math.random() * 11), y: Math.floor(Math.random() * 11) });
  }

  function answerQuestion() {
    if (qsstate.Question > 10) {
      setDisplayer([]);
    } else {
      setDisplayer([]);
      const optionsObject: IOptions = { a: 0, b: 1, c: 2, d: 3 };
      const correctAnswerPosition: number = Math.floor(Math.random() * 4);
      switch (correctAnswerPosition) {
        case 0:
          optionsObject.a = number.x * number.y;
          optionsObject.b = number.x * number.y + Math.floor(Math.random() * 4 + 3); // 3-6 add no overlap
          optionsObject.c = number.x * number.y + Math.floor(Math.random() * 2 + 1); //1-2 add no overlap
          optionsObject.d = number.x * number.y + Math.floor(Math.random() * 4 + 7); //7-9 sub no overlap
          break;
        case 1:
          optionsObject.b = number.x * number.y;
          optionsObject.d = number.x * number.y + Math.floor(Math.random() * 4 + 3); //3-6
          optionsObject.c = number.x * number.y + Math.floor(Math.random() * 2 + 1); //1-2
          optionsObject.a = number.x * number.y - Math.floor(Math.random() * 2 + 1); //1-2
          break;
        case 2:
          optionsObject.c = number.x * number.y;
          optionsObject.a = number.x * number.y - Math.floor(Math.random() * 4 + 3); //3-6
          optionsObject.d = number.x * number.y - Math.floor(Math.random() * 2 + 1); //1-2
          optionsObject.b = number.x * number.y - Math.floor(Math.random() * 4 + 7); //7
          break;
        case 3:
          optionsObject.d = number.x * number.y;
          optionsObject.c = number.x * number.y - Math.floor(Math.random() * 4 + 3); //3 - 6
          optionsObject.a = number.x * number.y - Math.floor(Math.random() * 2 + 1); // 1-3
          optionsObject.b = number.x * number.y + Math.floor(Math.random() * 3 + 7); //7 - 8
          break;
      }
      console.log(correctAnswerPosition, optionsObject);
      for (let property in optionsObject) {
        if (optionsObject[property as keyof IOptions] === number.x * number.y) {
          setDisplayer((previous) => [
            ...previous,
            <button
              key={optionsObject[property as keyof IOptions]}
              className={QuestionCSS.button}
              onClick={() => nextQuestion(1)}>
              {optionsObject[property as keyof IOptions]}
            </button>,
          ]);
        } else {
          setDisplayer((previous) => [
            ...previous,
            <button
              key={optionsObject[property as keyof IOptions]}
              className={QuestionCSS.button}
              onClick={() => nextQuestion(0)}>
              {optionsObject[property as keyof IOptions]}
            </button>,
          ]);
        }
      }
    }
  }

  return (
    <div className={QuestionCSS.Page}>
      <div className={QuestionCSS.ScoreCard}>POINTS: {qsstate.Answer * 10}</div>
      {qsstate.Question <= 10 ? (
        <div>
          <div className={QuestionCSS.wording}>Question: {qsstate.Question} of 10</div>
          <div className={QuestionCSS.wording}>
            What is {number.x} x {number.y}?
          </div>
          <div className={QuestionCSS.wording}>Click on the correct answer :</div>
          <div className={QuestionCSS.buttondiv}>{displayer}</div>
          <div className={QuestionCSS.replayContainer}>
            <button className={QuestionCSS.replay} onClick={() => setStatus(false)}>
              Back to selection
            </button>
          </div>
        </div>
      ) : null}

      {qsstate.Question > 10 && (
        <div className={QuestionCSS.wording}>
          You scored {`${qsstate.Answer} out of 10`}
          <div>{qsstate.Answer === 10 && " Good Job!"}</div>
          <div>Do you want to play again?</div>
          <button onClick={() => setStatus(false)} className={QuestionCSS.replay}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Multiply;
