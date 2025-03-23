import { FoodItem, Meal as MealType } from '@/lib/diet/models';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Action from '../Action';
import { roundValue } from './helpers';

interface MealProps {
  meal: MealType;
  index: number;
  onRemoveMeal: (index: number, mealName: string) => void;
  onRemoveFoodItem: (mealIndex: number, foodIndex: number, foodName: string) => void;
  onAddItem: (index: number) => void;
}

const Meal: React.FC<MealProps> = ({
  meal,
  index,
  onRemoveMeal,
  onRemoveFoodItem,
  onAddItem,
}) => {
  const totals = meal.foodItems.reduce((acc, item) => {
    return {
      calories: acc.calories + item.nutrition.calories,
      carbs: acc.carbs + item.nutrition.carbs,
      fats: acc.fats + item.nutrition.fats,
      protein: acc.protein + item.nutrition.protein,
    };
  }, { calories: 0, carbs: 0, fats: 0, protein: 0 });

  const headerStyle = "py-2 px-4 text-left text-sm font-semibold text-black";
  const cellStyle = "py-2 px-4 border-b border-gray-200 text-gray-800 text-sm";

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col gap-2 font-bold text-black">
          <h3 className="text-base">{`Meal ${index + 1}`}</h3>
          <h2 className="text-xl">{meal.name.toUpperCase()}</h2>
        </div>
        <Action 
          className="!mt-8 !text-red-500" 
          onClick={() => onRemoveMeal(index, meal.name)} 
          faIcon={faTrash}
        >
          Delete Meal
        </Action>
      </div>
      <div className='overflow-x-auto'>
        <table className="min-w-full bg-white rounded-lg">
          <thead>
          {
            [
              'Food Item',
              'Quantity (g)',
              'Calories (kcal)', 
              'Carbs (g)',
              'Fats (g)',
              'Protein (g)',
              ''
            ].map((label, index) => (
              <th key={index} className={headerStyle}>{label}</th>
            ))
          }
        </thead>
        <tbody>
          {meal.foodItems.map((item: FoodItem, idx: number) => {
            return (
              <tr key={idx} className="hover:bg-gray-50">
                <td className={cellStyle}>{item.name}</td>
                <td className={cellStyle}>{item.quantity} g</td>
                <td className={cellStyle}>{roundValue(item.nutrition.calories)} kcal</td>
                <td className={cellStyle}>{roundValue(item.nutrition.carbs)} g</td>
                <td className={cellStyle}>{roundValue(item.nutrition.fats)} g</td>
                <td className={cellStyle}>{roundValue(item.nutrition.protein)} g</td>
                <td className={cellStyle}>
                  <Action 
                    className="!mt-0 !text-red-500 !font-semibold !text-sm" 
                    onClick={() => onRemoveFoodItem(index, idx, item.name)} 
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Action>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className={headerStyle}>Total</td>
            <td className={headerStyle}></td>
            <td className={headerStyle}>{roundValue(totals.calories)} kcal</td>
            <td className={headerStyle}>{roundValue(totals.carbs)} g</td>
            <td className={headerStyle}>{roundValue(totals.fats)} g</td>
            <td className={headerStyle}>{roundValue(totals.protein)} g</td>
            <td className={headerStyle}></td>
          </tr>
          </tbody>
        </table>
      </div>
      <Action className="!mt-1" onClick={() => onAddItem(index)} faIcon={faPlus}>
        Add Item
      </Action>
    </div>
  );
};

export default Meal;
