import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import RealTimeData from "./components/RealTimeData";
import getWeatherAPI from "./functions/getWeatherAPI";
import type { IWeatherData } from "../interfaces";
import getGeoAPI from "./functions/getGEOApi";
import MinutelyData from "./components/MinutelyData";
import HourlyData from "./components/HourlyData";
import DailyData from "./components/DailyData";

const App: React.FC = () => {
  const [apiData, setApiData] = useState<IWeatherData>();
  const [location, setLocation] = useState<string>("");
  // this is the concatenated location returned by the GEO Api
  const [locationToShow, setLocationToShow] = useState<string>("Campinas, BR");
  const [showMinutelyData, setShowMinutelyData] = useState<boolean>(false);
  const [showDailyData, setShowDailyData] = useState<boolean>(false);
  const [showHourlyData, setShowHourlyData] = useState<boolean>(false);

  // empty dependency array to run only once
  useEffect(() => {
    getData(-22.90556, -47.06083, "Campinas, BR");
  }, []);

  // calls weather API
  const getData = async (lat: number, lon: number, country: string) => {
    try {
      const data = await getWeatherAPI(lat, lon, country);
      setApiData(data);
    } catch (error) {
      console.log(error);
    }
  };

  //https://devtrium.com/posts/react-typescript-events
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  // updates APIData when clicking
  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newLoc = await getGeoAPI(location);
    console.log(newLoc);

    // avoids undefined
    if (newLoc) {
      getData(newLoc.lat, newLoc.lon, newLoc.country);
      setLocationToShow(`${newLoc.name}, ${newLoc.country}`);
    }
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
      {apiData ? (
        <RealTimeData apiData={apiData} locationToShow={locationToShow} />
      ) : null}

      <form onSubmit={handleClick}>
        <input
          placeholder="Search a location..."
          onChange={handleInputChange}
        />
      </form>
      <button onClick={handleClick}>Search</button>

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
    </main>
  );
};

export default App;
