import React from 'react';

interface CategoryFilterProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ name, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
        isActive 
          ? 'bg-[#6C8AB5] text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {name}
    </button>
  );
};

export default CategoryFilter; 