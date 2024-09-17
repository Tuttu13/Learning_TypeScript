export type Cipher = (character: string) => string;

export function createAdvancedCipher(
   onVowel: Cipher,
   onConsonant: Cipher,
   onPunctuation: Cipher
): (text: string) => string {
   return (text: string): string => {
      let result = '';
      for (const char of text) {
         if (/[aeiou]/i.test(char)) {
            result += onVowel(char);
         } else if (/[bcdfghjklmnpqrstvwxyz]/i.test(char)) {
            result += onConsonant(char);
         } else {
            result += onPunctuation(char);
         }
      }
      return result;
   };
}
