export const getWordList = async () => {
    const response = await fetch('wordle-answers-alphabetical.txt')
    const wordleText = await response.text();
    const wordList = wordleText.split('\n');
    return wordList;
} 