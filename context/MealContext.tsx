"use client";

import { FoodItem, Meal } from "@/lib/diet/models";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MealContextType {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  selectedMealIndex: number | null;
  setSelectedMealIndex: React.Dispatch<React.SetStateAction<number | null>>;
  addFoodItemToMeal: (foodItem: FoodItem) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMealIndex, setSelectedMealIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('meals', JSON.stringify(meals));
    }
  }, [meals, isLoaded]);

  const addFoodItemToMeal = (foodItem: FoodItem) => {
		if (selectedMealIndex !== null) {
			const updatedMeals = [...meals];
			updatedMeals[selectedMealIndex].foodItems.push(foodItem);
			setMeals(updatedMeals);
		}
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        setMeals,
        selectedMealIndex,
        setSelectedMealIndex,
        addFoodItemToMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => {
  const context = useContext(MealContext);
  if (!context)
    throw new Error("useMealContext must be used within a MealProvider");
  return context;
};
