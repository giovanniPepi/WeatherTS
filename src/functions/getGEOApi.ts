import { IWeatherData } from "interfaces";

const getGeoAPI = async (location: string): Promise<IWeatherData | undefined> => {
  console.log('GEO API call');

  try {
      const geoResquest = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=833c261d19926d13cc578d79528d9d64`,
    {
      mode: 'cors'
    }
  );    
    const received = await geoResquest.json();
    // returns only the first value, for simplicity
    return received[0];
  } catch (error) {
    console.log(error)
  }
};

export default getGeoAPI;