import { mixAndShuffleAnswer } from "./utils/mixAndShuffleAnswer";

export type Question = {
    category: string,
    type: string,
    difficulty: string,
    correct_answer: string,
    incorrect_answers: string[]
};

export type QuestionState =  Question & {
    answers: string[],
};

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
};

export const fetchDataQuiz = async(amount: number, difficulty: Difficulty) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(url)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: mixAndShuffleAnswer([...question.incorrect_answers, question.correct_answer])
    }));
};