import React from "react";

interface CategoryFilterProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  name,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md shadow-md transition-all duration-300 font-medium ${
        isActive
          ? "bg-background-blue-accent text-white"
          : "bg-white text-text-primary hover:bg-background-blue-accent hover:text-white"
      }`}
    >
      {name}
    </button>
  );
};

export default CategoryFilter;
