"use client";

import { OCFLogo } from "@/src/assets/logo";
import { useUserMenu } from "@/src/hooks/useUserMenu";
import useGlobalState from "../helpers/globalState";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const { showUserMenu, setShowUserMenu } = useUserMenu();
  const [combinedData] = useGlobalState("combinedData");
  const downloadCsv = async () => {
    console.log("Download CSV");
    if (!combinedData) return;
    // Remap combined data into array of objects with same timestamp and values for each key
    type CombinedDatumWithTimestamp = {
      solarForecastData?: number | null;
      solarGenerationData?: number | null;
      windForecastData?: number | null;
      windGenerationData?: number | null;
      time: string;
    };
    const combinedDataByTimestampMap: Map<string, CombinedDatumWithTimestamp> =
      new Map();
    for (const [type, values] of Object.entries(combinedData)) {
      if (!type) continue;
      const data = combinedData[type as keyof typeof combinedData];

      if (data?.values.length) {
        for (const value of data.values) {
          if (!value.Time) continue;
          const existingEntry = combinedDataByTimestampMap.get(value.Time);
          if (existingEntry) {
            existingEntry[type as keyof typeof combinedData] =
              value.PowerKW || null;
            combinedDataByTimestampMap.set(value.Time, existingEntry);
          } else {
            combinedDataByTimestampMap.set(value.Time, {
              time: value.Time,
              [type]: value.PowerKW || null,
            });
          }
        }
      }
    }
    let csvHeader =
      Object.keys(combinedDataByTimestampMap.values().next().value).join(",") +
      "\n"; // header row
    let csvBody = "";
    for (const row of combinedDataByTimestampMap.values()) {
      csvBody += Object.values(row).join(",") + "\n";
    }
    let csv = csvHeader + csvBody;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.setAttribute("download", "combinedData.csv");
    document.body.appendChild(a);
    // console.log("csv", csv);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div
        id={"ProfileDropdownBackdrop"}
        onClick={() => setShowUserMenu(false)}
        className={`absolute inset-0 bg-black/50 z-30 ${
          showUserMenu ? "block" : "hidden"
        }`}
      ></div>
      <header className="h-16 text-white px-4 bg-black flex absolute top-0 w-full p-1 text-sm items-center z-30">
        <div className="flex-grow-0 -mt-0.5 flex-shrink-0">
          <a className="flex h-8 self-center w-auto" href="/" rel="noreferrer">
            <img
              src="/QUARTZSOLAR_LOGO_ICON.svg"
              alt="quartz_logo"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="p-1 mt-0.5 mb-1.5 items-end flex flex-col">
          <a className="flex h-6 w-auto" href="/" rel="noreferrer">
            <img
              src="/QUARTZENERGY_LOGO_TEXTONLY_WHITE.svg"
              alt="quartz_logo"
              className="h-8 w-auto"
            />
          </a>
          <div className="mr-[6px] flex items-center">
            <span className="block mr-[1px] font-light tracking-wide text-[10px]">
              powered by
            </span>
            <OCFLogo />
          </div>
        </div>
        <div className="grow text-center inline-flex px-8 gap-5 items-center"></div>
        <div className="py-1">
          <span
            onClick={() => {
              setShowUserMenu(() => !showUserMenu);
            }}
            className="w-8 h-8 flex items-center justify-center text-lg rounded-full cursor-pointer bg-gradient-to-br from-quartz-yellow to-quartz-blue"
          >
            E
          </span>
          <div
            id="ProfileDropdown"
            className={`flex ${
              showUserMenu ? "relative" : "absolute -top-40 -right-40 z-40"
            }`}
          >
            <div className="absolute right-0 flex flex-col mt-2 w-48 py-1 bg-white text-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <button
                id="DownloadCsvButton"
                onClick={downloadCsv}
                className="text-left disabled block px-4 py-2 text-sm hover:bg-gray-100"
                tabIndex={1}
              >
                Download CSV
              </button>
              <hr />
              <span className="block px-4 py-2 text-xs ">
                Signed in as example@email.com
              </span>
              <a
                // href="/api/auth/logout"
                className="cursor-not-allowed disabled block px-4 py-2 text-sm text-gray-400"
                tabIndex={2}
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
