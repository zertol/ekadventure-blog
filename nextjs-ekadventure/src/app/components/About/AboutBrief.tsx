import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faBolt,
  faBullseye,
  faHiking,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";

const AboutBrief: React.FC = () => {
  return (
    <div className="w-full lg:w-2/5 flex flex-col justify-center">
      <h1 className="text-[42px] lg:text-[60px] text-center lg:text-left font-bold mb-8 font-ps lg:pr-36 leading-[1]">
        A little bit about me
      </h1>
      <div className="flex-center-col lg:flex-start-col">
        <div className="space-y-2 font-ps">
          <div className="flex items-center gap-3">
            <span className="text-[16px] text-background-green-accent">
              <FontAwesomeIcon icon={faMountain} className="w-5 h-5" />
            </span>
            <span className="text-[16px] font-bold">ADVENTUROUS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[16px] text-background-green-accent">
              <FontAwesomeIcon icon={faHiking} className="w-5 h-5" />
            </span>
            <span className="text-[16px] font-bold">ENERGETIC</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[16px] text-background-green-accent">
              <FontAwesomeIcon icon={faRoad} className="w-5 h-5" />
            </span>
            <span className="text-[16px] font-bold">AMBITIOUS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBrief;
