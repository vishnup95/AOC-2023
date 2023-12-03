// const file = await readFile('./input.txt', 'utf8');
const fileInput = Bun.file('day1/text.txt'); // relative to cwd
const inputs = await fileInput.text();

const digitRegex = new RegExp(/\d/, 'g');
const numbersWithDigits = new RegExp(
	/(?=(one|two|three|four|five|six|seven|eight|nine)|(\d))/,
	'g'
);

const numbersArray: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const partOne = () => {
	let total = 0;
	inputs.split('\n').forEach((input) => {
		const digits = [...input.matchAll(digitRegex)].map(Number);
		if (digits && digits.length) {
			const calibrationValue = digits[0] * 10 + digits?.at(-1)!;
			total += calibrationValue;
		}
	});
	return total;
};

const partTwo = () => {
	let total = 0;
	inputs.split('\n').forEach((input) => {
		const digits = [...input.matchAll(numbersWithDigits)].map(
			(result) => result[1] ?? result[2]
		);

		if (digits) {
			// console.log({ digits });
			const [firstValue, lastValue] = [digits[0], digits[digits.length - 1]];
			let firstNumber, lastNumber;
			if (firstValue.length > 2) {
				firstNumber = numbersArray[firstValue];
			} else {
				firstNumber = Number(firstValue);
			}
			if (lastValue && lastValue!?.length > 2) {
				lastNumber = numbersArray[lastValue];
			} else {
				lastNumber = Number(lastValue);
			}
			const calibrationValue = firstNumber * 10 + lastNumber;
			if (String(calibrationValue).length === 2) {
				console.log({ calibrationValue, digits, input });
			}
			total += calibrationValue;
		} else {
			console.log('?????');
		}
	});
	return total;
};
console.log(partTwo());
// console.log(inputs);
