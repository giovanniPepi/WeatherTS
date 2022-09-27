import { RealTimeDataProps } from "interfaces";
import React, { useState } from "react";
import ExtendedCurrentWeather from "./ExtendedCurrentWeather";

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm

const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow,
}) => {
  const [showExtendedCurrentWeather, setShowExtendedCurrentWeather] =
    useState(false);

  // console.log("realtime component called: ", apiData);
  // console.log("Alerts", apiData.alerts);

  return (
    <section className="realTimeData">
      <div>Updated at: {apiData.current.dt}</div>
      <div>{locationToShow}</div>
      <div>{apiData.current.weather[0].description}</div>
      <div>Temp: {apiData.current.temp}</div>
      <div>Feels_like: {apiData.current.feels_like}</div>
      <div>Humidity: {apiData.current.humidity}</div>
      <div>UV: {apiData.current.uvi}</div>
      <button onClick={() => setShowExtendedCurrentWeather(true)}>Complete info</button>

      {showExtendedCurrentWeather ? (
        <ExtendedCurrentWeather
          setShowExtendedCurrentWeather={setShowExtendedCurrentWeather}
          apiData={apiData}
          locationToShow={locationToShow}
        />
      ) : null}

      {apiData.alerts ? (
        <>
          {/* Colocar SVGS de acordo com tag? */}
          <div>{apiData.alerts[0].tags}</div>
          <div>{apiData.alerts[0].description}</div>
        </>
      ) : null}
    </section>
  );
};

export default RealTimeData;
