import React, { useEffect, useState } from "react";
import getWeatherAPI from "./functions/getWeatherAPI";

const App = () => {
  const [apiData, setApiData] = useState<Object>();

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

  return <p>teste APP</p>;
};

export default App;
