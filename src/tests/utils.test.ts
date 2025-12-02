import { formatNumbers, addSpaces } from "../shared/utils";

test("convertTrillion", () => {

	expect(formatNumbers(1_000_000_000_000)).toBe("1.00T");
});

test("convertBillion", () => {
	expect(formatNumbers(1_000_000_000)).toBe("1.00B");
});


test('addSpaces', () =>{
	expect(addSpaces(122312313131231)).toBe('122 312 313 131 231')
})


