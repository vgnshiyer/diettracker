'use client';

import { useMealContext } from '@/context/MealContext';
import { FoodItem, Meal } from '@/lib/diet/models';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DietSheet: React.FC = () => {
  const { meals, setMeals, setSelectedMealIndex } = useMealContext();
  const router = useRouter();
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [newMealName, setNewMealName] = useState('');

  const handleAddMeal = () => {
    setNewMealName('');
    setShowNamePrompt(true);
  };

  const handleSaveMeal = () => {
    if (newMealName.trim()) {
      const newMeal: Meal = { 
        name: newMealName.trim(), 
        foodItems: [] 
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

  const removeFoodItem = (mealIndex: number, foodItemIndex: number, foodItemName: string) => {
    alert(`Are you sure you want to remove ${foodItemName}?`);
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foodItems.splice(foodItemIndex, 1);
    setMeals(updatedMeals);
  };

  const calculateTotals = () => {
    return meals.reduce(
      (totals, meal) => {
        meal.foodItems.forEach((item: FoodItem) => {
          totals.calories += item.nutrition.calories * item.quantity;
          totals.carbs += item.nutrition.carbs * item.quantity;
          totals.fats += item.nutrition.fats * item.quantity;
          totals.protein += item.nutrition.protein * item.quantity;
        });
        return totals;
      },
      { calories: 0, carbs: 0, fats: 0, protein: 0 }
    );
  };

  const exportDiet = () => {
    const dataStr = JSON.stringify(meals, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diet.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDiet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMeals(JSON.parse(content));
        alert('Diet imported!');
      };
      reader.readAsText(file);
    }
  };

  const openSearchPage = (mealIndex: number) => {
    setSelectedMealIndex(mealIndex);
    router.push('/search');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Diet Sheet</h1>
      Import Diet: <input
        type="file"
        accept=".json"
        onChange={importDiet}
        className="my-4"
      />
      {meals.map((meal: Meal, index: number) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{meal.name}</h2>
            <button
              onClick={() => handleRemoveMeal(index, meal.name)}
              className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Remove Meal
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Food Item</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Quantity (g)</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Calories</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Carbs (g)</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Fats (g)</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Protein (g)</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {meal.foodItems.map((item: FoodItem, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{item.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{item.nutrition.calories * item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{item.nutrition.carbs * item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{item.nutrition.fats * item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{item.nutrition.protein * item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                    <button
                      onClick={() => removeFoodItem(index, idx, item.name)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => openSearchPage(index)}
            className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Food Item
          </button>
        </div>
      ))}
      
      <button
        onClick={handleAddMeal}
        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Meal
      </button>
      {showNamePrompt && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Meal</h2>
            <input
              type="text"
              value={newMealName}
              onChange={(e) => setNewMealName(e.target.value)}
              placeholder="Enter meal name"
              className="border p-2 w-full mb-4 rounded text-gray-800"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNamePrompt(false)}
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMeal}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={!newMealName.trim()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 rounded-lg border border-gray-200 flex flex-row justify-between">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="flex flex-row justify-between gap-4">
          <p>Total Calories: {calculateTotals().calories}</p>
          <p>Total Carbs: {calculateTotals().carbs}g</p>
          <p>Total Fats: {calculateTotals().fats}g</p>
          <p>Total Protein: {calculateTotals().protein}g</p>
        </div>
      </div>
      
      <button
        onClick={exportDiet}
        className="mt-4 py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Export Diet
      </button>
    </div>
  );
};

export default DietSheet;