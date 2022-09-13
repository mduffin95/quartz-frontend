import { useMemo } from "react";
import { get30MinNow } from "../globalState";
import { ForecastData, PvRealData } from "../types";
import { formatISODateString } from "../utils";
import { ChartData } from "./remix-line";

//sperate paste forcaste from furute forcast (ie: after selectedTime)
const getForecastChartData = (
  timeNow: string,
  fr?: {
    targetTime: string;
    expectedPowerGenerationMegawatts: number;
  },
  forecast_horizon?: number
) => {
  if (!fr) return {};

  const futureKey = forecast_horizon === 240 ? "4HR_FORECAST" : "FORECAST";
  const pastKey = forecast_horizon === 240 ? "4HR_PAST_FORECAST" : "PAST_FORECAST";

  if (new Date(fr.targetTime).getTime() > new Date(timeNow + ":00.000Z").getTime())
    return {
      [futureKey]: Math.round(fr.expectedPowerGenerationMegawatts),
    };
  else if (new Date(fr.targetTime).getTime() === new Date(timeNow + ":00.000Z").getTime())
    return {
      [futureKey]: Math.round(fr.expectedPowerGenerationMegawatts),
    };
  else
    return {
      [pastKey]: Math.round(fr.expectedPowerGenerationMegawatts),
    };
};
const useFormatChartData = ({
  forecastData,
  fourHourData,
  pvRealDayAfterData,
  pvRealDayInData,
  timeTrigger
}: {
  forecastData?: ForecastData;
  fourHourData?: ForecastData;
  pvRealDayAfterData?: PvRealData;
  pvRealDayInData?: PvRealData;
  timeTrigger?: string;
}) => {
  const data = useMemo(() => {
    if (forecastData && fourHourData && pvRealDayAfterData && pvRealDayInData && timeTrigger) {
      const timeNow = formatISODateString(get30MinNow());
      const chartMap: Record<string, ChartData> = {};

      const addDataToMap = (
        dataPoint: any,
        getDatetimeUtc: (dp: any) => string,
        getPvdata: (dp: any) => Partial<ChartData>
      ) => {
        const pvData = getPvdata(dataPoint);
        const formatedDate = getDatetimeUtc(dataPoint);
        if (chartMap[formatedDate]) {
          chartMap[formatedDate] = {
            ...chartMap[formatedDate],
            ...pvData
          };
        } else {
          chartMap[formatedDate] = {
            formatedDate: formatISODateString(formatedDate),
            ...pvData
          };
        }
      };

      pvRealDayAfterData.forEach((pva) =>
        addDataToMap(
          pva,
          (db) => db.datetimeUtc,
          (db) => ({
            GENERATION_UPDATED: Math.round(db.solarGenerationKw / 1000)
          }),
        ),
      );
      pvRealDayInData.forEach((pvIn) =>
        addDataToMap(
          pvIn,
          (db) => db.datetimeUtc,
          (db) => ({
            GENERATION: Math.round(db.solarGenerationKw / 1000)
          }),
        ),
      );
      forecastData.forEach((fc) =>
        addDataToMap(
          fc,
          (db) => db.targetTime,
          (db) => getForecastChartData(timeNow, db)
        ),
      );
      fourHourData.forEach((fc) =>
        addDataToMap(
          fc,
          (db) => db.targetTime,
          (db) => getForecastChartData(timeNow, db, 240),
        ),
      );

      return Object.values(chartMap);
    }
    return [];
    // timeTrigger is used to trigger chart calculation when time changes
  }, [forecastData, fourHourData, pvRealDayInData, pvRealDayAfterData, timeTrigger]);
  return data;
};

export default useFormatChartData;
