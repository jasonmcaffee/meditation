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


const App = () => {
    const [currentPage, setCurrentPage] = useState("Timer");
    let page = <TimePage/>;
    if(currentPage == "Sessions"){
        page = <MeditationSessionsPage/>
    }

    useEffect(()=>{
        return appEventBus.navigation.goToPage().on(page => {
            setCurrentPage(page);
        })
    }, []);
  return (
      <Div>
          {page}
      </Div>

  );
};
export default App;