import axios from 'axios';
import { FoodItem, SearchResult } from './models';

const BASE_URL = 'https://trackapi.nutritionix.com/v2';

const SEARCH_RESULTS_URL = `${BASE_URL}/search/instant/`;
const SEARCH_BRANDED_URL = `${BASE_URL}/search/item/`;
const SEARCH_COMMON_URL = `${BASE_URL}/natural/nutrients/`;

export const getStoredCredentials = () => {
  const credentials = localStorage.getItem('nutritionix_credentials');
  return credentials ? JSON.parse(credentials) : null;
};

export const fetchSearchResults = async (query: string): Promise<SearchResult[] | null> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error('API credentials not found');
  }

  try {
    const response = await axios.get(SEARCH_RESULTS_URL, {
      params: {
        'query': query,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': credentials.appId,
        'x-app-key': credentials.appKey,
      },
    });
    const results: SearchResult[] = [
      ...response.data.branded.map((result: { food_name: string; brand_name: string; nix_item_id: string; photo: { thumb: string; }; nf_calories: number; }) => ({
        foodName: result.food_name,
        brandName: result.brand_name,
        itemId: result.nix_item_id,
        thumbnail: result.photo.thumb,
        calories: result.nf_calories
      })),
      ...response.data.common.map((result: { food_name: string; photo: { thumb: string; }; }) => ({
        foodName: result.food_name,
        thumbnail: result.photo.thumb,
      })),
    ];
    return results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return null;
  }
};

export const fetchNutritionData = async (query_or_item_id: string, type: 'common' | 'branded'): Promise<FoodItem | null> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error('API credentials not found');
  }

  if (type === 'branded') {
    const response = await axios.get(SEARCH_BRANDED_URL, {
      params: {
        'nix_item_id': query_or_item_id,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': credentials.appId,
        'x-app-key': credentials.appKey,
      },
    });
    const food = response.data['foods'][0];
    const service_weight_grams = food['serving_weight_grams'];
    return {
      name: food['food_name'],
      quantity: service_weight_grams,
      nutrition: {
        calories: food['nf_calories'] / service_weight_grams,
        carbs: food['nf_total_carbohydrate'] / service_weight_grams,
        fats: food['nf_total_fat'] / service_weight_grams,
        protein: food['nf_protein'] / service_weight_grams
      }
    };
  } else {
    const response = await axios.post(SEARCH_COMMON_URL, {
      query: query_or_item_id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': credentials.appId,
        'x-app-key': credentials.appKey,
      },
    });
    const food = response.data['foods'][0];
    const service_weight_grams = food['serving_weight_grams'];
    return {
      name: food['food_name'],
      quantity: service_weight_grams,
      nutrition: {
        calories: food['nf_calories'] / service_weight_grams,
        carbs: food['nf_total_carbohydrate'] / service_weight_grams,
        fats: food['nf_total_fat'] / service_weight_grams,
        protein: food['nf_protein'] / service_weight_grams
      }
    };
  }
};
