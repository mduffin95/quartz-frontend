import React from "react";
import { get30MinNow } from "../../helpers/globalState";
import useTimeNow from "../../hooks/use-time-now";
import PlayButton from "../../play-button";
import { PvRealData, ForecastData } from "../../types";
import {
  convertISODateStringToLondonTime,
  formatISODateString,
  KWtoGW,
  MWtoGW
} from "../../helpers/utils";
import ForecastHeaderUI from "./ui";

type ForecastHeaderProps = {
  pvLiveData: PvRealData;
  pvForecastData: ForecastData;
};

const ForecastHeader: React.FC<ForecastHeaderProps> = ({ pvLiveData, pvForecastData }) => {
  const timeNow = useTimeNow();

  // get the time for the OCF Forecast
  const futurePvForecastDatetime = formatISODateString(timeNow);
  const futurePVForecastDatetimeLabel = convertISODateStringToLondonTime(
    futurePvForecastDatetime + ":00.000Z"
  );

  // Get the next OCF forecast, for now (or future)
  const nextPvForecastInGW = MWtoGW(
    pvForecastData?.find((fc) => formatISODateString(fc.targetTime) === futurePvForecastDatetime)
      ?.expectedPowerGenerationMegawatts || 0
  );

  // get the Actual pv value in GW
  const selectedPvActualInGW = KWtoGW(pvLiveData[0].solarGenerationKw);

  // get pv time
  const selectedPvActualDatetime = pvLiveData[0].datetimeUtc;

  // Use the same time for the Forecast historic
  const pvForecastDatetime = formatISODateString(selectedPvActualDatetime);

  // Get the next OCF forecast for the last PV value time
  const selectedPvForecastInGW = MWtoGW(
    pvForecastData?.find((fc) => formatISODateString(fc.targetTime) === pvForecastDatetime)
      ?.expectedPowerGenerationMegawatts || 0
  );

  return (
    <ForecastHeaderUI
      forcastNextPV={nextPvForecastInGW}
      actualPV={selectedPvActualInGW}
      forcastPV={selectedPvForecastInGW}
      selectedTimeOnly={convertISODateStringToLondonTime(pvForecastDatetime + ":00.000Z")}
      pvTimeOnly={convertISODateStringToLondonTime(selectedPvActualDatetime)}
      forecastNextTimeOnly={futurePVForecastDatetimeLabel}
    >
      <PlayButton
        startTime={get30MinNow()}
        endTime={pvForecastData[pvForecastData.length - 1].targetTime}
      ></PlayButton>
    </ForecastHeaderUI>
  );
};

export default ForecastHeader;
