import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row bg-blue-300 p-4 justify-between">
      <div className="font-bold text-white text-2xl">{title}</div>
      <button
        className="py-2 pr-4 pl-2 bg-slate-500 rounded-md text-white flex flex-row items-center"
        onClick={() => navigate(-1)}
      >
        <ChevronLeftIcon className="size-5" />
        <span className="pl-1">Back</span>
      </button>
    </div>
  );
}
