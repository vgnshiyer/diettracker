/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMealContext } from "@/context/MealContext";
import { fetchNutritionData, fetchSearchResults } from "@/lib/diet/api";
import { FoodItem, SearchResult as SearchResultType } from "@/lib/diet/models";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";
import SearchResult from "./SearchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../PrimaryButton";

const FoodSearch: React.FC = () => {
  const { addFoodItemToMeal, selectedMealIndex } = useMealContext();
  // search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultType[]>([]);
  // quantity
  const [selectedItem, setSelectedItem] = useState<SearchResultType | null>(null);
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (selectedMealIndex === null) {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const data = await fetchSearchResults(query);
    if (data) {
      setResults(data);
    }
  };

  const handleSelect = async (item: SearchResultType) => {
    setQuantity(1);
    setSelectedItem(item);
    const data = await fetchNutritionData(
      item.type === "branded" ? item.itemId : item.foodName,
      item.type
    );
    if (data) {
      setFoodItem({
        name: item.foodName,
        quantity: 1,
        nutrition: data.nutrition,
      });
    }
  };

  const handleAddFoodItemToMeal = () => {
    if (foodItem) {
      const roundedFoodItem = {
        ...foodItem,
        quantity,
        nutrition: {
          calories: foodItem.nutrition.calories * quantity,
          carbs: foodItem.nutrition.carbs * quantity,
          fats: foodItem.nutrition.fats * quantity,
          protein: foodItem.nutrition.protein * quantity,
        },
      };
      addFoodItemToMeal(roundedFoodItem);
      router.push("/");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* search */}
      <div className="relative flex items-center mb-4">
        <div className="absolute left-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search for a food item"
          className="pl-10 pr-20 py-3 w-full border border-black text-gray-800 rounded-lg text-lg"
        />
        <PrimaryButton
          onClick={handleSearch}
          className="absolute right-2 !mt-0"
        >
          Search
        </PrimaryButton>
      </div>
      {/* results */}
      {results.length > 0 && (
        <div>
          <ul>
            {results.map((item, index) => (
              <li key={index} className="mb-2">
                <SearchResult
                  searchResult={item}
                  onSelect={() => handleSelect(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* quantity input */}
      {selectedItem && foodItem && (
        <QuantityInput
          selectedItem={selectedItem}
          foodItem={foodItem}
          quantity={quantity}
          onQuantityChange={(e: any) =>
            setQuantity(Number(e.target.value))
          }
          onClose={() => setSelectedItem(null)}
          onAdd={handleAddFoodItemToMeal}
          onQuantityIncrement={() => setQuantity((q) => q + 1)}
          onQuantityDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        />
      )}
    </div>
  );
};

export default FoodSearch;
