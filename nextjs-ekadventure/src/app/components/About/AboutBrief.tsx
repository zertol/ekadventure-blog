"use client";

import React from 'react';

const AboutBrief: React.FC = () => {
  return (
    <div className="w-2/5 pr-8 flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-8">A little bit about me</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🏔️</span>
          <span className="text-lg">ADVENTUROUS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <span className="text-lg">ENERGETIC</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">🎯</span>
          <span className="text-lg">AMBITIOUS</span>
        </div>
      </div>
    </div>
  );
};

export default AboutBrief; 