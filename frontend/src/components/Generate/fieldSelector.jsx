import React from "react";
export default function FieldSelector({ fields, handleclick, selectedField }) {
  return (
    <>
      <div className="flex flex-col sm:ml-14 mt-6 cursor-pointer">
        <div className="grid grid-cols-3 gap-4 md:hidden">
          {/* 3 columns on mobile, hidden on larger screens */}
          {fields.map(({ key, label, icon }) => (
            <div
              key={key}
              onClick={() => handleclick(key)}
              className={`flex flex-col items-center nav-link w-[30%] mx-auto ${
                selectedField == key ? "active" : ""
              }`}
            >
              {icon}
              <span className="text-xs ml-1">{label}</span>
            </div>
          ))}
        </div>

        {/* Icons for larger screens */}
        <div className="hidden md:flex gap-11">
          {/* Hidden on mobile, displayed on larger screens */}
          {fields.map(({ key, label, icon }) => (
            <div
              key={key}
              onClick={() => handleclick(key)}
              className={`flex flex-col items-center nav-link ${
                selectedField == key ? "active" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
