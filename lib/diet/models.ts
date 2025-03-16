export interface CommonSearchResult {
  foodName: string;
  thumbnail: string;
  type: 'common';
}

export interface BrandedSearchResult {
  foodName: string;
  brandName: string;
  itemId: string;
  thumbnail: string;
  calories: number;
  type: 'branded';
}

export type SearchResult = CommonSearchResult | BrandedSearchResult;

export interface NutritionData {
  /* nutrients per gram */
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}

export class FoodItemV2 {
  private name: string;
  private quantity: number;
  private nutrition: NutritionData;

  constructor(name: string, nutrition: NutritionData) {
    this.name = name;
    this.quantity = 1;
    this.nutrition = nutrition;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  /* Get macros based on quantity */
  get calories(): number {
    return this.nutrition.calories * this.quantity;
  }

  get carbs(): number {
    return this.nutrition.carbs * this.quantity;
  }

  get fats(): number {
    return this.nutrition.fats * this.quantity;
  }

  get protein(): number {
    return this.nutrition.protein * this.quantity;
  }
}

export interface FoodItem {
  name: string;
  quantity: number;
  nutrition: NutritionData;
  // to be removed later
  calories?: number;
  carbs?: number;
  fats?: number;
  protein?: number;
}

export interface Meal {
  name: string;
  foodItems: FoodItem[];
}
