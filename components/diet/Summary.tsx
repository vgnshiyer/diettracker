import { Meal } from "@/lib/diet/models";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SecondaryButton from "../SecondaryButton";
import { roundValue } from "./helpers";

interface SummaryProps {
  meals: Meal[];
  className?: string;
}

const Summary: React.FC<SummaryProps> = ({ meals, className }) => {
  const calculateTotals = () => {
    return meals.reduce(
      (totals, meal) => {
        meal.foodItems.forEach((item) => {
          totals.calories = totals.calories + item.nutrition.calories;
          totals.carbs = totals.carbs + item.nutrition.carbs;
          totals.fats = totals.fats + item.nutrition.fats;
          totals.protein = totals.protein + item.nutrition.protein;
        });
        return totals;
      },
      { calories: 0, carbs: 0, fats: 0, protein: 0 }
    );
  };

  const totals = calculateTotals();

  const getMacroPercentage = (macroCalories: number) => {
    if (totals.calories === 0) return "0.00";
    return ((macroCalories / totals.calories) * 100).toFixed(2);
  };  

  const exportDiet = () => {
    const dataStr = JSON.stringify(meals, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diet.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`p-4 md:p-8 rounded-lg border flex flex-col justify-between bg-primary h-full ${className}`}>
      <h2 className="text-xl font-semibold mb-2 md:mb-6">Summary</h2>
      <div className="flex flex-row sm:flex-col justify-between gap-2 md:gap-4">
        <div className="bg-blue-50 p-2 rounded-md text-center w-full">
          <p className="font-semibold text-blue-900 text-xs md:text-sm">Calories</p>
          <p className="font-bold text-blue-700 text-sm md:text-base">{roundValue(totals.calories)} kcal</p>
        </div>
        <div className="bg-green-50 p-2 rounded-md text-center w-full">
          <p className="font-semibold text-green-900 text-xs md:text-sm">Carbs</p>
          <p className="font-bold text-green-700 text-sm md:text-base">{roundValue(totals.carbs)} g</p>
          <p className="text-green-700 text-xs md:text-sm">{getMacroPercentage(totals.carbs * 4)}%</p>
        </div>
        <div className="bg-yellow-50 p-2 rounded-md text-center w-full">
          <p className="font-semibold text-yellow-900 text-xs md:text-sm">Fats</p>
          <p className="font-bold text-yellow-700 text-sm md:text-base">{roundValue(totals.fats)} g</p>
          <p className="text-yellow-700 text-xs md:text-sm">{getMacroPercentage(totals.fats * 9)}%</p>
        </div>
        <div className="bg-purple-50 p-2 rounded-md text-center w-full">
          <p className="font-semibold text-purple-900 text-xs md:text-sm">Protein</p>
          <p className="font-bold text-purple-700 text-sm md:text-base">{roundValue(totals.protein)} g</p>
          <p className="text-purple-700 text-xs md:text-sm">{getMacroPercentage(totals.protein * 4)}%</p>
        </div>
      </div>
      <SecondaryButton className="!mt-2 md:!mt-6" onClick={exportDiet} faIcon={faDownload}>
        Export Diet
      </SecondaryButton>
    </div>
  );
};

export default Summary;
