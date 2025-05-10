"use client";
import React, { useEffect, useState } from "react";
import SelectFilter from "./SelectFilter";

export default function SearchFilter({
  options = [],
  defaultValue = "",
  onChange,
}) {
  const [searchText, setSearchText] = useState("");
  const [selectValue, setSelectValue] = useState(defaultValue);

  useEffect(() => {
    // Call the onChange handler whenever searchText or selectValue changes
    onChange?.({ searchText, searchBy: selectValue });
  }, [searchText, selectValue, onChange]);

  return (
    <div className="flex items-center  w-full">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search here..."
        className="flex-1 px-3 py-[8.5px] text-sm border border-gray-300 
                   focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300"
      />

      <SelectFilter
        options={options}
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      />
    </div>
  );
}
