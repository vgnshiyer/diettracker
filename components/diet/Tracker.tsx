/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMealContext } from "@/context/MealContext";
import { Meal as MealType } from "@/lib/diet/models";
import {
  faFileImport,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Meal from "./Meal";
import Summary from "./Summary";

const Tracker: React.FC = () => {
  const { meals, setMeals, setSelectedMealIndex } = useMealContext();
  const router = useRouter();
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [newMealName, setNewMealName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMeal = () => {
    setNewMealName("");
    setShowNamePrompt(true);
  };

  const handleSaveMeal = () => {
    if (newMealName.trim()) {
      const newMeal: MealType = {
        name: newMealName.trim(),
        foodItems: [],
      };
      setMeals([...meals, newMeal]);
      setShowNamePrompt(false);
    }
  };

  const handleRemoveMeal = (index: number, mealName: string) => {
    if (confirm(`Are you sure you want to remove ${mealName}?`)) {
      const updatedMeals = [...meals];
      updatedMeals.splice(index, 1);
      setMeals(updatedMeals);
    }
  };

  const removeFoodItem = (
    mealIndex: number,
    foodItemIndex: number,
    foodItemName: string
  ) => {
    if (confirm(`Are you sure you want to remove ${foodItemName}?`)) {
      const updatedMeals = [...meals];
      updatedMeals[mealIndex].foodItems.splice(foodItemIndex, 1);
      setMeals(updatedMeals);
    }
  };

  const importDiet = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMeals(JSON.parse(content));
        alert("Diet imported!");
      };
      reader.readAsText(file);
    }
  };

  const openSearchPage = (mealIndex: number) => {
    setSelectedMealIndex(mealIndex);
    router.push("/search");
  };

  return (
    <div className="p-4 rounded-lg max-w-7xl mx-auto">
      <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md mb-4">
        <p>
          Your diet is automatically saved in your browser&apos;s local
          storage. You can export it anytime as a JSON file for backup.
        </p>
      </div>

      {/* Diet Actions */}
      <div className="flex items-center mb-4">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={importDiet}
            className="hidden"
          />
          <PrimaryButton
            onClick={() => fileInputRef.current?.click()}
            faIcon={faFileImport}
            className="!mt-0"
          >
            Import Diet
          </PrimaryButton>
        </div>
        <PrimaryButton
          className="ml-2 md:ml-4 !mt-0"
          onClick={handleAddMeal}
          faIcon={faPlus}
        >
          Add Meal
        </PrimaryButton>
      </div>

      {/* Tracker */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Summary className="sm:hidden" meals={meals} />
        <div className="bg-gray-200 rounded-lg p-4 w-full sm:w-2/3">
          {meals.map((meal: MealType, index: number) => (
            <Meal
              key={index}
              meal={meal}
              index={index}
              onRemoveMeal={handleRemoveMeal}
              onRemoveFoodItem={removeFoodItem}
              onAddItem={openSearchPage}
            />
          ))}
        </div>
        <Summary className="hidden sm:block" meals={meals} />
      </div>

      {/* Add Meal Prompt */}
      {showNamePrompt && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] md:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Add New Meal
            </h2>
            <input
              type="text"
              value={newMealName}
              onChange={(e) => setNewMealName(e.target.value)}
              placeholder="Enter meal name"
              className="border border-black p-2 w-full mb-4 rounded text-gray-800"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <PrimaryButton
                className="!bg-red-500 hover:!bg-red-600"
                onClick={() => setShowNamePrompt(false)}
                faIcon={faXmark}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton onClick={handleSaveMeal} faIcon={faPlus}>
                Add
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
