import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import RealTimeData from "./components/RealTimeData";
import getWeatherAPI from "./functions/getWeatherAPI";
import type { IWeatherData } from "../interfaces";
import getGeoAPI from "./functions/getGEOApi";
import MinutelyData from "./components/MinutelyData";
import HourlyData from "./components/HourlyData";
import DailyData from "./components/DailyData";
import { motion } from "framer-motion";
import backgroundImg from "./img/background.jpg";

const App: React.FC = () => {
  //state
  const [apiData, setApiData] = useState<IWeatherData>();
  const [location, setLocation] = useState<string>("");
  // the concatenated location returned by the GEO Api
  const [locationToShow, setLocationToShow] = useState<string>("Campinas, BR");
  const [showMinutelyModal, setShowMinutelyModal] = useState<Boolean>(false);
  const [showHourlyModal, setShowHourlyModal] = useState<Boolean>(false);
  const [showDailyModal, setShowDailyModal] = useState<Boolean>(false);

  //refs
  const inputRef = useRef<HTMLInputElement>(null);

  // empty dependency array to run only once
  useEffect(() => {
    getData(-22.90556, -47.06083, "Campinas, BR");

    //focus on input
    inputRef.current?.focus();
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
    setShowMinutelyModal((state) => !state);
  };

  const toggleHourlyData = () => {
    setShowHourlyModal((state) => !state);
  };

  const toggleDailyData = () => {
    setShowDailyModal((state) => !state);
  };

  return (
    <motion.div
      className="home"
      style={{ backgroundImage: `url(${backgroundImg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="app">
        {/* Conditional render so we wait for the API data*/}
        {apiData ? (
          <RealTimeData apiData={apiData} locationToShow={locationToShow} />
        ) : null}

        <form onSubmit={handleClick}>
          <input
            placeholder="Search a location..."
            onChange={handleInputChange}
            ref={inputRef}
          />
        </form>
        <button onClick={handleClick}>Search</button>

        <button onClick={toggleMinuteData}>Minute forecast</button>
        <button onClick={toggleHourlyData}>Hourly forecast</button>
        <button onClick={toggleDailyData}>Daily forecast</button>

        {showMinutelyModal && apiData?.minutely ? (
          <MinutelyData
            minuteData={apiData.minutely}
            setShowMinutelyModal={setShowMinutelyModal}
          />
        ) : null}

        {showHourlyModal && apiData?.hourly ? (
          <HourlyData
            hourlyData={apiData.hourly}
            setShowHourlyModal={setShowHourlyModal}
          />
        ) : null}

        {showDailyModal && apiData?.daily ? (
          <DailyData
            dailyData={apiData.daily}
            setShowDailyModal={setShowDailyModal}
          />
        ) : null}
      </main>
    </motion.div>
  );
};

export default App;
