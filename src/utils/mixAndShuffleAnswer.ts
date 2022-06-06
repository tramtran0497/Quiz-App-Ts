export const mixAndShuffleAnswer = (array: any[]) => {
    // check!!
    [...array].sort(() => Math.random() - 0.5);
    return array;
};
