import axios from "axios";
import { FoodItem, SearchResult } from "./models";
import { getFoodItemFromResponse } from "./utils";

const BASE_URL = "https://trackapi.nutritionix.com/v2";

const SEARCH_RESULTS_URL = `${BASE_URL}/search/instant/`;
const SEARCH_BRANDED_URL = `${BASE_URL}/search/item/`;
const SEARCH_COMMON_URL = `${BASE_URL}/natural/nutrients/`;

export const getStoredCredentials = () => {
  const credentials = localStorage.getItem("nutritionix_credentials");
  return credentials ? JSON.parse(credentials) : null;
};

export const fetchSearchResults = async (
  query: string
): Promise<SearchResult[] | null> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error("API credentials not found");
  }

  try {
    const response = await axios.get(SEARCH_RESULTS_URL, {
      params: {
        query: query,
      },
      headers: {
        "Content-Type": "application/json",
        "x-app-id": credentials.appId,
        "x-app-key": credentials.appKey,
      },
    });
    const results: SearchResult[] = [
      ...response.data.branded.map(
        (result: {
          food_name: string;
          brand_name: string;
          nix_item_id: string;
          photo: { thumb: string };
          nf_calories: number;
        }) => ({
          foodName: result.food_name,
          brandName: result.brand_name,
          itemId: result.nix_item_id,
          thumbnail: result.photo.thumb,
          calories: result.nf_calories,
        })
      ),
      ...response.data.common.map(
        (result: { food_name: string; photo: { thumb: string } }) => ({
          foodName: result.food_name,
          thumbnail: result.photo.thumb,
        })
      ),
    ];
    return results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
};

export const fetchNutritionData = async (
  query_or_item_id: string,
  type: "common" | "branded"
): Promise<FoodItem | null> => {
  const credentials = getStoredCredentials();
  if (!credentials) {
    throw new Error("API credentials not found");
  }
  const headers = {
    "Content-Type": "application/json",
    "x-app-id": credentials.appId,
    "x-app-key": credentials.appKey,
  };

  let response = null;
  if (type === "branded") {
    response = await axios.get(SEARCH_BRANDED_URL, {
      params: {
        nix_item_id: query_or_item_id,
      },
      headers: headers,
    });
  } else {
    response = await axios.post(
      SEARCH_COMMON_URL,
      {
        query: query_or_item_id,
      },
      {
        headers: headers,
      }
    );
  }
  return getFoodItemFromResponse(response);
};
