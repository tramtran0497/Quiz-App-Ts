import React, { useEffect, useState } from 'react';
import { Difficulty, fetchDataQuiz } from './API';
import QuestionCard from './components/QuestionCard';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionNr, setQuestionNr] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const TOTAL_QUESTIONS = 10;

  const startGame = async() => {
    setLoading(true);
    setGameOver(false);
    // fetching data
    const listQuestions = await fetchDataQuiz(TOTAL_QUESTIONS, Difficulty.EASY);
    // setQuestions();
    console.log("List questions", listQuestions)
    setLoading(false);
  }

  return (
    <div className="App">
      Quiz
      {loading ? <p>LOADING...</p> : null}
      <button onClick={startGame}>Start</button>
      {/* <QuestionCard/> */}
    </div>
  );
}

export default App;
