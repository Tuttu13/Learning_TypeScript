import { describe, expect, test } from '@jest/globals';
import { shallowDifferences } from './index';

describe('shallowDifferences function', () => {
   test.each([
      {
         description: 'Both arrays are identical',
         a: ['a', 'b', 'c'],
         b: ['a', 'b', 'c'],
         expected: ['a', 'b', 'c'],
      },
      {
         description: 'Different elements at the same position',
         a: ['a', 'b', 'c'],
         b: ['a', 'x', 'c'],
         expected: ['a', undefined, 'c'],
      },
      {
         description: 'Completely different arrays',
         a: ['a', 'b', 'c'],
         b: ['x', 'y', 'z'],
         expected: [undefined, undefined, undefined],
      },
      {
         description: 'Arrays of different lengths',
         a: ['a', 'b', 'c'],
         b: ['a', 'b'],
         expected: undefined,
      },
      {
         description: 'Empty arrays',
         a: [],
         b: [],
         expected: [],
      },
      {
         description: 'First array is empty, second is not',
         a: [],
         b: ['a'],
         expected: undefined,
      },
      {
         description: 'Second array is empty, first is not',
         a: ['a'],
         b: [],
         expected: undefined,
      },
      {
         description: 'Only one element differs',
         a: ['a', 'b', 'c'],
         b: ['a', 'b', 'x'],
         expected: ['a', 'b', undefined],
      },
   ])('$description', ({ a, b, expected }) => {
      const result = shallowDifferences(a, b);
      expect(result).toEqual(expected);
   });
});
