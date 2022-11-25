import React, {useEffect, useState} from 'react';
import TimePage from "./src/components/time-page/TimePage";
import MeditationSessionsPage from "./src/components/meditation-sessions-page/MeditationSessionsPage";
import "react-native-gesture-handler";
import './src/services/audioNotifications';
import "./src/services/appEventBus";

//have a single instance to prevent flash
const timePage = <TimePage/>;
const meditationSessionPage = <MeditationSessionsPage/>;

const App = () => {
  return (
      <React.Fragment>
          {timePage}
          {meditationSessionPage}
      </React.Fragment>
  );
};
export default App;