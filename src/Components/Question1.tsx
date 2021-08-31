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

const Question1: React.FC = (): JSX.Element => {
  const [qsstate, setqssstate] = useState<TrackerInt>({ Question: 1, Answer: 0 });
  const [number, setNumber] = useState<Inumber>({
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  });
  const [displayer, setDisplayer] = useState<JSX.Element[]>([]);

  useEffect(answerQuestion, [number]);
  function nextQuestion(points: number): void {
    setqssstate({ Question: qsstate.Question + 1, Answer: qsstate.Answer + points });
    setNumber({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
  }

  function answerQuestion() {
    if (qsstate.Question > 10) {
      setDisplayer([]);
    } else {
      setDisplayer([]);
      const optionsObject: any = { a: 0, b: 1, c: 2, d: 3 };
      const correctAnswerPosition: number = Math.floor(Math.random() * 4);
      switch (correctAnswerPosition) {
        case 0:
          optionsObject.a = number.x + number.y;
          optionsObject.b = number.x + number.y + Math.floor(Math.random() * 4 + 3); // 3-6 add no overlap
          optionsObject.c = number.x + number.y + Math.floor(Math.random() * 2 + 1); //0-2 add no overlap
          optionsObject.d = number.x + number.y - Math.floor(Math.random() * 2 + 1); //1-2 sub no overlap
          break;
        case 1:
          optionsObject.b = number.x + number.y;
          optionsObject.d = number.x + number.y + Math.floor(Math.random() * 4 + 3);
          optionsObject.c = number.x + number.y + Math.floor(Math.random() * 2 + 1);
          optionsObject.a = number.x + number.y - Math.floor(Math.random() * 2 + 1);
          break;
        case 2:
          optionsObject.c = number.x + number.y;
          optionsObject.a = number.x + number.y + Math.floor(Math.random() * 4 + 3);
          optionsObject.d = number.x + number.y - Math.floor(Math.random() * 2 + 1);
          optionsObject.b = number.x + number.y + Math.floor(Math.random() * 2 + 1);
          break;
        case 3:
          optionsObject.d = number.x + number.y;
          optionsObject.c = number.x + number.y + Math.floor(Math.random() * 4 + 3);
          optionsObject.a = number.x + number.y - Math.floor(Math.random() * 2 + 1);
          optionsObject.b = number.x + number.y + Math.floor(Math.random() * 2 + 1);
          break;
      }
      console.log(correctAnswerPosition, optionsObject);
      for (let property in optionsObject) {
        if (optionsObject[property] === number.x + number.y) {
          setDisplayer((previous) => [
            ...previous,
            <button key={optionsObject[property]} onClick={() => nextQuestion(1)}>
              {optionsObject[property]}
            </button>,
          ]);
        } else {
          setDisplayer((previous) => [
            ...previous,
            <button key={optionsObject[property]} onClick={() => nextQuestion(0)}>
              {optionsObject[property]}
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
          <div>Question: {qsstate.Question} of 10</div>
          <div>
            What is {number.x} + {number.y}?
          </div>
          <div>Click on the correct answer :</div>
          <div>{displayer}</div>
        </div>
      ) : null}

      {qsstate.Question > 10 ? <div>You scored {`${qsstate.Answer} out of 10`}</div> : null}
    </div>
  );
};

export default Question1;
