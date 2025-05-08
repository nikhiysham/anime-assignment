import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBox({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  return (
    <form className="md:w-2/6 lg:w-1/6 w-full">
      <div className="relative">
        <input
          type="search"
          className="w-full p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search anime"
          onKeyUp={(evt) => onSearch(evt.currentTarget.value)}
        />
        <MagnifyingGlassIcon className="absolute size-5 text-blue-500 end-2.5 bottom-3.5 " />
      </div>
    </form>
  );
}
