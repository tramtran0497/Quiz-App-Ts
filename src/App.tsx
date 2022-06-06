import React, {useState } from 'react';
import { Difficulty, fetchDataQuiz, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const startGame = async() => {
    setLoading(true);
    setGameOver(false);
    // fetching data
    const listQuestions = await fetchDataQuiz(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(listQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
    if(!gameOver) {
      const answerOfUser = e.currentTarget.value;
      const isCorrect = answerOfUser === questions[number].correct_answer;
      if(isCorrect){
        // prevent to repeat correct answer by disable feature
        setScore(pre => pre + 1);
      };
      const answerObj = {
        question: questions[number].question,
        answer: answerOfUser,
        correct: isCorrect,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((pre) => [...pre, answerObj]);
    };
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    if(nextQ === TOTAL_QUESTIONS) setGameOver(true);
    else{
      setNumber(nextQ);
    };
  };

  const preQuestion = () => {
    if(number < 0) setNumber(0);
    else{
      const preQ = number - 1;
      setNumber(preQ);
    };
  };

  return (
    <div className="App">
      <h1>QUIZ GAME</h1>
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading ? <p>LOADING...</p> : null}
      {gameOver ? <button onClick={startGame}>Start</button> : null}
      {!loading && !gameOver && (
        <>
          <QuestionCard
                question = {questions[number].question}
                answers = {questions[number].answers}
                userAnswer = {userAnswers ? userAnswers[number] : undefined}
                questionNr = {number + 1}
                totalQuestions = {TOTAL_QUESTIONS}
                callback = {checkAnswer}
          />
          <button disabled={number === 0? true : false} onClick={preQuestion}>Preview</button>
          <button disabled={number === TOTAL_QUESTIONS? true : false} onClick={nextQuestion}>{number === (TOTAL_QUESTIONS - 1) ? "Finish": "Next"}</button>
          {userAnswers.length === TOTAL_QUESTIONS ? (
            <div>
              <h2>END GAME</h2>
              <h3>YOUR SCORE: {score}/ {TOTAL_QUESTIONS}</h3>
              <p>Do you want to replay quiz game?</p>
              <button onClick={startGame}>Restart</button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
