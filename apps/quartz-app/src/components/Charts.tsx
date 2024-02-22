"use client";
import { useGetRegionsQuery } from "@/src/hooks/queries";
import { components } from "@/src/types/schema";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// @ts-ignore
import { theme } from "@/tailwind.config";
import { DateTime } from "luxon";
import { FC } from "react";

type ChartsProps = {
  solarGenerationData:
    | components["schemas"]["GetHistoricGenerationResponse"]
    | undefined;
  windGenerationData:
    | components["schemas"]["GetHistoricGenerationResponse"]
    | undefined;
  solarForecastData:
    | components["schemas"]["GetForecastGenerationResponse"]
    | undefined;
  windForecastData:
    | components["schemas"]["GetForecastGenerationResponse"]
    | undefined;
};

const Charts: React.FC<ChartsProps> = ({
  solarGenerationData,
  windGenerationData,
  solarForecastData,
  windForecastData,
}) => {
  const { data, error } = useGetRegionsQuery("solar");
  console.log("Charts data test", data);

  const convertDatestampToEpoch = (time: string) => {
    const date = new Date(time.slice(0, 16));
    return date.getTime();
  };

  const formatDate = (time: number) => {
    const date = new Date(time);
    date.setMinutes(date.getMinutes() + 30);
    return date.toISOString();
  };
  formatDate(1708135056000)
  console.log((formatDate(1708135056000)))

  const getNowInTimezone = () => {
    const now = DateTime.now().setZone("ist");
    return DateTime.fromISO(now.toString().slice(0, 16)).set({
      hour: now.minute >= 45 ? now.hour + 1 : now.hour,
      minute: now.minute < 45 ? Math.floor(now.minute / 15) * 15 : 0,
      second: 0,
      millisecond: 0,
    });
  };

  const getEpochNowInTimezone = () => {
    return getNowInTimezone().toMillis();
  };

  const prettyPrintNowTime = () => {
    return getNowInTimezone().toFormat("HH:mm");
  };

  let formattedChartData: {
    timestamp: number;
    solar_generation?: number;
    wind_generation?: number;
    solar_forecast_past?: number;
    solar_forecast_future?: number;
    wind_forecast_past?: number;
    wind_forecast_future?: number;
  }[] = [];

  // Loop through wind forecast and add to formattedSolarData
  if (windForecastData?.values) {
    for (const value of windForecastData?.values) {
      const timestamp = convertDatestampToEpoch(value.Time);
      const existingData = formattedChartData?.find(
        (data) => data.timestamp === timestamp
      );
      const key =
        timestamp < getEpochNowInTimezone()
          ? "wind_forecast_past"
          : "wind_forecast_future";
      if (existingData) {
        existingData[key] = value.PowerKW / 1000;
      } else {
        formattedChartData?.push({
          timestamp,
          [key]: value.PowerKW / 1000,
        });
      }
    }
  }
  // Loop through solar forecast and add to formattedSolarData
  if (solarForecastData?.values) {
    for (const value of solarForecastData?.values) {
      const timestamp = convertDatestampToEpoch(value.Time);
      const existingData = formattedChartData?.find(
        (data) => data.timestamp === timestamp
      );
      const key =
        timestamp < getEpochNowInTimezone()
          ? "solar_forecast_past"
          : "solar_forecast_future";
      if (existingData) {
        existingData[key] = value.PowerKW / 1000;
      } else {
        formattedChartData?.push({
          timestamp,
          [key]: value.PowerKW / 1000,
        });
      }
    }
  }

  // Loop through solar generation and add to formattedSolarData
  if (solarGenerationData?.values) {
    for (const value of solarGenerationData?.values) {
      const timestamp = convertDatestampToEpoch(value.Time);
      const existingData = formattedChartData?.find(
        (data) => data.timestamp === timestamp
      );
      if (
        existingData &&
        (existingData.solar_forecast_past ||
          existingData.solar_forecast_future ||
          existingData.wind_forecast_future ||
          existingData.wind_forecast_past)
      ) {
        existingData.solar_generation = value.PowerKW / 1000;
      }
    }
  }

  // Loop through wind generation and add to formattedSolarData
  if (windGenerationData?.values) {
    for (const value of windGenerationData?.values) {
      const timestamp = convertDatestampToEpoch(value.Time);
      const existingData = formattedChartData?.find(
        (data) => data.timestamp === timestamp
      );
      if (
        existingData &&
        (existingData.solar_forecast_past ||
          existingData.solar_forecast_future ||
          existingData.wind_forecast_future ||
          existingData.wind_forecast_past)
      ) {
        existingData.wind_generation = value.PowerKW / 1000;
      }
    }
  }

  formattedChartData = formattedChartData.sort(
    (a, b) => a.timestamp - b.timestamp
  );

  console.log(
    "formattedGenerationData",
    formattedChartData.map((d) => ({
      prettyPrint: new Date(d.timestamp).toLocaleString(),
      ...d,
    }))
  );
  const now = new Date();
  const offsets = [-24, -18, -12, -6, 0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
  const ticks = offsets.map((o) => {
    return new Date(now).setHours(o, 0, 0, 0);
  });

  const CustomizedLabel: FC<any> = ({
    value,
    offset,
    viewBox: { x },
    className,
    solidLine,
    onClick,
  }) => {
    const yy = 25;
    return (
      <g>
        {/*<line*/}
        {/*  stroke="white"*/}
        {/*  strokeWidth={solidLine ? "2" : "1"}*/}
        {/*  strokeDasharray={solidLine ? "" : "3 3"}*/}
        {/*  fill="none"*/}
        {/*  fillOpacity="1"*/}
        {/*  x1={x}*/}
        {/*  y1={yy + 30}*/}
        {/*  x2={x}*/}
        {/*  y2={yy}*/}
        {/*></line>*/}
        <g className={`fill-white ${className || ""}`} onClick={onClick}>
          <rect
            x={x - 24}
            y={yy}
            width="48"
            height="21"
            offset={offset}
            fill={"inherit"}
          ></rect>
          <text
            x={x}
            y={yy + 15}
            fill="black"
            className="text-xs"
            id="time-now"
            textAnchor="middle"
          >
            {value}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-ocf-grey-800">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ResponsiveContainer>
          <ComposedChart
            // width={730}
            // height={550}
            data={formattedChartData}
            margin={{ top: 25, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              interval={11}
              // type={"number"}
              // domain={["auto", "auto"]}
              tickFormatter={formatDate}
              scale={"time"}
              tickCount={5}
              ticks={ticks}
              tick={{ fill: "white", style: { fontSize: "12px" } }}
            />
            <YAxis tick={{ fill: "white", style: { fontSize: "12px" } }} />
            <Tooltip
              content={({ payload, label }) => {
                return (
                  <div className="flex flex-col bg-gray-900/50 text-white px-3 py-2">
                    <span>{formatDate(label)}</span>
                    {payload?.map((item) => (
                      <span key={`TooltipKey-${item.dataKey}-${item.name}`}>
                        {item.name}: {item.value}
                      </span>
                    ))}
                  </div>
                );
              }}
            />
            <Legend />
            <Area
              type="monotone"
              stackId={"1"}
              dataKey="solar_forecast_past"
              stroke={theme.extend.colors["ocf-yellow"].DEFAULT || "#FFD053"}
              strokeWidth={2}
              fillOpacity={0.6}
              fill={theme.extend.colors["ocf-yellow"].DEFAULT || "#FFD053"}
            />
            <Area
              type="monotone"
              stackId={"1"}
              dataKey="solar_forecast_future"
              stroke={theme.extend.colors["ocf-yellow"].DEFAULT || "#FFD053"}
              strokeWidth={2}
              strokeDasharray={"10 5"}
              // strokeOpacity={0.75}
              fill={theme.extend.colors["ocf-yellow"].DEFAULT || "#FFD053"}
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              stackId={"1"}
              dataKey="wind_forecast_past"
              stroke={theme.extend.colors["ocf-blue"].DEFAULT || "#48B0DF"}
              strokeWidth={2}
              fill={theme.extend.colors["ocf-blue"].DEFAULT || "#48B0DF"}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              stackId={"1"}
              dataKey="wind_forecast_future"
              stroke={theme.extend.colors["ocf-blue"].DEFAULT || "#48B0DF"}
              strokeWidth={2}
              strokeDasharray={"10 5"}
              // strokeOpacity={0.75}
              fill={theme.extend.colors["ocf-blue"].DEFAULT || "#48B0DF"}
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              stackId={"2"}
              dataKey="solar_generation"
              stroke={"#ffffff"}
              connectNulls={true}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              stackId={"2"}
              dataKey="wind_generation"
              stroke="#ffffff"
              connectNulls={true}
              fillOpacity={0}
            />
            <ReferenceLine
              x={getEpochNowInTimezone()}
              label={
                <CustomizedLabel
                  className={`fill-white cursor-pointer text-sm`}
                  solidLine={true}
                  value={prettyPrintNowTime()}
                />
              }
              // label={prettyPrintNowTime()}
              offset={"20"}
              stroke="white"
              strokeWidth={2}
              strokeDasharray={"20 5"}
              strokeOpacity={0.75}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;