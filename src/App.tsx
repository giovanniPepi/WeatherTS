import React, { ChangeEvent, useEffect, useState } from "react";
import RealTimeData from "./components/RealTimeData";
import getWeatherAPI from "./functions/getWeatherAPI";
import type { IWeatherData } from "../interfaces";
import getGeoAPI from "./functions/getGEOApi";
import MinutelyData from "./components/MinutelyData";
import HourlyData from "./components/HourlyData";
import DailyData from "./components/DailyData";

const App: React.FC = () => {
  const [apiData, setApiData] = useState<IWeatherData>();
  const [location, setLocation] = useState<string>("Campinas, BR");
  const [showMinutelyData, setShowMinutelyData] = useState<boolean>(false);
  const [showDailyData, setShowDailyData] = useState<boolean>(false);
  const [showHourlyData, setShowHourlyData] = useState<boolean>(false);

  // empty dependency array to run only once
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

  const toggleMinuteData = () => {
    setShowMinutelyData((state) => !state);
  };

  const toggleHourlyData = () => {
    setShowHourlyData((state) => !state);
  };

  const toggleDailyData = () => {
    setShowDailyData((state) => !state);
  };

  return (
    <main>
      {/* Conditional render so we wait for the API data*/}
      {apiData ? <RealTimeData apiData={apiData} /> : null}

      <button onClick={toggleMinuteData}>Minute forecast</button>
      <button onClick={toggleHourlyData}>Hourly forecast</button>
      <button onClick={toggleDailyData}>Daily forecast</button>

      {showMinutelyData && apiData?.minutely ? (
        <MinutelyData minuteData={apiData.minutely} />
      ) : null}

      {showHourlyData && apiData?.hourly ? (
        <HourlyData hourlyData={apiData.hourly} />
      ) : null}

      {showDailyData && apiData?.daily ? (
        <DailyData dailyData={apiData.daily} />
      ) : null}

      <input placeholder="Search a location..." onChange={handleInputChange} />
      <button onClick={handleClick}>Submit</button>
    </main>
  );
};

export default App;
