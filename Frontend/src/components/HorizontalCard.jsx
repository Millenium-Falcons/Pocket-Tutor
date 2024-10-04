import React from "react";

export function HorizontalCard({ heading }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl pt-5 font-semibold text-white">{heading}</h2>
      <div className="flex overflow-x-auto space-x-4 p-2">
        <div className="flex-shrink-0 bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white">Topic 1</p>
        </div>
        <div className="flex-shrink-0 bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white">Topic 2</p>
        </div>
        <div className="flex-shrink-0 bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white">Topic 3</p>
        </div>
        <div className="flex-shrink-0 bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white">Topic 4</p>
        </div>
        <div className="flex-shrink-0 bg-[#1c1c2e] p-4 rounded-lg w-72 h-48 flex items-center justify-center">
          <p className="text-white">Topic 5</p>
        </div>
      </div>
    </div>
  );
}
