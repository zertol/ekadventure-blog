"use client";

import React from 'react';
import Image from 'next/image';
import AboutQuote from './AboutQuote';

const AboutImage: React.FC = () => {
  return (
    <div className="w-3/5 relative h-[400px]">
      <Image
        src="/images/adventure-header.jpg"
        alt="Adventure portrait"
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute bottom-0 left-0 translate-x-[-25%] translate-y-[50%]">
        <AboutQuote />
      </div>
    </div>
  );
};

export default AboutImage; 