import React from 'react';
import getWeatherAPI from './functions/getWeatherAPI';



const App = () => {
    console.log(getWeatherAPI(-22.90556, -47.06083, 'Campinas, BR'))
  return (

    <div>hello</div>

  )
}

export default App;
