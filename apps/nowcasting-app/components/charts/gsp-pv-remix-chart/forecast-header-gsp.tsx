import React from "react";
import { CloseButtonIcon } from "../../icons";

type ForecastHeaderGSPProps = {
  title: string;
  onClose?: () => void;
};

const ForecastHeaderGSP: React.FC<ForecastHeaderGSPProps> = ({ title, children, onClose }) => {
  return (
    <div id="x" className={"flex content-between flex-wrap mt-6 bg-ocf-yellow bg-opacity-60 h-12"}>
      <div
        className={`bg-ocf-gray-900 text-white lg:text-2xl md:text-lg text-sm font-black  p-4 py-2  flex-[2]`}
      >
        {title}
        <span className={`text-base text-ocf-gray-700 ml-5`}>MW</span>
      </div>
      <div className="flex-[2] m-auto">
        <p className="text-lg text-center align-middle m-auto mx-2">{children}</p>
      </div>
      <div></div>
      <button
        type="button"
        onClick={onClose}
        className="font-bold items-center px-3 ml-2 text-2xl m text-black bg-ocf-yellow  hover:bg-ocf-yellow focus:z-10 focus:bg-ocf-yellow focus:text-black h-full"
      >
        <CloseButtonIcon />
      </button>
    </div>
  );
};

export default ForecastHeaderGSP;
