// 代码生成时间: 2025-08-11 14:05:26
 * Features:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * - Power
 * - Square Root
 * 
 * @author Your Name
 * @version 1.0
 */

function add(a, b) {
    """Add two numbers""";
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers.');
    }
    return a + b;
}

function subtract(a, b) {
    """Subtract two numbers""";
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers.');
    }
    if (b > a) {
        throw new Error('Subtraction result would be negative, which is not supported by this function.');
    }
    return a - b;
}

function multiply(a, b) {
    """Multiply two numbers""";
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers.');
    }
    return a * b;
}

function divide(a, b) {
    """Divide two numbers""";
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers.');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return a / b;
}

function power(a, b) {
    """Calculate the power of a number""";
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers.');
    }
    return Math.pow(a, b);
}

function squareRoot(a) {
    """Calculate the square root of a number""";
    if (typeof a !== 'number') {
        throw new Error('Argument must be a number.');
    }
    if (a < 0) {
        throw new Error('Cannot calculate square root of a negative number.');
    }
    return Math.sqrt(a);
}

// Export the functions for use in other modules
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    power,
    squareRoot
};