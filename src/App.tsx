import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';

import styles from './app.module.css';
import { getWordList } from './lib/getWordList';
import LetterInput from './components/LetterInput';

export enum GuessType {
	grey = 'grey',
	yellow = 'yellow',
	green = 'green',
}

const initialValues = {
	word: [
		{
			letter: '',
			guessType: GuessType.grey,
		},
		{
			letter: '',
			guessType: GuessType.grey,
		},
		{
			letter: '',
			guessType: GuessType.grey,
		},
		{
			letter: '',
			guessType: GuessType.grey,
		},
		{
			letter: '',
			guessType: GuessType.grey,
		},
	],
};

function App() {
	const [wordList, setWordList] = useState<string[]>([]);
	const input_letters = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		getWordList().then((res) => {
			// res.forEach((currentRes) => (currentRes = currentRes.toUpperCase()));
			setWordList(res);
		});
	}, []);

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			let tempWordList = wordList;
			values.word.forEach((letter, idx) => {
				switch (letter.guessType) {
					case GuessType.grey: {
						tempWordList = tempWordList.filter((word) => {
							if (word.includes(letter.letter)) {
								console.log(letter.letter);
								return false;
							}
							return true;
						});
						setWordList(tempWordList);
						break;
					}
					case GuessType.green: {
						tempWordList = tempWordList.filter((word) => {
							if (letter.letter === word[idx]) {
								return true;
							}
							return false;
						});
						break;
					}
					case GuessType.yellow: {
						tempWordList = tempWordList.filter((word) => {
							if (word.includes(letter.letter) && letter.letter !== word[idx]) {
								return true;
							}
							return false;
						});
					}
				}
				// Resets the form
				letter.letter = '';
				letter.guessType = GuessType.grey;
			});
			setWordList(tempWordList);
		},
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { maxLength, value, id } = e.target;
		if (value.length >= maxLength) {
			input_letters.current[
				Number(id) + (Number(id) + 1 < initialValues.word.length ? 1 : 0)
			].focus();
		}
		if (value.length <= 0) {
			input_letters.current[
				Number(id) - (Number(id) - 1 < 0 ? 0 : 1)
			].focus();
		}
		formik.handleChange(e);
	};

	const jsxWords = wordList.map((word) => {
		return <p>{word}</p>;
	});

	/* Return a LetterInput for every letter in the word */
	const LetterInputs = initialValues.word.map((letter, index) => {
		return (
			<LetterInput
				letterNum={index}
				onTextChange={onChange}
				onColorChange={formik.handleChange}
				textValue={formik.values.word[index].letter.toUpperCase()}
				radioValue={formik.values.word[index].guessType}
				letterRef={(el: HTMLInputElement) => {
					if (input_letters.current) {
						input_letters.current[index] = el;
					}
				}}
			/>
		);
	});

	return (
		<div className="App">
			<h1>Input wordle guess: </h1>
			<form onSubmit={formik.handleSubmit} className={styles.inputs}>
				{LetterInputs}
				<button type="submit">Submit Letters</button>
			</form>
			<section aria-label='remaining-words'>
				{jsxWords}
			</section>
		</div>
	);
}

export default App;
