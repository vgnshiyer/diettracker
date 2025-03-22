export const roundValue = (value: number) => {
  return Number.isInteger(value) ? value : Number(value.toFixed(2));
};