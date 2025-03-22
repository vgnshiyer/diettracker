export const roundNutrient = (base: number, quantity: number) => {
  return Number((base * quantity).toFixed(2));
};