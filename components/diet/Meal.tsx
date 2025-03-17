import { FoodItem, Meal as MealType } from '@/lib/diet/models';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Action from '../Action';

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
              <th key={index} className="py-2 px-4 text-left text-sm font-bold text-gray-500">{label}</th>
            ))
          }
        </thead>
        <tbody>
          {meal.foodItems.map((item: FoodItem, idx: number) => {
            const style = "py-2 px-4 border-b border-gray-200 text-gray-800 font-semibold text-sm";
            return (
              <tr key={idx} className="hover:bg-gray-50">
                <td className={style}>{item.name}</td>
                <td className={style}>{item.quantity}</td>
                <td className={style}>{item.nutrition.calories} kcal</td>
                <td className={style}>{item.nutrition.carbs} g</td>
                <td className={style}>{item.nutrition.fats} g</td>
                <td className={style}>{item.nutrition.protein} g</td>
                <td className={style}>
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
