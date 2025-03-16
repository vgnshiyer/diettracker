/* api */
export interface ApiCredentials {
  appId: string;
  appKey: string;
}

/* dto */
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

/* diet */
export interface Meal {
  name: string;
  foodItems: FoodItem[];
}

export interface FoodItem {
  name: string;
  quantity: number;
  nutrition: NutritionData;
}

export interface NutritionData {
  /* nutrients per gram */
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}
