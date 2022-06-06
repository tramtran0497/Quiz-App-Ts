import React from 'react';

type Props = {
    question: string,
    answers: string[],
    userAnswer: any,
    questionNr: number,
    totalQuestions: number,
    callback: any,
}

const QuestionCard: React.FunctionComponent<Props> = ({question, answers, userAnswer, questionNr, totalQuestions, callback}) => (
    <div>
        Question Card

    </div>
);

export default QuestionCard;