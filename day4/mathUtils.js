// mathUtils.js - Mathematical utility functions module

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
export function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return a + b;
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number  
 * @returns {number} Product of a and b
 */
export function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return a * b;
}

/**
 * Subtracts second number from first number
 * @param {number} a - First number (minuend)
 * @param {number} b - Second number (subtrahend)
 * @returns {number} Difference of a and b
 */
export function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return a - b;
}

/**
 * Divides first number by second number
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Quotient of a and b
 * @throws {Error} If divisor is zero
 */
export function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

/**
 * Calculates the power of a number
 * @param {number} base - Base number
 * @param {number} exponent - Exponent
 * @returns {number} Base raised to the power of exponent
 */
export function power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return Math.pow(base, exponent);
}

/**
 * Calculates the square root of a number
 * @param {number} x - Number to find square root of
 * @returns {number} Square root of x
 * @throws {Error} If x is negative
 */
export function sqrt(x) {
    if (typeof x !== 'number') {
        throw new Error('Parameter must be a number');
    }
    if (x < 0) {
        throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(x);
}

/**
 * Finds the maximum value in an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Maximum value
 */
export function max(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Parameter must be a non-empty array');
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error('All array elements must be numbers');
    }
    return Math.max(...numbers);
}

/**
 * Finds the minimum value in an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Minimum value
 */
export function min(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Parameter must be a non-empty array');
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error('All array elements must be numbers');
    }
    return Math.min(...numbers);
}

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Average value
 */
export function average(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Parameter must be a non-empty array');
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error('All array elements must be numbers');
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

/**
 * Rounds a number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {number} Rounded number
 */
export function round(num, decimals = 0) {
    if (typeof num !== 'number' || typeof decimals !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    if (decimals < 0) {
        throw new Error('Decimal places cannot be negative');
    }
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}

/**
 * Generates a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
export function randomBetween(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    if (min > max) {
        throw new Error('Minimum value cannot be greater than maximum value');
    }
    return Math.random() * (max - min) + min;
}

/**
 * Checks if a number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if even, false if odd
 */
export function isEven(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error('Parameter must be an integer');
    }
    return num % 2 === 0;
}

/**
 * Checks if a number is odd
 * @param {number} num - Number to check
 * @returns {boolean} True if odd, false if even
 */
export function isOdd(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error('Parameter must be an integer');
    }
    return num % 2 !== 0;
}

/**
 * Calculates factorial of a number
 * @param {number} n - Number to calculate factorial for
 * @returns {number} Factorial of n
 */
export function factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error('Parameter must be a non-negative integer');
    }
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Default export: Greeting function for demonstration
 * @param {string} name - Name to greet
 * @returns {string} Personalized greeting message
 */
export default function greetUser(name = 'User') {
    const timeOfDay = new Date().getHours();
    let greeting;
    
    if (timeOfDay < 12) {
        greeting = 'Good morning';
    } else if (timeOfDay < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    const emojis = ['👋', '🌟', '✨', '🚀', '💫'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    return `${greeting}, ${name}! ${randomEmoji} Welcome to our advanced math utilities module. Ready to calculate some amazing results?`;
}

// Named export for the greeting function as well
export { greetUser };

// Constants that might be useful
export const PI = Math.PI;
export const E = Math.E;
export const GOLDEN_RATIO = 1.618033988749895;

// Mathematical constants object
export const MATH_CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    GOLDEN_RATIO: 1.618033988749895,
    SQRT2: Math.SQRT2,
    SQRT1_2: Math.SQRT1_2,
    LN2: Math.LN2,
    LN10: Math.LN10,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E
};

// Utility object with commonly used functions
export const MathUtils = {
    add,
    multiply,
    subtract,
    divide,
    power,
    sqrt,
    max,
    min,
    average,
    round,
    randomBetween,
    isEven,
    isOdd,
    factorial,
    constants: MATH_CONSTANTS
};