import { describe, expect, test } from '@jest/globals';
import { expectTypeOf } from 'expect-type'; // `expect-type`を使用
import * as index from './index';
import * as solution from './solution';

const { createAdvancedCipher } = process.env.TEST_SOLUTIONS ? solution : index;

describe('createAdvancedCipher', () => {
   describe('types', () => {
      test('function type', () => {
         expectTypeOf(createAdvancedCipher).toEqualTypeOf<
            (
               onVowel: (text: string) => string,
               onConsonant: (text: string) => string,
               onPunctuation: (text: string) => string
            ) => (text: string) => string
         >();
      });

      test('return type', () => {
         expectTypeOf(
            createAdvancedCipher(
               (text: string) => text,
               (text: string) => text,
               (text: string) => text
            )
         ).toEqualTypeOf<(text: string) => string>();
      });
   });

   const testCases = [
      {
         description:
            'All functions return empty string, input is empty string',
         onVowel: () => '',
         onConsonant: () => '',
         onPunctuation: () => '',
         input: '',
         expected: '',
      },
      {
         description: 'All functions return empty string, input is "abc"',
         onVowel: () => '',
         onConsonant: () => '',
         onPunctuation: () => '',
         input: 'abc',
         expected: '',
      },
      {
         description:
            'All functions return input text, input is full alphabet with punctuation',
         onVowel: (text: string) => text,
         onConsonant: (text: string) => text,
         onPunctuation: (text: string) => text,
         input: 'abcdefghijklmnopqrstuvwxyz.! ',
         expected: 'abcdefghijklmnopqrstuvwxyz.! ',
      },
      {
         description:
            'Functions modify vowels, consonants, and punctuation differently, input is "aeiou"',
         onVowel: (text: string) => `0${text}1`,
         onConsonant: (text: string) => `2${text}3`,
         onPunctuation: (text: string) => `4${text}5`,
         input: 'aeiou',
         expected: '0a10e10i10o10u1',
      },
      {
         description:
            'Functions modify vowels, consonants, and punctuation differently, input is "bcdfg"',
         onVowel: (text: string) => `0${text}1`,
         onConsonant: (text: string) => `2${text}3`,
         onPunctuation: (text: string) => `4${text}5`,
         input: 'bcdfg',
         expected: '2b32c32d32f32g3',
      },
      {
         description:
            'Functions modify vowels, consonants, and punctuation differently, input is "!@ \\t\\n"',
         onVowel: (text: string) => `0${text}1`,
         onConsonant: (text: string) => `2${text}3`,
         onPunctuation: (text: string) => `4${text}5`,
         input: '!@ \t\n',
         expected: '4!54@54 54\t54\n5',
      },
      {
         description:
            'Complex transformation with full alphabet and punctuation',
         onVowel: (text: string) => `0${text}1`,
         onConsonant: (text: string) => `2${text}3`,
         onPunctuation: (text: string) => `4${text}5`,
         input: 'abcdefghijklmnopqrstuvwxyz.! ',
         expected:
            '0a12b32c32d30e12f32g32h30i12j32k32l32m32n30o12p32q32r32s32t30u12v32w32x32y32z34.54!54 5',
      },
   ];

   test.each(testCases)(
      '$description',
      ({ onVowel, onConsonant, onPunctuation, input, expected }) => {
         const encoder = createAdvancedCipher(
            onVowel,
            onConsonant,
            onPunctuation
         );
         expect(encoder(input)).toEqual(expected);

         // 複数回実行して安定性を確認
         expect(encoder(input)).toEqual(expected);
         expect(
            createAdvancedCipher(onVowel, onConsonant, onPunctuation)(input)
         ).toEqual(expected);
      }
   );
});
