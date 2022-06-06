import React from 'react';
import { AnswerObject } from '../App';

type Props = {
    question: string,
    answers: string[],
    userAnswer: AnswerObject | undefined,
    questionNr: number,
    totalQuestions: number,
    callback: (e:React.MouseEvent<HTMLInputElement>) => void,
}

const QuestionCard: React.FunctionComponent<Props> = ({question, answers, userAnswer, questionNr, totalQuestions, callback}) => (
    <div>
        <h2>Question {questionNr}/{totalQuestions}</h2>
        <h3>{question}</h3>
        {
            answers.map((answer: string, index: number) => (
                <div key={index}>
                    {/* How to refresh selected choice for next question? */}
                    <input type="radio" id="html" name="answer" value={answer} onClick={callback} disabled={!!userAnswer}/>
                    <label htmlFor="answer">{answer}</label>
                </div>
            ))
        }
    </div>
);

export default QuestionCard;