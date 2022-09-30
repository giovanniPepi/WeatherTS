import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useRef,
  useState
} from 'react';
import RealTimeData from './components/RealTimeData';
import getWeatherAPI from './functions/getWeatherAPI';
import type { IWeatherData } from '../interfaces';
import getGeoAPI from './functions/getGEOApi';
//import MinutelyData from './components/MinutelyData';
// import HourlyData from './components/HourlyData';
// import DailyData from './components/DailyData';
import { motion } from 'framer-motion';
import dataFormatter from './functions/dataFormatter';
import Loading from './icons/Loading';

const App: React.FC = () => {
  //state
  const [apiData, setApiData] = useState<IWeatherData>();
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [location, setLocation] = useState<string>('');
  // the concatenated location returned by the GEO Api
  const [locationToShow, setLocationToShow] =
    useState<string>('Campinas, BR');
  const [showMinutelyModal, setShowMinutelyModal] =
    useState<Boolean>(false);
  const [showHourlyModal, setShowHourlyModal] =
    useState<Boolean>(false);
  const [showDailyModal, setShowDailyModal] =
    useState<Boolean>(false);

  // code splitting
  const MinutelyData = React.lazy(
    () => import('./components/MinutelyData')
  );
  const HourlyData = React.lazy(
    () => import('./components/HourlyData')
  );

  const DailyData = React.lazy(
    () => import('./components/DailyData')
  );

  //refs
  const inputRef = useRef<HTMLInputElement>(null);

  // empty dependency array to run only once
  useEffect(() => {
    getData(-22.90556, -47.06083, 'Campinas, BR');

    //focus on input
    inputRef.current?.focus();
  }, []);

  // calls weather API
  const getData = async (
    lat: number,
    lon: number,
    country: string
  ) => {
    try {
      // setLoading(true);
      const data = await getWeatherAPI(lat, lon, country);
      setLoading(false);

      // data formatting before displaying in components
      setApiData(dataFormatter(data));

      console.log(data);
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
    setLoadingSearch(true);
    const newLoc = await getGeoAPI(location);
    setLoadingSearch(false);
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
      /* style={{ backgroundImage: `url(${backgroundImg}) ` }} */
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1
      }}
      transition={{ duration: 0.3 }}
      exit={{
        opacity: 0,
        x: window.innerWidth
      }}
    >
      <main className="app">
        {loading ? <Loading /> : null}

        <header className="logo">Weather</header>

        <div className="searchForm">
          <form onSubmit={handleClick}>
            <input
              placeholder="Search a location..."
              onChange={handleInputChange}
              ref={inputRef}
            />
            {loadingSearch ? <Loading /> : null}
          </form>
          <button onClick={handleClick}>Search</button>
        </div>

        {/* Conditional render so we wait for the API data*/}
        {apiData ? (
          <RealTimeData
            apiData={apiData}
            locationToShow={locationToShow}
          />
        ) : null}

        <div className="dataTogglingArea">
          <button onClick={toggleMinuteData}>Minute forecast</button>
          <button onClick={toggleHourlyData}>Hourly forecast</button>
          <button onClick={toggleDailyData}>Daily forecast</button>
        </div>

        {showMinutelyModal && apiData?.minutely ? (
          <Suspense fallback={<Loading />}>
            <MinutelyData
              minuteData={apiData.minutely}
              setShowMinutelyModal={setShowMinutelyModal}
            />
          </Suspense>
        ) : null}

        {showHourlyModal && apiData?.hourly ? (
          <Suspense fallback={<Loading />}>
            <HourlyData
              hourlyData={apiData.hourly}
              setShowHourlyModal={setShowHourlyModal}
            />
          </Suspense>
        ) : null}

        {showDailyModal && apiData?.daily ? (
          <Suspense fallback={<Loading />}>
            <DailyData
              dailyData={apiData.daily}
              setShowDailyModal={setShowDailyModal}
            />
          </Suspense>
        ) : null}
      </main>
    </motion.div>
  );
};

export default App;
