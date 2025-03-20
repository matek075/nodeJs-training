const calculator = require('../calculator');

describe('Calculator', () => {
    describe('add function', () => {
        test('adds two positive numbers', () => {
            expect(calculator.add(2, 3)).toBe(5);
        });

        test('adds positive and negative numbers', () => {
            expect(calculator.add(-1, 1)).toBe(0);
        });

        test('adds two zeros', () => {
            expect(calculator.add(0, 0)).toBe(0);
        });
    });

    describe('subtract function', () => {
        test('subtracts two numbers', () => {
            expect(calculator.subtract(5, 2)).toBe(3);
        });

        test('subtracts to get negative result', () => {
            expect(calculator.subtract(1, 5)).toBe(-4);
        });

        test('subtracts two zeros', () => {
            expect(calculator.subtract(0, 0)).toBe(0);
        });
    });

    describe('multiply function', () => {
        test('multiplies two positive numbers', () => {
            expect(calculator.multiply(3, 4)).toBe(12);
        });

        test('multiplies with a negative number', () => {
            expect(calculator.multiply(-2, 3)).toBe(-6);
        });

        test('multiplies with zero', () => {
            expect(calculator.multiply(0, 5)).toBe(0);
        });
    });

    describe('divide function', () => {
        test('divides two numbers', () => {
            expect(calculator.divide(10, 2)).toBe(5);
        });

        test('divides with decimal result', () => {
            expect(calculator.divide(7, 2)).toBe(3.5);
        });

        test('divides zero by a number', () => {
            expect(calculator.divide(0, 5)).toBe(0);
        });

        test('throws error when dividing by zero', () => {
            expect(() => {
                calculator.divide(5, 0);
            }).toThrow('Division by zero is not allowed');
        });
    });
});
