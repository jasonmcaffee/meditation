import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TimePage from "./src/components/time-page/TimePage";
import MeditationSessionsPage from "./src/components/meditation-sessions-page/MeditationSessionsPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "react-native-gesture-handler";
const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Tab.Navigator screenOptions={{}}>
              <Tab.Screen name={"Timer"}  component={TimePage} options={{ headerShown: false, tabBarStyle:{display: 'none'} }} />
              <Tab.Screen name={"Sessions"}  component={MeditationSessionsPage} options={{ headerShown: false,  tabBarStyle:{display: 'none'}, unmountOnBlur:true }} />
          </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;