import '../css/RealTimeData.css';
import { RealTimeDataProps } from 'interfaces';
import React, { useEffect, useState } from 'react';
import Alert from 'src/icons/Alerts';
import { LazyMotion, m } from 'framer-motion';
import getWeatherIcon from 'src/functions/getWeatherIcon';
import getMoonPhase from 'src/functions/getMoonPhase';
import FeelsLike from 'src/icons/FeelsLike';
import Humidity from 'src/icons/Humidity';
import Clouds from 'src/icons/Clouds';
import Windy from 'src/icons/Windy';
import DewPoint from 'src/icons/DewPoint';
import Pressure from 'src/icons/Pressure';
import Visibility from 'src/icons/Visibility';
import Rain from 'src/icons/Rain';
import Snow from 'src/icons/Snow';
import Sunny from 'src/icons/Sunny';
import UVI from 'src/icons/UVI';
import AlertsModal from './AlertOverlay';
import TickingOneSecond from 'src/functions/TickingOneSecond';
import TitleAnimation from 'src/functions/TitleAnimation';
import getHour from 'src/functions/getHour';
import getMinute from 'src/functions/getMinute';
import Tooltip from '@material-ui/core/Tooltip';
import WeatherDescAnimation from 'src/functions/WeatherDescAnimation';
import NetworkError from 'src/icons/NetworkError';
import AlertAnimation from 'src/functions/AlertAnimation';
import Reload from 'src/icons/Reload';
import ReloadSpinning from 'src/icons/ReloadSpinning';
import More from 'src/icons/More';
import Less from 'src/icons/Less';
import { UnmountClosed } from 'react-collapse';
import Search from 'src/icons/Search';
import Loading from 'src/icons/Loading';
import Separator from './Separator';

// dealing with objects as props, they must have their own interface:
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm
const RealTimeData: React.FC<RealTimeDataProps> = ({
  apiData,
  locationToShow,
  loading,
  night,
  moonPhase,
  UIColor,
  svgColors,
  modalUIColor,
  separatorColor,
  boxShadow,
  setShouldReloadAPI,
  setIsOpenedSearch,
  isOpenedSearch,
  handleClick,
  handleInputChange,
  firstRender
}) => {
  //state
  const [showAlertsModal, setShowAlertsModal] = useState<Boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [hour, sethour] = useState<number>(0);
  const [showReloadSpinner, setShowReloadSpinner] = useState(false);

  // react-collapse
  const [isOpenedSun, setIsOpenedSun] = useState(false);
  const [isClosedSun, setIsClosedSun] = useState(true);
  const [isOpenedMoon, setIsOpenedMoon] = useState(false);
  const [isClosedMoon, setIsClosedMoon] = useState(true);
  const [isOpenedAtmos, setIsOpenedAtmos] = useState(false);
  const [isClosedAtmos, setIsClosedAtmos] = useState(true);

  const loadFeatures = () =>
    import('../functions/features.js').then((res) => res.default);

  useEffect(() => {
    const getRealTime = () => {
      const myInterval = setInterval(() => {
        const currentMinute = getMinute(apiData?.timezone);
        const currentHour = getHour(apiData?.timezone);
        sethour(currentHour as number);
        setMinutes(currentMinute as number);
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    };

    getRealTime();
  }, [apiData]);

  if (apiData === undefined) {
    return (
      <>
        {firstRender ? null : (
          <m.div
            className="realTimeData"
            initial={{ opacity: 0 }}
            style={{
              backgroundColor: modalUIColor,
              boxShadow: boxShadow
            }}
            animate={{
              opacity: 1
            }}
            transition={{ duration: 0.8 }}
            exit={{
              opacity: 0,
              x: window.innerWidth
            }}
          >
            <>
              <NetworkError svgColors={svgColors} />
              <div className="apiDataError">
                Couldn't get API data. Check your connection or try again
                later.
                <div></div>
              </div>
            </>
          </m.div>
        )}
      </>
    );
  }

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        className="realTimeData"
        initial={{ opacity: 0 }}
        style={{ backgroundColor: modalUIColor, boxShadow: boxShadow }}
        animate={{
          opacity: 1
        }}
        transition={{ duration: 1 }}
        exit={{
          opacity: 0,
          x: window.innerWidth
        }}
      >
        <div className="dailyDt strong" style={{ color: UIColor }}>
          <div className="titleContainer">
            {loading ? null : (
              <div className="cityInfo">
                {locationToShow}
                <div className="tickingTime">
                  {hour} <TickingOneSecond /> {minutes}
                </div>
              </div>
            )}
          </div>
          <div className="tempContainer homeTempContainer">
            <div className="currentTemp">
              <TitleAnimation
                title={apiData.current.temp}
                UIColor={UIColor}
              />
              <div className="btnHolder">
                <div className="searchReloadDiv">
                  {showReloadSpinner ? (
                    <ReloadSpinning svgColors={svgColors} />
                  ) : (
                    <button
                      onClick={() => {
                        setShowReloadSpinner(true);
                        setShouldReloadAPI(true);
                      }}
                      onTouchEnd={(e) => {
                        // prevents mobile keyboard from opening up
                        e.preventDefault();

                        setShowReloadSpinner(true);
                        setShouldReloadAPI(true);
                      }}
                      className="apiReloader"
                    >
                      <Reload svgColors={svgColors} />
                    </button>
                  )}
                </div>
                <div
                  onClick={() => {
                    setIsOpenedSearch((state) => !state);
                  }}
                  className="searchReloadDiv"
                >
                  <Search svgColors={svgColors} />
                </div>
              </div>
            </div>
            <div className="currentInfoCont">
              <div className="feelsLike">
                {apiData.current.rain ? (
                  <>
                    <div className="moonTimings">
                      <Tooltip title="Rain volume" placement="left-start">
                        <div className="rainDiv">
                          <Rain svgColors={svgColors} />
                          {apiData.current.rain['1h']}/h
                        </div>
                      </Tooltip>
                    </div>
                  </>
                ) : null}
                <div className="rainDiv">
                  <FeelsLike svgColors={svgColors} />
                  {apiData.current.feels_like}
                </div>
              </div>
              {/*gets the weather icon through getMoonphase to return the correct phase if it's night */}
              <div className="weatherdescCont">
                {getWeatherIcon(
                  apiData.current.weather[0].main,
                  night,
                  moonPhase,
                  svgColors
                )}
                {loading ? null : (
                  <div className="weatherDescRain">
                    <WeatherDescAnimation
                      title={apiData.current.weather[0].description}
                      UIColor={UIColor}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <>
          <>
            <UnmountClosed
              isOpened={isOpenedSearch}
              theme={{
                collapse: 'searchTogglerClosed',
                content: 'searchTogglerOpened'
              }}
            >
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
                    ref={(input) => {
                      input && input.focus();
                    }}
                  />
                  <button onClick={handleClick} className="searchBtn">
                    <Search svgColors={svgColors} />
                  </button>
                </form>
              </div>
            </UnmountClosed>
          </>
        </>
        <Separator separatorColor={separatorColor} />

        <div className="realTimeDataDiv">
          <Humidity svgColors={svgColors} />
          <div>{apiData.current.humidity}</div>
        </div>
        <Separator separatorColor={separatorColor} />

        {typeof apiData.current.uvi === 'string' ? (
          <>
            <div className="realTimeDataDiv">
              <UVI svgColors={svgColors} />
              <div>{apiData.current.uvi}</div>
            </div>

            <Separator separatorColor={separatorColor} />
          </>
        ) : null}
        <div className="realTimeDataDiv">
          <Clouds svgColors={svgColors} />
          <div>{apiData.current.clouds}</div>
        </div>
        <Separator separatorColor={separatorColor} />

        {/* conditional rendering for rain and snow */}
        {apiData.current.snow ? (
          <>
            <div className="realTimeDataDiv">
              <Snow svgColors={svgColors} />
              <div className="moonTimings">
                <Tooltip title="Snow volume" placement="left-start">
                  <div>{apiData.current.snow['1h']} - last hour</div>
                </Tooltip>
                <Tooltip title="Snow volume" placement="left-start">
                  <div>
                    {apiData.current.snow['3h']
                      ? `${apiData.current.snow['3h']} - last 3 hours`
                      : null}
                  </div>
                </Tooltip>
              </div>
            </div>

            <Separator separatorColor={separatorColor} />
          </>
        ) : null}
        <div className="realTimeDataDiv">
          <Windy svgColors={svgColors} />
          <div className="windContainer">
            <div>{apiData.current.wind_speed as number}</div> -
            <div>{apiData.current.wind_deg as number}</div>
          </div>
        </div>
        <Separator separatorColor={separatorColor} />

        <div className="realTimeDataDiv moreToggler">
          <div className="moonTimings" style={{ color: UIColor }}></div>
        </div>
        <UnmountClosed isOpened={isClosedSun}>
          <div
            className="realTimeDataDiv moreToggler"
            onClick={() => {
              setIsClosedSun((state) => !state);
              setIsOpenedSun((state) => !state);
            }}
          >
            <More svgColors={svgColors} />
            <Tooltip title="Sunrise and sunset time" placement="left-start">
              <div className="moonTimings">
                <Sunny />
              </div>
            </Tooltip>
          </div>
        </UnmountClosed>
        <UnmountClosed isOpened={isOpenedSun}>
          <div>
            <div
              onClick={() => {
                setIsClosedSun((state) => !state);
                setIsOpenedSun((state) => !state);
              }}
            >
              <Less svgColors={svgColors} />
            </div>
            <Tooltip title="Sunrise and sunset time" placement="right-start">
              <div className="realTimeDataDiv">
                <Sunny />
                <div className="moonTimings">
                  <div>{apiData.current.sunrise}</div>
                  <div>{apiData.current.sunset}</div>
                </div>
              </div>
            </Tooltip>
          </div>
        </UnmountClosed>
        <Separator separatorColor={separatorColor} />

        <UnmountClosed isOpened={isClosedMoon}>
          <div
            className="realTimeDataDiv"
            onClick={() => {
              setIsClosedMoon((state) => !state);
              setIsOpenedMoon((state) => !state);
            }}
          >
            <More svgColors={svgColors} />
            <div className="moonTimings">
              {getMoonPhase(
                apiData.daily[0].moon_phase as number,
                svgColors
              )}
            </div>
          </div>
          <Separator separatorColor={separatorColor} />
        </UnmountClosed>
        <UnmountClosed isOpened={isOpenedMoon}>
          <div>
            <div
              onClick={() => {
                setIsClosedMoon((state) => !state);
                setIsOpenedMoon((state) => !state);
              }}
              className="realTimeSubDataSvg"
            >
              <Less svgColors={svgColors} />
            </div>
            <div className="realTimeDataDiv">
              {getMoonPhase(
                apiData.daily[0].moon_phase as number,
                svgColors
              )}
              <Tooltip
                title="Moonrise and moonset time"
                placement="right-start"
              >
                <div className="moonTimings">
                  <div>{apiData.daily[0].moonrise}</div>
                  <div>{apiData.daily[0].moonset}</div>
                </div>
              </Tooltip>
            </div>
          </div>
          <Separator separatorColor={separatorColor} />
        </UnmountClosed>
        <UnmountClosed isOpened={isClosedAtmos}>
          <div
            className="realTimeDataDiv"
            onClick={() => {
              setIsClosedAtmos((state) => !state);
              setIsOpenedAtmos((state) => !state);
            }}
          >
            <More svgColors={svgColors} />
            <div className="moonTimings">
              <p>Atmospheric Info</p>
            </div>
          </div>

          <Separator separatorColor={separatorColor} />
        </UnmountClosed>
        <UnmountClosed isOpened={isOpenedAtmos}>
          <div
            onClick={() => {
              setIsClosedAtmos((state) => !state);
              setIsOpenedAtmos((state) => !state);
            }}
            className="realTimeSubDataSvg"
          >
            <Less svgColors={svgColors} />
          </div>
          <div className="realTimeSubDataHolder">
            <Tooltip
              title="Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form"
              placement="bottom"
            >
              <div className="realTimeDataDiv">
                <DewPoint svgColors={svgColors} />
                <div>{apiData.current.dew_point}</div>
              </div>
            </Tooltip>
            <Separator separatorColor={separatorColor} />

            <Tooltip
              title="Atmospheric pressure on the sea level"
              placement="bottom"
            >
              <div className="realTimeDataDiv">
                <Pressure svgColors={svgColors} />
                <div>{apiData.current.pressure}</div>
              </div>
            </Tooltip>

            <Separator separatorColor={separatorColor} />

            <Tooltip
              title="Average visibility. The maximum value of the visibility is 10km"
              placement="bottom"
            >
              <div className="realTimeDataDiv">
                <Visibility svgColors={svgColors} />
                <div>{apiData.current.visibility}</div>
              </div>
            </Tooltip>

            <Separator separatorColor={separatorColor} />
          </div>
        </UnmountClosed>
        {apiData.alerts && showAlertsModal ? (
          <AlertsModal
            apiData={apiData}
            setShowAlertsModal={setShowAlertsModal}
            UIColor={UIColor}
          />
        ) : null}
        {apiData.alerts ? (
          <Tooltip
            title="Alerts for the current location, and alerter name"
            placement="left-start"
          >
            <button
              className="alertBtnHome"
              onClick={() => setShowAlertsModal(true)}
            >
              <Alert />
              <AlertAnimation
                title={`${apiData.alerts[0].sender_name}`}
                UIColor={UIColor}
              />
            </button>
          </Tooltip>
        ) : null}
      </m.div>
    </LazyMotion>
  );
};

export default RealTimeData;
