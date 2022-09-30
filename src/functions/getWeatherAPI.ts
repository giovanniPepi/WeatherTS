import { IWeatherData } from "interfaces";

const getWeatherAPI = async (lat: number, lon: number, country: string): Promise<IWeatherData | undefined> => {
    console.log('Weather API call');
  
  if (country === 'BR') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=833c261d19926d13cc578d79528d9d64&units=metric&lang=pt_br`,
        {
          mode: 'cors'
        }
      );
      alert(response);
      const receivedData = await response.json();
      alert('GOT DATA, RETURNING TO APP')
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
}

export default getWeatherAPI;