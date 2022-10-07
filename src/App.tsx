import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useRef,
  useState
} from 'react';
import type { IWeatherData } from '../interfaces';
import { motion } from 'framer-motion';
import getWeatherAPI from './functions/getWeatherAPI';
import dataFormatter from './functions/dataFormatter';
import Loading from './icons/Loading';
import Search from './icons/Search';
import getWeatherBackground from './functions/getWeatherBackground';
import isNight from './functions/isNight';
import getDaysToRender from './functions/getDaysToRender';
import getHoursToRender from './functions/getHoursToRender';
import getGeoAPI from './functions/getGEOApi';
import { analytics } from './functions/firebase';
import RealTimeData from './components/RealTimeData';
import { UnmountClosed } from 'react-collapse';

const App: React.FC = () => {
  //state
  const [apiData, setApiData] = useState<IWeatherData>();
  const [loading, setLoading] = useState(false);
  const [latForAPI, setLatForApi] = useState(-22.854103);
  const [longForAPI, setLonForApi] = useState(-47.048331);
  const [locationForAPI, setLocationForApi] = useState('Campinas, BR');
  const [location, setLocation] = useState<string>('');
  // the concatenated location returned by the GEO Api
  const [locationToShow, setLocationToShow] =
    useState<string>('Campinas, BR');
  const [showMinutelyModal, setShowMinutelyModal] = useState<Boolean>(false);
  const [showHourlyModal, setShowHourlyModal] = useState<Boolean>(false);
  const [showDailyModal, setShowDailyModal] = useState<Boolean>(false);
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
  const [boxShadow, setBoxShadow] =
    useState(`rgba(24, 32, 79, 0.25) 0px 20px 20px, 
    rgba(255, 255, 255, 0.3) 0px 0px 0px 0.1px inset`);
  const [svgColors, setSvgColors] = useState('#f2a708');
  // Updates number of info per screen size
  const [daysToRender, setDaysToRender] = useState(0);
  const [hoursToRender, setHoursToRender] = useState(0);
  // forces rerendering to apply themes
  const [updateRealTime, setUpdateRealTime] = useState(0);
  const [updateHourly, setUpdateHourlyTime] = useState(0);
  // API reloading without F5'ing
  const [shouldReloadAPI, setShouldReloadAPI] = useState(false);
  // togglers
  const [isOpenedSearch, setIsOpenedSearch] = useState(false);
  const [isClosedSearch, setIsClosedSearch] = useState(true);

  //REF
  const inputRef = useRef<HTMLInputElement>(null);

  // code splitting
  const MinutelyData = React.lazy(() => import('./components/MinutelyData'));
  const HourlyData = React.lazy(() => import('./components/HourlyData'));
  const DailyData = React.lazy(() => import('./components/DailyData'));

  //https://devtrium.com/posts/react-typescript-events
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  // updates APIData when clicking
  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    // setLoadingSearch(true);
    const newLoc = await getGeoAPI(location);
    console.log(newLoc);
    // avoids undefined
    if (newLoc) {
      setLatForApi(newLoc.lat);
      setLonForApi(newLoc.lon);
      setLocationForApi(newLoc.country);
      setLocationToShow(`${newLoc.name}, ${newLoc.country}`);
      setLoading(false);
      // setLoadingSearch(false);
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
    const getData = async (lat: number, lon: number, country: string) => {
      try {
        setLoading(true);

        const data = await getWeatherAPI(lat, lon, country);
        console.log(data);

        // sets night based in timezone
        setNight(isNight(data?.timezone as string));

        //sets moonphase for every component
        setMoonPhase(data?.daily[0].moon_phase as number);

        // changes UI color at night
        if (night) {
          setUIColor('#a3e635');
          setModalUIColor('rgb(59, 18, 146, 0.03)');
          setSvgColors('rgb(123, 81, 247)');
          setSeparatorColor('rgba(163, 230, 53, 0.3)');
          setBoxShadow('none');
          setUpdateRealTime((state) => state + 1);
        } else {
          // resets to initial state
          setUIColor('rgb(255, 255, 255)');
          setModalUIColor('rgba(109, 40, 217, 0.18)');
          setSvgColors('#f2a708');
          setSeparatorColor('rgba(55, 6, 135, 0.75)');
          setBoxShadow(`rgba(24, 32, 79, 0.25) 0px 20px 20px, 
    rgba(255, 255, 255, 0.3) 0px 0px 0px 0.1px inset`);
          setUpdateRealTime((state) => state + 1);
        }

        // changes background:
        const bg = getWeatherBackground(data?.current.weather[0], night);
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

    // load GA
    const ga = analytics;

    setDaysToRender(getDaysToRender());
    setHoursToRender(getHoursToRender());
    setUpdateHourlyTime(updateHourly + 1);

    // focus on input
    inputRef.current?.focus();
  }, [latForAPI, locationForAPI, longForAPI, night, shouldReloadAPI]);

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
        <div className="headerContainer">
          <div className="dataTogglingArea">
            <button
              onClick={toggleRealTimeData}
              onMouseEnter={toggleRealTimeData}
              style={{
                color: UIColor,
                backgroundColor: modalUIColor,
                boxShadow: boxShadow
              }}
              className="strong dataToggler"
            >
              Home/Current
            </button>

            <button
              onClick={toggleMinuteData}
              onMouseEnter={toggleMinuteData}
              className="strong dataToggler"
              style={{
                color: UIColor,
                backgroundColor: modalUIColor,
                boxShadow: boxShadow
              }}
            >
              Minutely
            </button>
            <button
              onClick={toggleHourlyData}
              onMouseEnter={toggleHourlyData}
              style={{
                color: UIColor,
                backgroundColor: modalUIColor,
                boxShadow: boxShadow
              }}
              className="strong dataToggler"
            >
              Hourly
            </button>
            <button
              onClick={toggleDailyData}
              onMouseEnter={toggleDailyData}
              style={{
                color: UIColor,
                backgroundColor: modalUIColor,
                boxShadow: boxShadow
              }}
              className="strong dataToggler"
            >
              Daily
            </button>
          </div>
          <>
            {showSearchModal ? (
              <>
                <UnmountClosed isOpened={isOpenedSearch}>
                  <div
                    className="searchForm"
                    style={{
                      backgroundColor: modalUIColor,
                      boxShadow: boxShadow
                    }}
                  >
                    <form onSubmit={handleClick}>
                      <input
                        placeholder="Search a location..."
                        onChange={handleInputChange}
                        ref={inputRef}
                      />

                      <button
                        onClick={handleClick}
                        className="searchBtn"
                        key={updateRealTime}
                      >
                        <Search svgColors={svgColors} />
                      </button>
                    </form>
                  </div>
                </UnmountClosed>
              </>
            ) : null}
          </>
        </div>

        {/* Conditional render so we wait for the API data*/}
        {showRealTimeModal ? (
          <RealTimeData
            apiData={apiData!}
            locationToShow={locationToShow}
            loading={loading}
            night={night}
            moonPhase={moonPhase}
            svgColors={svgColors}
            UIColor={UIColor}
            modalUIColor={modalUIColor}
            key={updateRealTime}
            separatorColor={separatorColor}
            boxShadow={boxShadow}
            setShouldReloadAPI={setShouldReloadAPI}
            setIsClosedSearch={setIsClosedSearch}
            setIsOpenedSearch={setIsOpenedSearch}
            isClosedSearch={isClosedSearch}
          />
        ) : null}

        {showMinutelyModal ? (
          <Suspense fallback={<Loading svgColors={svgColors} />}>
            <MinutelyData
              minuteData={apiData?.minutely}
              setShowMinutelyModal={setShowMinutelyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              svgColors={svgColors}
              boxShadow={boxShadow}
            />
          </Suspense>
        ) : null}

        {showHourlyModal ? (
          <Suspense fallback={<Loading svgColors={svgColors} />}>
            <HourlyData
              hourlyData={apiData?.hourly}
              setShowHourlyModal={setShowHourlyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              moonPhase={moonPhase}
              svgColors={svgColors}
              hoursToRender={hoursToRender}
              key={updateHourly}
              boxShadow={boxShadow}
            />
          </Suspense>
        ) : null}

        {showDailyModal ? (
          <Suspense fallback={<Loading svgColors={svgColors} />}>
            <DailyData
              dailyData={apiData?.daily}
              setShowDailyModal={setShowDailyModal}
              night={night}
              UIColor={UIColor}
              modalUIColor={modalUIColor}
              moonPhase={moonPhase}
              svgColors={svgColors}
              separatorColor={separatorColor}
              daysToRender={daysToRender}
              boxShadow={boxShadow}
            />
          </Suspense>
        ) : null}

        <>{loading ? <Loading svgColors={svgColors} /> : null}</>
      </main>
    </motion.div>
  );
};

export default App;
