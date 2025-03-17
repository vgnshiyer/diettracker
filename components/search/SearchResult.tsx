import { SearchResult as SearchResultType } from "@/lib/diet/models";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import Action from "../Action";

interface SearchResultProps {
  searchResult: SearchResultType;
  onSelect: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchResult,
  onSelect,
}) => {
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
      <div className="flex flex-col justify-center flex-1 px-4">
        <h1 className="font-semibold text-black">{searchResult.foodName}</h1>
        {"brandName" in searchResult && (
          <p className="text-gray-600 text-sm">By <span className="font-bold">{searchResult.brandName}</span></p>
        )}
        {"calories" in searchResult && (
          <p className="text-gray-600 text-sm">
            <span className="text-green-600">{searchResult.calories}</span> calories
          </p>
        )}
      </div>
      <Action
        onClick={onSelect}
        faIcon={faPlus}
        className="!mt-0"
      >
        Add item
      </Action>
    </div>
  );
};

export default SearchResult;
