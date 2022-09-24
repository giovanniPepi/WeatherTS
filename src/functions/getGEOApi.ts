const getGeoAPI = async (location: string): Promise<String | undefined > => {
  try {
  const geoResquest = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=833c261d19926d13cc578d79528d9d64`,
    {
      mode: 'cors'
    }
    
  );    
    const received = await geoResquest.json();
    return received;
  } catch (error) {
    console.log(error)
  }
};

export default getGeoAPI;