import { describe, expect, test } from '@jest/globals';
import * as index from './index';
import * as solution from './solution';

const { shallowEquality } = process.env.TEST_SOLUTIONS ? solution : index;

describe('shallowEquality function', () => {
   test.each([
      {
         description: 'Both arrays are empty',
         a: [],
         b: [],
         expected: true,
      },
      {
         description: 'First array has one element, second is empty',
         a: ['a'],
         b: [],
         expected: false,
      },
      {
         description: 'First array is empty, second has one element',
         a: [],
         b: ['a'],
         expected: false,
      },
      {
         description: 'Both arrays have the same single element',
         a: ['a'],
         b: ['a'],
         expected: true,
      },
      {
         description:
            'Both arrays have the same two elements in the same order',
         a: ['a', 'c'],
         b: ['a', 'c'],
         expected: true,
      },
      {
         description: 'Arrays have the same elements in a different order',
         a: ['a', 'c'],
         b: ['c', 'a'],
         expected: false,
      },
      {
         description: 'Arrays have different second elements',
         a: ['a', 'c'],
         b: ['a', 'a'],
         expected: false,
      },
      {
         description: 'Both arrays have four identical elements',
         a: ['a', 'c', 'g', 't'],
         b: ['a', 'c', 'g', 't'],
         expected: true,
      },
      {
         description: 'Arrays have different last elements',
         a: ['a', 'c', 'g', 't'],
         b: ['a', 'c', 'g', 'a'],
         expected: false,
      },
   ])('$description', ({ a, b, expected }) => {
      expect(shallowEquality(a, b)).toBe(expected);
   });
});
