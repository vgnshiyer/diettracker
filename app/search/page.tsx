"use client";

import { useMealContext } from "@/context/MealContext";
import { fetchNutritionData, fetchSearchResults } from "@/lib/diet/api";
import { FoodItem, SearchResult } from "@/lib/diet/models";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Result = ({ searchResult, onSelect }: { searchResult: SearchResult, onSelect: () => void }) => {
  return (
    <div className="flex items-center justify-between">
      <Image
        src={searchResult.thumbnail}
        alt={searchResult.foodName}
        width={100}
        height={100}
        loader={({ src, width, quality }) => {
          return `${src}?w=${width}&q=${quality || 75}`;
        }}
      />
      <div>
        <h1>{searchResult.foodName}</h1>
        {'brandName' in searchResult && <p>{searchResult.brandName}</p>}
        {'calories' in searchResult && <p>{searchResult.calories} calories</p>}
      </div>
      <button onClick={onSelect} className="ml-4 py-1 px-2 bg-green-500 text-white rounded hover:bg-green-600">
        Select
      </button>
    </div>
  );
};

const SearchPage: React.FC = () => {
  const { addFoodItemToMeal } = useMealContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const data = await fetchSearchResults(query);
    if (data) {
      setResults(data);
    }
  };

  const handleSelect = async (item: SearchResult) => {
    setQuantity(1);
    setSelectedItem(item);
    const data = await fetchNutritionData(item.type === 'branded' ? item.itemId : item.foodName, item.type);
    if (data) {
      setFoodItem({
        name: item.foodName,
        quantity: 1,
        nutrition: data.nutrition
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const calculateNutrients = (base: number) => {
    return Number((base * quantity).toFixed(2));
  };

  const handleAddFoodItemToMeal = () => {
    if (foodItem) {
      const roundedFoodItem = {
        ...foodItem,
        quantity,
        nutrition: {
          calories: Number((foodItem.nutrition.calories * quantity).toFixed(1)),
          carbs: Number((foodItem.nutrition.carbs * quantity).toFixed(1)),
          fats: Number((foodItem.nutrition.fats * quantity).toFixed(1)),
          protein: Number((foodItem.nutrition.protein * quantity).toFixed(1))
        }
      };
      addFoodItemToMeal(roundedFoodItem);
      router.push('/');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Food Item</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter food item"
        className="border p-2 mb-4 w-full text-gray-800 rounded"
      />
      <button
        onClick={handleSearch}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Search
      </button>
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <ul>
            {results.map((item, index) => (
              <li key={index} className="mb-2">
                <Result searchResult={item} onSelect={() => handleSelect(item)} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedItem && foodItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <h2 className="text-gray-800 text-xl font-bold mb-2">{selectedItem.foodName}</h2>
            <label className="block mb-2 text-gray-800">
              Quantity (grams):
              <div className="flex items-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border p-1 ml-2 w-1/4 rounded border-gray-500"
                  min="1"
                />
                <div className="flex flex-col ml-1">
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </label>
            <p className="text-gray-800">Calories: {calculateNutrients(foodItem.nutrition.calories)} kcal</p>
            <p className="text-gray-800">Carbs: {calculateNutrients(foodItem.nutrition.carbs)} g</p>
            <p className="text-gray-800">Fats: {calculateNutrients(foodItem.nutrition.fats)} g</p>
            <p className="text-gray-800">Protein: {calculateNutrients(foodItem.nutrition.protein)} g</p>
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
            <button
              onClick={handleAddFoodItemToMeal}
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add to Meal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
