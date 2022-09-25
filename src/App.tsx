import React, { useEffect, useState } from "react";
import RealTimeData from "./components/RealTimeData";
import getWeatherAPI from "./functions/getWeatherAPI";
import type { IWeatherData } from "../interfaces";

const App: React.FC = () => {
  const [apiData, setApiData] = useState<IWeatherData>();

  // empty dependency array to run only once
  // change to useMemo?

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getWeatherAPI(-22.90556, -47.06083, "Campinas, BR");
        setApiData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return <p>app</p>;
};

export default App;
