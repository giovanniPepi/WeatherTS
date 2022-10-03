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
import Search from './icons/Search';
import getWeatherBackground from './functions/getWeatherBackground';
import isNight from './functions/isNight';

const App: React.FC = () => {
  //state
  const [apiData, setApiData] = useState<IWeatherData>();
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [latForAPI, setLatForApi] = useState(-22.854103);
  const [longForAPI, setLonForApi] = useState(-47.048331);
  const [locationForAPI, setLocationForApi] =
    useState('Campinas, BR');
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
  const [showRealTimeModal, setShowRealTimeModal] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(true);
  // GUI changers
  const [backgroundImg, setBackgroundImg] = useState();
  const [night, setNight] = useState(false);
  const [UIColor, setUIColor] = useState('black');
  const [modalUIColor, setModalUIColor] = useState('white');
  const [moonPhase, setMoonPhase] = useState(0);
  const [svgColors, setSvgColors] = useState('rgb(255, 255, 255)');

  //REF
  const inputRef = useRef<HTMLInputElement>(null);

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
      setLatForApi(newLoc.lat);
      setLonForApi(newLoc.lon);
      setLocationForApi(newLoc.country);
      setLocationToShow(`${newLoc.name}, ${newLoc.country}`);
    }
  };

  // toggles - handle open/closing modals
  const toggleMinuteData = () => {
    setShowMinutelyModal(true);
    setShowRealTimeModal(false);
    setShowHourlyModal(false);
    setShowDailyModal(false);
    setShowSearchModal(false);
  };

  const toggleHourlyData = () => {
    setShowHourlyModal(true);
    setShowMinutelyModal(false);
    setShowRealTimeModal(false);
    setShowDailyModal(false);
    setShowSearchModal(false);
  };

  const toggleDailyData = () => {
    setShowDailyModal(true);
    setShowHourlyModal(false);
    setShowMinutelyModal(false);
    setShowRealTimeModal(false);
    setShowSearchModal(false);
  };

  const toggleRealTimeData = () => {
    setShowRealTimeModal(true);
    setShowDailyModal(false);
    setShowHourlyModal(false);
    setShowMinutelyModal(false);
    setShowSearchModal(true);
  };

  useEffect(() => {
    // verifies night
    setNight(isNight());

    // changes UI color at night
    if (night) {
      setUIColor('rgb(235, 235, 235');
      setModalUIColor('#241F31');
      setSvgColors('#a3e635');
    } else {
      isNight();
    }

    // calls weather API
    const getData = async (
      lat: number,
      lon: number,
      country: string
    ) => {
      try {
        setLoading(true);

        const data = await getWeatherAPI(lat, lon, country);

        // changes background:
        const bg = getWeatherBackground(
          data?.current.weather[0],
          night
        );
        setBackgroundImg(bg);

        // data formatting before displaying in components
        setApiData(dataFormatter(data));
        console.log(data);

        //sets moonphase for every component
        setMoonPhase(data?.daily[0].moon_phase as number);

        // end loading
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    // initial condition
    getData(latForAPI, longForAPI, locationForAPI);

    // focus on input
    inputRef.current?.focus();
  }, [latForAPI, locationForAPI, longForAPI, night]);

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
      <main
        className="app"
        style={{
          backgroundImage: `url(${backgroundImg}`,
          color: `${UIColor}`
        }}
      >
        <div className="dataTogglingArea strong">
          <button
            onClick={toggleRealTimeData}
            style={{ color: `${UIColor}` }}
          >
            Home/Current Weather |
          </button>

          <button
            onClick={toggleMinuteData}
            style={{ color: `${UIColor}` }}
          >
            Minute forecast |
          </button>
          <button
            onClick={toggleHourlyData}
            style={{ color: `${UIColor}` }}
          >
            Hourly forecast |
          </button>
          <button
            onClick={toggleDailyData}
            style={{ color: `${UIColor}` }}
          >
            Daily forecast
          </button>
        </div>

        {/*Loading SVG*/}
        {loading ? <Loading /> : null}

        {showSearchModal ? (
          <div className="searchForm">
            <form onSubmit={handleClick}>
              <input
                placeholder="Search a location..."
                onChange={handleInputChange}
                ref={inputRef}
              />
              <button onClick={handleClick} className="searchBtn">
                <Search svgColors={svgColors} />
              </button>
              {loadingSearch ? <Loading /> : null}
            </form>
          </div>
        ) : null}

        {/* Conditional render so we wait for the API data*/}
        {apiData && showRealTimeModal ? (
          <RealTimeData
            apiData={apiData}
            locationToShow={locationToShow}
            loading={loading}
            night={night}
            moonPhase={moonPhase}
            svgColors={svgColors}
          />
        ) : null}

        {showMinutelyModal && apiData?.minutely ? (
          <Suspense fallback={<Loading />}>
            <MinutelyData
              minuteData={apiData.minutely}
              setShowMinutelyModal={setShowMinutelyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
            />
          </Suspense>
        ) : null}

        {showHourlyModal && apiData?.hourly ? (
          <Suspense fallback={<Loading />}>
            <HourlyData
              hourlyData={apiData.hourly}
              setShowHourlyModal={setShowHourlyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              moonPhase={moonPhase}
              svgColors={svgColors}
            />
          </Suspense>
        ) : null}

        {showDailyModal && apiData?.daily ? (
          <Suspense fallback={<Loading />}>
            <DailyData
              dailyData={apiData.daily}
              setShowDailyModal={setShowDailyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              moonPhase={moonPhase}
              svgColors={svgColors}
            />
          </Suspense>
        ) : null}
      </main>
    </motion.div>
  );
};

export default App;
