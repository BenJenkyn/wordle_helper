// import { Field } from 'formik';
import { GuessType } from '../App';

interface LetterInputProps {
	letterNum: number;
	onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
	return (
		<>
			<input
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
			<div role="group">
				<label>Grey: </label>
				<input
					type="radio"
					aria-label={`wordle-guess-wrong-${letterNum + 1}-radio`}
					name={`word[${letterNum}].guessType`}
					value={GuessType.grey}
					onChange={onColorChange}
				/>
				<label>Yellow: </label>
				<input
					type="radio"
					aria-label={`wordle-guess-right-letter-${letterNum + 1}-radio`}
					name={`word[${letterNum}].guessType`}
					value={GuessType.yellow}
					onChange={onColorChange}
				/>
				<label>Green: </label>
				<input
					type="radio"
					aria-label={`wordle-guess-right-spot-${letterNum + 1}-radio`}
					name={`word[${letterNum}].guessType`}
					value={GuessType.green}
					onChange={onColorChange}
				/>
			</div>
		</>
	);
};

export default LetterInput;
