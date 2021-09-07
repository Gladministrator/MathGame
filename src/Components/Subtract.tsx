import React, { useEffect, useRef, useState } from "react";
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

const Subtract = ({ setStatus }: Iproperator): JSX.Element => {
  const [qsstate, setqssstate] = useState<TrackerInt>({ Question: 1, Answer: 0 });
  const [number, setNumber] = useState<Inumber>({
    x: Math.floor(Math.random() * 30 + 10),
    y: Math.floor(Math.random() * 10),
  });
  const [displayer, setDisplayer] = useState<JSX.Element[]>([]);

  useEffect(answerQuestion, [number]);
  function nextQuestion(points: number): void {
    setqssstate({ Question: qsstate.Question + 1, Answer: qsstate.Answer + points });
    setNumber({ x: Math.floor(Math.random() * 30 + 10), y: Math.floor(Math.random() * 10) });
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
          optionsObject.a = number.x - number.y;
          optionsObject.b = number.x - number.y + Math.floor(Math.random() * 4 + 3); // add 3-6 add no overlap
          optionsObject.c = number.x - number.y + Math.floor(Math.random() * 2 + 1); //1-2 add no overlap
          optionsObject.d = number.x - number.y - Math.floor(Math.random() * 2 + 1); //1-2 sub no overlap
          break;
        case 1:
          optionsObject.b = number.x - number.y;
          optionsObject.d = number.x - number.y - Math.floor(Math.random() * 4 + 3);
          optionsObject.c = number.x - number.y + Math.floor(Math.random() * 2 + 1);
          optionsObject.a = number.x - number.y - Math.floor(Math.random() * 2 + 1);
          break;
        case 2:
          optionsObject.c = number.x - number.y;
          optionsObject.a = number.x - number.y - Math.floor(Math.random() * 4 + 3);
          optionsObject.d = number.x - number.y - Math.floor(Math.random() * 7 + 10);
          optionsObject.b = number.x - number.y - Math.floor(Math.random() * 2 + 1);
          break;
        case 3:
          optionsObject.d = number.x - number.y;
          optionsObject.c = number.x - number.y + Math.floor(Math.random() * 3 + 3); //3 - 5
          optionsObject.a = number.x - number.y + Math.floor(Math.random() * 7 + 6); //6-12
          optionsObject.b = number.x - number.y + Math.floor(Math.random() * 2 + 1); //1 - 2
          break;
      }
      console.log(correctAnswerPosition, optionsObject);
      for (let property in optionsObject) {
        if (optionsObject[property as keyof IOptions] === number.x - number.y) {
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
            What is {number.x} - {number.y}?
          </div>
          <div className={QuestionCSS.wording}>Click on the correct answer :</div>
          <div className={QuestionCSS.buttondiv}>{displayer}</div>
        </div>
      ) : null}

      {qsstate.Question > 10 && (
        <div className={QuestionCSS.wording}>
          You scored {`${qsstate.Answer} out of 10`}
          <div>Do you want to play again?</div>
          <button onClick={() => setStatus(false)}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Subtract;
