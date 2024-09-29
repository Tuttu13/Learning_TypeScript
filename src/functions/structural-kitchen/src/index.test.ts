import { describe, expect, it, jest } from '@jest/globals';
import { Cleaner, createKitchen, Supplier } from './index';

describe('createKitchen', () => {
   describe('announce', () => {
      it('announces the starting state', () => {
         const kitchen = createKitchen(
            123,
            jest.fn<Cleaner>(),
            jest.fn<Supplier>()
         );

         const result = kitchen.announce();

         expect(result).toBe(
            `I have 0 much dirt, 123 budget, 0 bread(s), 0 fruit(s), 0 sauce(s), and 0 vegetable(s).`
         );
      });
   });

   describe('clean', () => {
      it('sets dirt to the new amount', () => {
         const cleaner = jest.fn(() => 10);
         const kitchen = createKitchen(0, cleaner, jest.fn<Supplier>());
         const time = 123;

         kitchen.clean(time);

         expect(cleaner).toHaveBeenCalledWith(0, time);
         expect(kitchen.announce()).toMatch(/I have 10 much dirt/);
      });
   });

   describe('purchase', () => {
      it('returns false without changing stock when expense is greater than budget', () => {
         const kitchen = createKitchen(
            1,
            jest.fn<Cleaner>(),
            jest.fn<Supplier>()
         );

         const result = kitchen.purchase(2);

         expect(result).toBe(false);
         expect(kitchen.announce()).toBe(
            'I have 0 much dirt, 1 budget, 0 bread(s), 0 fruit(s), 0 sauce(s), and 0 vegetable(s).'
         );
      });

      it('returns true and changes stock when expense is less than budget', () => {
         const supplier = jest.fn((expense: number) => ({
            breads: expense * 1,
            fruits: expense * 2,
            sauces: expense * 3,
            vegetables: expense * 4,
         }));
         const kitchen = createKitchen(5, jest.fn<Cleaner>(), supplier);

         const result = kitchen.purchase(3);

         expect(result).toBe(true);
         expect(kitchen.announce()).toBe(
            'I have 0 much dirt, 2 budget, 3 bread(s), 6 fruit(s), 9 sauce(s), and 12 vegetable(s).'
         );
      });
   });

   describe('prepare', () => {
      it('汚れが100未満でレシピが成功した場合、在庫が減り、true を返す', () => {
         const kitchen = createKitchen(
            100,
            jest.fn<Cleaner>(),
            jest.fn<Supplier>()
         );

         const recipe = jest.fn(() => ({
            succeeded: true,
            newStock: {
               breads: 11,
               fruits: 12,
               sauces: 13,
               vegetables: 14,
            },
         }));

         const result = kitchen.prepare(recipe);

         expect(result).toBe(true);
         expect(recipe).toHaveBeenCalled();
         expect(kitchen.announce()).toContain('11 bread(s)');
      });

      it('汚れが100未満でレシピが失敗した場合、在庫を変更せず false を返す', () => {
         const kitchen = createKitchen(
            100,
            jest.fn<Cleaner>(),
            jest.fn<Supplier>()
         );

         const recipe = jest.fn(() => ({
            succeeded: false,
            newStock: {
               breads: 10,
               fruits: 10,
               sauces: 10,
               vegetables: 10,
            },
         }));

         const result = kitchen.prepare(recipe);

         expect(result).toBe(false);
         expect(recipe).toHaveBeenCalled();
         expect(kitchen.announce()).toContain('0 bread(s)');
      });
   });
});
