import React from 'react';
import AboutBrief from '../components/About/AboutBrief';
import AboutImage from '../components/About/AboutImage';

const About: React.FC = () => {
  return (
    <div className="about-page px-[60px]">
      <section className="pt-24 pb-16">
        <div className="container max-w-[1280px] mx-auto flex gap-8 items-center">
          <AboutBrief />
          <AboutImage />
        </div>
      </section>
      
      <section className="container max-w-[1280px] mx-auto mb-10">
         
      </section>
    </div>
  );
};

export default About;
