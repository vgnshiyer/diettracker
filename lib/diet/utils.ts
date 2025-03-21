/* eslint-disable @typescript-eslint/no-explicit-any */
import { FoodItem } from "./models";

export const getFoodItemFromResponse = (response: any): FoodItem => {
  const food = response.data["foods"][0];
  const service_weight_grams = food["serving_weight_grams"];
  return {
    name: food["food_name"],
    quantity: service_weight_grams,
    nutrition: {
      calories: food["nf_calories"] / service_weight_grams,
      carbs: food["nf_total_carbohydrate"] / service_weight_grams,
      fats: food["nf_total_fat"] / service_weight_grams,
      protein: food["nf_protein"] / service_weight_grams,
    },
  };
};
