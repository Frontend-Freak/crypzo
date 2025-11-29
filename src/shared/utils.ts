export function formatNumbers(value: number | null | undefined): string {
	if (value == null) return "0";

	if (value >= 1_000_000_000_000) {
		return (value / 1_000_000_000_000).toFixed(2) + "T";
	} else if (value >= 1_000_000_000) {
		return (value / 1_000_000_000).toFixed(2) + "B";
	} else if (value >= 1_000_000) {
		return (value / 1_000_000).toFixed(2) + "M";
	} else if (value >= 1_000) {
		return (value / 1_000).toFixed(2) + "K";
	} else {
		return value.toFixed(2);
	}
}

export function addSpaces(value: number | string | null | undefined): string {
	if (value == null) return "0";

	const [integerPart, decimalPart] = value.toString().split(".");
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
