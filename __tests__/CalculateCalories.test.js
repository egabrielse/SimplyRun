import calculateCalories from "../src/calories/CalculateCalories.js"

import React from 'react';
import renderer from 'react-test-renderer';

describe("CalculateCalories", () => {
    test("Testing returns correct number of calories", () => {
        expect(calculateCalories(1, 1, 1)).toBe(1 / 60)
        expect(calculateCalories(1, 3, 1)).toBe(2 / 60)
        expect(calculateCalories(1, 3.5, 1)).toBe(2.75 / 60)
        expect(calculateCalories(1, 4.5, 1)).toBe(3 / 60)
        expect(calculateCalories(1, 5, 1)).toBe(4 / 60)
        expect(calculateCalories(1, 6, 1)).toBe(5/ 60)
        expect(calculateCalories(1, 7, 1)).toBe(6.5 / 60)
        expect(calculateCalories(1, 8.2, 1)).toBe(8.3 / 60)
        expect(calculateCalories(1, 8.5, 1)).toBe(9 / 60)
        expect(calculateCalories(1, 9.8, 1)).toBe(9.8 / 60)
        expect(calculateCalories(1, 10.8, 1)).toBe(10.5 / 60)
        expect(calculateCalories(1, 11.5, 1)).toBe(11 / 60)
        expect(calculateCalories(1, 12.5, 1)).toBe(11.5 / 60)
        expect(calculateCalories(1, 13.5, 1)).toBe(11.8 / 60)
        expect(calculateCalories(1, 14, 1)).toBe(12.3 / 60)
        expect(calculateCalories(1, 16, 1)).toBe(12.8 / 60)
        expect(calculateCalories(1, 16.5, 1)).toBe(14.5 / 60)
        expect(calculateCalories(1, 18, 1)).toBe(16 / 60)
        expect(calculateCalories(1, 20, 1)).toBe(19 / 60)
        expect(calculateCalories(1, 21, 1)).toBe(19.8 / 60)
        expect(calculateCalories(1, 24, 1)).toBe(23 / 60)

    });
});// JavaScript source code
