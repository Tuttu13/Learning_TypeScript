// Stock type representing the ingredients in the kitchen
export type Stock = {
   breads: number;
   fruits: number;
   sauces: number;
   vegetables: number;
};

// Cleaner function type
export type Cleaner = (dirt: number, time?: number) => number;

// Supplier function type
export type Supplier = (expense: number) => Partial<Stock>;

// Recipe result types
type RecipeFailure = { succeeded: false };
type RecipeSuccess = { succeeded: true; newStock: Stock };
type RecipeResult = RecipeFailure | RecipeSuccess;

// Recipe function type
export type Recipe = (ingredients: Stock) => RecipeResult;

// Kitchen interface
export type Kitchen = {
   announce: () => string;
   clean: (time?: number) => void;
   purchase: (expense: number) => boolean;
   prepare: (recipe: Recipe) => boolean;
};

// Implement the createKitchen function
export function createKitchen(
   budget: number,
   cleaner: Cleaner,
   supplier: Supplier
): Kitchen {
   let dirt = 0;
   let stock: Stock = {
      breads: 0,
      fruits: 0,
      sauces: 0,
      vegetables: 0,
   };
   let currentBudget = budget;

   const announce = (): string => {
      return `I have ${dirt} much dirt, ${currentBudget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`;
   };

   const clean = (time?: number): void => {
      dirt = cleaner(dirt, time);
   };

   const purchase = (expense: number): boolean => {
      if (currentBudget >= expense) {
         const supply = supplier(expense);
         for (const key in supply) {
            if (Object.prototype.hasOwnProperty.call(supply, key)) {
               const ingredient = key as keyof Stock;
               stock[ingredient] += supply[ingredient]!;
            }
         }
         currentBudget -= expense;
         return true;
      } else {
         return false;
      }
   };

   const prepare = (recipe: Recipe): boolean => {
      if (dirt >= 100) {
         return false;
      }
      const result = recipe(stock);
      dirt += 1;
      if (result.succeeded) {
         stock = result.newStock;
         return true;
      } else {
         return false;
      }
   };

   return {
      announce,
      clean,
      purchase,
      prepare,
   };
}
