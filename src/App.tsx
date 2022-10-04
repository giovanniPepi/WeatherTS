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
  const [moonPhase, setMoonPhase] = useState(0);
  const [UIColor, setUIColor] = useState('rgb(255, 255, 255)');
  const [modalUIColor, setModalUIColor] = useState(
    'rgba(109, 40, 217, 0.18)'
  );
  const [separatorColor, setSeparatorColor] = useState(
    'rgba(55, 6, 135, 0.75)'
  );
  const [svgColors, setSvgColors] = useState('#f2a708');
  // forces rerendering to apply themes
  const [updateRealTime, setUpdateRealTime] = useState(0);

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
    // calls weather API
    const getData = async (
      lat: number,
      lon: number,
      country: string
    ) => {
      try {
        setLoading(true);

        const data = await getWeatherAPI(lat, lon, country);
        console.log(data);

        // sets night based in timezone
        setNight(isNight(data?.timezone as string));

        //sets moonphase for every component
        setMoonPhase(data?.daily[0].moon_phase as number);

        // changes UI color at night
        console.log('isnight app? ', night);

        if (night) {
          setUIColor('#a3e635');
          setModalUIColor('rgb(59, 18, 146, 0.03)');
          setSvgColors('rgb(123, 81, 247)');
          setSeparatorColor('rgb(163, 230, 53, 0.3');
          setUpdateRealTime((state) => state + 1);
        } else {
          // resets to initial state
          setUIColor('rgb(255, 255, 255)');
          setModalUIColor('rgba(109, 40, 217, 0.18)');
          setSvgColors('#f2a708');
          setSeparatorColor('rgba(55, 6, 135, 0.75)');
          setUpdateRealTime((state) => state + 1);
        }

        // changes background:
        const bg = getWeatherBackground(
          data?.current.weather[0],
          night
        );
        setBackgroundImg(bg);

        //finally, sets API data for other components
        setApiData(dataFormatter(data));

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

    console.log(updateRealTime);
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
        <div
          className="dataTogglingArea"
          style={{ backgroundColor: modalUIColor }}
        >
          <button
            onClick={toggleRealTimeData}
            onMouseEnter={toggleRealTimeData}
            style={{
              color: UIColor
            }}
            className="strong"
          >
            Home/Current
          </button>

          <button
            onClick={toggleMinuteData}
            onMouseEnter={toggleMinuteData}
            className="strong"
            style={{ color: `${UIColor}` }}
          >
            Minutely
          </button>
          <button
            onClick={toggleHourlyData}
            onMouseEnter={toggleHourlyData}
            style={{ color: `${UIColor}` }}
            className="strong"
          >
            Hourly
          </button>
          <button
            onClick={toggleDailyData}
            onMouseEnter={toggleDailyData}
            style={{ color: `${UIColor}` }}
            className="strong"
          >
            Daily
          </button>
        </div>

        {/*Loading SVG*/}
        {loading ? <Loading /> : null}

        <div
          className="hiddenSearch"
          onMouseEnter={toggleRealTimeData}
        ></div>
        {showSearchModal ? (
          <div
            className="searchForm"
            style={{ backgroundColor: modalUIColor }}
          >
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
        {showRealTimeModal ? (
          <RealTimeData
            apiData={apiData!}
            locationToShow={locationToShow}
            loading={loading}
            night={night}
            moonPhase={moonPhase}
            svgColors={svgColors}
            modalUIColor={modalUIColor}
            key={updateRealTime}
            separatorColor={separatorColor}
          />
        ) : null}

        {showMinutelyModal ? (
          <Suspense fallback={<Loading />}>
            <MinutelyData
              minuteData={apiData?.minutely}
              setShowMinutelyModal={setShowMinutelyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              svgColors={svgColors}
            />
          </Suspense>
        ) : null}

        {showHourlyModal ? (
          <Suspense fallback={<Loading />}>
            <HourlyData
              hourlyData={apiData?.hourly}
              setShowHourlyModal={setShowHourlyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              moonPhase={moonPhase}
              svgColors={svgColors}
            />
          </Suspense>
        ) : null}

        {showDailyModal ? (
          <Suspense fallback={<Loading />}>
            <DailyData
              dailyData={apiData?.daily}
              setShowDailyModal={setShowDailyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              moonPhase={moonPhase}
              svgColors={svgColors}
              separatorColor={separatorColor}
            />
          </Suspense>
        ) : null}
      </main>
    </motion.div>
  );
};

export default App;
