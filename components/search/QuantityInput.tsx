import { FoodItem, SearchResult } from "@/lib/diet/models";
import { faChevronDown, faChevronUp, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../PrimaryButton";

interface QuantityInputProps {
  selectedItem: SearchResult;
  foodItem: FoodItem;
  quantity: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onAdd: () => void;
  onQuantityIncrement: () => void;
  onQuantityDecrement: () => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  selectedItem,
  foodItem,
  quantity,
  onQuantityChange,
  onClose,
  onAdd,
  onQuantityIncrement,
  onQuantityDecrement,
}) => {
  const calculateNutrients = (base: number) => {
    return Number((base * quantity).toFixed(2));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[750px] flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 p-6 ml-4 mt-4">
          <h1 className="text-2xl font-bold mb-4 text-black">{selectedItem.foodName}</h1>
          <Image
            src={selectedItem.thumbnail}
            alt={selectedItem.foodName}
            width={200}
            height={200}
            className="rounded-lg w-1/2 md:w-full md:h-auto"
            loader={({ src, width, quality }) => {
              return `${src}?w=${width}&q=${quality || 75}`;
            }}
          />
          {'brandName' in selectedItem && selectedItem.brandName && (
            <p className="text-sm text-black mt-2 md:mt-0 font-bold">
              By {selectedItem.brandName}
            </p>
          )}
        </div>

        <div className="flex-1 bg-gray-50 flex flex-col p-6">
          <div className="mb-2 md:mb-6">
            <label className="text-md font-semibold mb-2 block !text-black">Quantity (g)</label>
            <div className="flex items-center">
              <input
                value={quantity}
                onChange={onQuantityChange}
                className="border border-black text-black p-2 rounded-lg w-24 text-center font-bold"
                min="1"
              />
              <div className="flex flex-col ml-2">
                <button 
                  onClick={onQuantityIncrement} 
                  className="text-black h-6"
                >
                  <FontAwesomeIcon icon={faChevronUp} />
                </button>
                <button 
                  onClick={onQuantityDecrement} 
                  className="text-black h-6"
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm md:text-md text-blue-900 font-bold">Total Calories</p>
              <p className="text-md md:text-xl font-bold text-blue-700">
                {calculateNutrients(foodItem.nutrition.calories)} kcal
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm md:text-md text-green-900 font-bold">Total Carbs</p>
              <p className="text-md md:text-xl font-bold text-green-700">
                {calculateNutrients(foodItem.nutrition.carbs)} g
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm md:text-md text-purple-900 font-bold">Total Protein</p>
              <p className="text-md md:text-xl font-bold text-purple-700">
                {calculateNutrients(foodItem.nutrition.protein)} g
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-sm md:text-md text-yellow-900 font-bold">Total Fats</p>
              <p className="text-md md:text-xl font-bold text-yellow-700">
                {calculateNutrients(foodItem.nutrition.fats)} g
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-auto">
            <PrimaryButton
              className="!bg-red-500 hover:!bg-red-600"
              onClick={onClose}
              faIcon={faXmark}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton onClick={onAdd} faIcon={faPlus}>
              Add Item
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityInput;
