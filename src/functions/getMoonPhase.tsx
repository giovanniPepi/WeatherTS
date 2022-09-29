/* daily.moon_phase Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.  */

import FirstQuarterMoon from 'src/icons/FirstQuarterMoon';
import FullMoon from 'src/icons/FullMoon';
import LastQuarterMoon from 'src/icons/LastQuarterMoon';
import NewMoon from 'src/icons/NewMoon';
import WaningCrescentMoon from 'src/icons/WaningCrescent';
import WaningGibbousMoon from 'src/icons/WaningGibbous';
import WaxingCrescentMoon from 'src/icons/WaxingCrescentMoon';
import WaxingGibousMoon from 'src/icons/WaxingGibbous';

const getMoonPhase = (moonPhase: number) => {
  switch (true) {
    case moonPhase >= 0 && moonPhase < 0.1:
      return <NewMoon />;
    case moonPhase >= 0.13 && moonPhase < 0.2:
      return <WaxingCrescentMoon />;
    case moonPhase >= 0.2 && moonPhase < 0.3:
      return <FirstQuarterMoon />;
    case moonPhase >= 0.3 && moonPhase < 0.45:
      return <WaxingGibousMoon />;
    case moonPhase >= 0.45 && moonPhase < 0.6:
      return <FullMoon />;
    case moonPhase >= 0.6 && moonPhase < 0.7:
      return <WaningGibbousMoon />;
    case moonPhase >= 0.7 && moonPhase < 0.85:
      return <LastQuarterMoon />;
    case moonPhase >= 0.85 && moonPhase < 0.95:
      return <WaningCrescentMoon />;
    case moonPhase >= 0.95:
      return <NewMoon />;
  }
};

export default getMoonPhase;
