import React from "react";
import { theme } from "../../../tailwind.config";
import { UpArrow, DownArrow } from "../../icons/icons";

const yellow = theme.extend.colors["ocf-yellow"].DEFAULT;
const deltaNeg = theme.extend.colors["ocf-delta"]["100"];
const deltaPos = theme.extend.colors["ocf-delta"]["900"];

const ForecastWithActualPV: React.FC<{
  forecast: string;
  pvUpdated: string;
  time: string;
  text: string;
  color?: string;
}> = ({ forecast, color = yellow, text }) => {
  return (
    <div className="flex flex-col m-auto h-10 justify-between">
      <div className="flex items-center -ml-[2px]">
        <p className="text-2xs ml-0.5 uppercase leading-tight text-ocf-black w-10 tracking-wider">
          {text}
        </p>
      </div>
      <div>
        <p
          className={`text-xl font-semibold leading-none mt-0.5 text-center text-${color}`}
          style={{ color: color }}
        >
          {forecast}
          <span className="text-xs text-ocf-black font-normal"> GW</span>
        </p>
      </div>
    </div>
  );
};

const FourHourForecast: React.FC<{
  pv: string;
  time: string;
  color?: string;
  text: string;
}> = ({ pv, text, color = yellow }) => {
  return (
    <div className="flex flex-col m-auto h-10 justify-between">
      <div className="flex items-center -ml-[2px]">
        <p className="text-2xs ml-0.5 uppercase leading-tight text-ocf-black w-14 tracking-wider">
          {text}
        </p>
      </div>
      <div>
        <p
          className={`text-xl font-semibold leading-none mt-0.5 text-center text-${color}`}
          style={{ color: color }}
        >
          {pv}
          <span className="text-xs text-ocf-black font-normal"> GW</span>
        </p>
      </div>
    </div>
  );
};

type ForecastHeaderProps = {
  forecastNextPV: string;
  forecastPV: string;
  actualPV: string;
  selectedTimeOnly: string;
  pvTimeOnly: string;
  forecastNextTimeOnly: string;
  deltaValue: string;
};

const DeltaForecastHeaderUI: React.FC<ForecastHeaderProps> = ({
  forecastNextPV,
  forecastPV,
  actualPV,
  pvTimeOnly,
  forecastNextTimeOnly,
  deltaValue
}) => {
  const deltacolor = Number(deltaValue) > 0 ? deltaPos : deltaNeg;
  const svg = Number(deltaValue) > 0 ? <UpArrow /> : <DownArrow />;
  return (
    <div className="flex content-between bg-ocf-gray-800 h-auto">
      <div className="text-white lg:text-2xl md:text-lg text-lg font-black m-auto ml-5 flex justify-evenly">
        National
      </div>
      <div className="flex justify-between flex-2 my-2 px-6 pb-2">
        <div className="pr-8">
          <ForecastWithActualPV
            forecast={`${forecastPV}`}
            text={`Latest Forecast`}
            pvUpdated={`${actualPV}`}
            time={`${pvTimeOnly}`}
            color="ocf-yellow"
          />
        </div>
        <div>
          <FourHourForecast
            pv={forecastNextPV}
            time={`${forecastNextTimeOnly}`}
            text={`Next forecast`}
            color={"ocf-yellow"}
          />
        </div>
      </div>
      <div
        className={`bg-${deltacolor} flex flex-col justify-between pl-3 pr-4 py-2 text-left text-ocf-black uppercase`}
        style={{ background: deltacolor }}
      >
        <p className="leading-tight tracking-wider">Delta</p>
        <div className="flex items-end">
          <div className="pr-2">{svg}</div>
          <p className={`text-xl font-semibold leading-none mt-0.5 text-center`}>
            {deltaValue}
            <span className="text-xs text-ocf-black font-normal"> GW</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeltaForecastHeaderUI;