import { IWeatherData } from "interfaces";
import getInitialAPIData from "./getInitialApiData";

const getWeatherAPI = async(locationObj: { lat?: number; lon?: number; country?: string; }): Promise<IWeatherData | undefined> => {
  console.log('Weather API call', locationObj);
  
  const lat = locationObj.lat;
  const lon = locationObj.lon
  const country = locationObj.country
  
  if (country === 'BR') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=833c261d19926d13cc578d79528d9d64&units=metric&lang=pt_br`,
        {
          mode: 'cors'
        }
      );
      const receivedData = await response.json();
      return receivedData;
    } catch (error) {
      alert(error);
    }
  }
  try {  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=833c261d19926d13cc578d79528d9d64&units=metric`,
    {
      mode: 'cors'
    }
  );
  // Returns a promise that resolves with the result of parsing the response body text as JSON
  const receivedData = await response.json();
    return receivedData;
  } catch (error) {
    console.log(error);
    }
  //return getInitialAPIData();
}

export default getWeatherAPI;