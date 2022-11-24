import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TimePage from "./src/components/time-page/TimePage";
import MeditationSessionsPage from "./src/components/meditation-sessions-page/MeditationSessionsPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "react-native-gesture-handler";
import Div from "./src/common-components/Div";
import './src/services/audioNotifications';
import appEventBus from "./src/services/appEventBus";
//something needs to include this
const Tab = createBottomTabNavigator();

// const TimePageMemo = React.memo(TimePage);
// const MeditationSessionsPageMemo = React.memo(MeditationSessionsPage);
//have a single instance to prevent flash
const timePage = <TimePage/>;
const meditationSessionPage = <MeditationSessionsPage/>;

const App = () => {
    const [currentPage, setCurrentPage] = useState("Timer");
    let page = timePage;
    if(currentPage == "Sessions"){
        page = meditationSessionPage;
    }

    useEffect(()=>{
        return appEventBus.navigation.goToPage().on(page => {
            setCurrentPage(page);
        })
    }, []);
  return (
      <React.Fragment>
          {page}
      </React.Fragment>

  );
};
export default App;