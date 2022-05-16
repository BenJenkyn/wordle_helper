import { useState } from 'react';
import { GuessType } from '../../App';
import styles from './letter_input.module.css';

interface LetterInputProps {
	letterNum: number;
	onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	textValue: string;
	radioValue: string;
	letterRef: (el: HTMLInputElement) => void;
}

const LetterInput = ({
	letterNum,
	onTextChange,
	onColorChange,
	textValue,
	letterRef,
}: LetterInputProps) => {
	const [inputBoxColor, setInputBoxColor] = useState<GuessType | null>(null);

	return (
		<div className={styles.letter_area}>
			<input
				className={`${styles.input_box} ${
					styles[`input_box_${inputBoxColor}`]
				}`}
				type="text"
				id={`${letterNum}`}
				name={`word[${letterNum}].letter`}
				aria-label={`wordle-guess-letter-${letterNum + 1}-input`}
				maxLength={1}
				onChange={onTextChange}
				value={textValue}
				ref={letterRef}
				required
			/>
			<div role="group" className={styles.radios}>
				<label className={styles.container}>
					<input
						className={styles.radio_button}
						type="radio"
						aria-label={`wordle-guess-right-spot-${letterNum + 1}-radio`}
						name={`word[${letterNum}].guessType`}
						value={GuessType.green}
						onChange={(e) => {
							setInputBoxColor(e.target.value as GuessType);
							onColorChange(e);
						}}
						onSubmit={() => {
							setInputBoxColor(null);
						}}
					/>
					<span className={`${styles.checkmark} ${styles.checkmark_green}`} />
				</label>
				<label className={styles.container}>
					<input
						className={styles.radio_button}
						type="radio"
						aria-label={`wordle-guess-right-letter-${letterNum + 1}-radio`}
						name={`word[${letterNum}].guessType`}
						value={GuessType.yellow}
						onChange={(e) => {
							setInputBoxColor(e.target.value as GuessType);
							onColorChange(e);
						}}
						onSubmit={() => {
							setInputBoxColor(null);
						}}
					/>
					<span className={`${styles.checkmark} ${styles.checkmark_yellow}`} />
				</label>
				<label className={styles.container}>
					<input
						type="radio"
						aria-label={`wordle-guess-wrong-${letterNum + 1}-radio`}
						name={`word[${letterNum}].guessType`}
						value={GuessType.grey}
						onChange={(e) => {
							setInputBoxColor(e.target.value as GuessType);
							onColorChange(e);
						}}
						onSubmit={() => {
							setInputBoxColor(null);
						}}
					/>
					<span className={`${styles.checkmark} ${styles.checkmark_grey}`}/>
				</label>
			</div>
		</div>
	);
};

export default LetterInput;
