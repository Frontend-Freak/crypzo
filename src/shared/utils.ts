export function formatNumbers(value: number) {
	if (value >= 1000000000000) {
		return (value / 1000000000000).toFixed(2) + "T";
	} else if (value >= 1000000000) {
		return (value / 1000000000).toFixed(2) + "B";
	} else if (value >= 1000000) {
		return (value / 1000000).toFixed(2) + "M";
	} else if (value >= 1000) {
		return (value / 1000).toFixed(2) + "K";
	} else {
		return value.toFixed(2);
	}
}

export function addSpaces(value: number | string): string {
	const [integerPart, decimalPart] = value.toString().split(".");
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
