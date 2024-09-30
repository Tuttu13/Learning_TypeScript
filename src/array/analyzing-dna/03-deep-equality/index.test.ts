import { describe, expect, test } from '@jest/globals';
import * as index from './index';
import * as solution from './solution';

const { deepEquality } = process.env.TEST_SOLUTIONS ? solution : index;

describe('deepEquality function', () => {
   const testCases = [
      {
         description: 'Both arrays are empty',
         a: [],
         b: [],
         expected: true,
      },
      {
         description: 'First array is [["a"]], second array is [[]]',
         a: [['a']],
         b: [[]],
         expected: false,
      },
      {
         description: 'First array is [[]], second array is [["a"]]',
         a: [[]],
         b: [['a']],
         expected: false,
      },
      {
         description: 'Both arrays are [["a"]]',
         a: [['a']],
         b: [['a']],
         expected: true,
      },
      {
         description: 'First array is [["a"]], second array is [["c"]]',
         a: [['a']],
         b: [['c']],
         expected: false,
      },
      {
         description: 'Both arrays are [["a", "c"]]',
         a: [['a', 'c']],
         b: [['a', 'c']],
         expected: true,
      },
      {
         description:
            'First array is [["a"], ["c"]], second array is [["a"], ["g"]]',
         a: [['a'], ['c']],
         b: [['a'], ['g']],
         expected: false,
      },
      {
         description: 'Both arrays are [["a", "c"]]',
         a: [['a', 'c']],
         b: [['a', 'c']],
         expected: true,
      },
      {
         description:
            'First array is [["a"], ["c"]], second array is [["g"], ["c"]]',
         a: [['a'], ['c']],
         b: [['g'], ['c']],
         expected: false,
      },
      {
         description: 'Both arrays are [["a", "c"], ["g", "t"]]',
         a: [
            ['a', 'c'],
            ['g', 't'],
         ],
         b: [
            ['a', 'c'],
            ['g', 't'],
         ],
         expected: true,
      },
      {
         description:
            'First array is [["c", "c"], ["g", "t"]], second array is [["a", "c"], ["g", "t"]]',
         a: [
            ['c', 'c'],
            ['g', 't'],
         ],
         b: [
            ['a', 'c'],
            ['g', 't'],
         ],
         expected: false,
      },
      {
         description:
            'First array is [["a", "c"], ["g", "t"]], second array is [["c", "c"], ["g", "t"]]',
         a: [
            ['a', 'c'],
            ['g', 't'],
         ],
         b: [
            ['c', 'c'],
            ['g', 't'],
         ],
         expected: false,
      },
   ];

   test.each(testCases)('$description', ({ a, b, expected }) => {
      expect(deepEquality(a, b)).toEqual(expected);
   });
});
