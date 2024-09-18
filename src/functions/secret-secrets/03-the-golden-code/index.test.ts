import { describe, expect, test } from '@jest/globals';
import { expectTypeOf } from 'expect-type';
import * as index from './index';
import * as solution from './solution';

const { createCodeCracker } = process.env.TEST_SOLUTIONS ? solution : index;

describe('createCodeCracker', () => {
   describe('types', () => {
      test('function type', () => {
         expectTypeOf(createCodeCracker).toEqualTypeOf<
            (options: {
               attempts: number;
               makeGuess: (text: string, attempt: number) => string;
               validateGuess: (guess: string) => boolean;
            }) => (text: string) => string | undefined
         >();
      });

      test('return type', () => {
         expectTypeOf(
            createCodeCracker({
               attempts: 1,
               makeGuess: () => '',
               validateGuess: () => false,
            })
         ).toEqualTypeOf<(text: string) => string | undefined>();
      });
   });

   const testCases = [
      {
         description: 'Zero attempts should return undefined',
         options: {
            attempts: 0,
            makeGuess: () => '',
            validateGuess: () => false,
         },
         text: '',
         expected: undefined,
      },
      {
         description: 'One attempt with invalid guess should return undefined',
         options: {
            attempts: 1,
            makeGuess: () => '',
            validateGuess: () => false,
         },
         text: '',
         expected: undefined,
      },
      {
         description: 'One attempt with valid guess should return guess',
         options: {
            attempts: 1,
            makeGuess: () => '',
            validateGuess: () => true,
         },
         text: '',
         expected: '',
      },
      {
         description:
            'Make guess returns input text, validateGuess returns true',
         options: {
            attempts: 1,
            makeGuess: (text: string) => text,
            validateGuess: () => true,
         },
         text: 'abc',
         expected: 'abc',
      },
      {
         description: 'Attempts until correct guess is found',
         options: {
            attempts: 2,
            makeGuess: (text: string, attempt: number) => `${text}${attempt}`,
            validateGuess: (guess: string) => guess === 'abc1',
         },
         text: 'abc',
         expected: 'abc1',
      },
      {
         description: 'Correct guess not found within attempts',
         options: {
            attempts: 2,
            makeGuess: (text: string, attempt: number) => `${text}${attempt}`,
            validateGuess: (guess: string) => guess === 'abc2',
         },
         text: 'abc',
         expected: undefined,
      },
   ];

   test.each(testCases)('$description', ({ options, text, expected }) => {
      const codeCracker = createCodeCracker(options);
      expect(codeCracker(text)).toEqual(expected);

      // 複数回実行して安定性を確認
      expect(codeCracker(text)).toEqual(expected);
      expect(createCodeCracker(options)(text)).toEqual(expected);
   });
});
