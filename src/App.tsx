import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import RealTimeData from "./components/RealTimeData";
import getWeatherAPI from "./functions/getWeatherAPI";
import type { IWeatherData } from "../interfaces";
import getGeoAPI from "./functions/getGEOApi";
import MinutelyData from "./components/MinutelyData";
import HourlyData from "./components/HourlyData";

const App: React.FC = () => {
  const [apiData, setApiData] = useState<IWeatherData>();
  const [location, setLocation] = useState<string>("Campinas, BR");

  // empty dependency array to run only once
  // change to useMemo?
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getWeatherAPI(-22.90556, -47.06083, "Campinas, BR");
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  //https://devtrium.com/posts/react-typescript-events
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  // updates APIData when clicking
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newLoc = await getGeoAPI(location);
    if (newLoc) setApiData(newLoc);
  };

  return (
    <main>
      {/* Conditional render so we wait for the API data*/}
      {apiData ? <RealTimeData apiData={apiData} /> : null}
      {apiData?.minutely ? (
        <MinutelyData minuteData={apiData.minutely} />
      ) : null}
      {apiData?.hourly ? <HourlyData hourlyData={apiData.hourly} /> : null}

      <input placeholder="Search a location..." onChange={handleInputChange} />
      <button onClick={handleClick}>Submit</button>
    </main>
  );
};

export default App;
