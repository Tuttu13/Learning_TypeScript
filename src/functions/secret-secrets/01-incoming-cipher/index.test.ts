import { describe, expect, test } from '@jest/globals';
import { expectTypeOf } from 'expect-type';
import * as index from './index';
import * as solution from './solution';

const { createCipher } = process.env.TEST_SOLUTIONS ? solution : index;

describe('createCipher', () => {
   describe('types', () => {
      test('function type', () => {
         expectTypeOf(createCipher).toEqualTypeOf<
            (cipher: (text: string) => string) => (text: string) => string
         >();
      });

      test('return type', () => {
         expectTypeOf(createCipher((text: string) => text)).toEqualTypeOf<
            (text: string) => string
         >();
      });
   });

   const testCases = [
      {
         description:
            'Test case 1: cipher returns empty string, input is empty string',
         cipher: () => '',
         input: '',
         expected: '',
      },
      {
         description: 'Test case 2: cipher returns empty string, input is abc',
         cipher: () => '',
         input: 'abc',
         expected: '',
      },
      {
         description: 'Test case 3: cipher returns input text, input is abc',
         cipher: (text: string) => text,
         input: 'abc',
         expected: 'abc',
      },
      {
         description:
            'Test case 4: cipher wraps text with exclamation marks, input is abc',
         cipher: (text: string) => `!${text}!`,
         input: 'abc',
         expected: '!a!!b!!c!',
      },
   ];

   test.each(testCases)(
      '$description',
      function testCreateCipher({ cipher, input, expected }) {
         const encoder = createCipher(cipher);
         expect(encoder(input)).toEqual(expected);

         // 複数回実行して安定性を確認
         expect(encoder(input)).toEqual(expected);
         expect(createCipher(cipher)(input)).toEqual(expected);
      }
   );
});
