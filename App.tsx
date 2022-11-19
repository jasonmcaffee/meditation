import React, {useEffect} from 'react';
import { useColorScheme, } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimePage from "./src/components/time-page/TimePage";
import TestPage from "./src/components/TestPage";
import MeditationSessionsPage from "./src/components/meditation-sessions-page/MeditationSessionsPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import meditationSessionRepository from "./src/repository/meditationSessionRepository";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };
  const screenOptions = { headerShown: false, tabBarStyle:{display: 'none'} };

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

/**
 * <NavigationContainer>
 *           <Stack.Navigator>
 *               <Stack.Screen name={"Timer"}  component={TimePage} options={{ headerShown: false }} />
 *               <Stack.Screen name={"Sessions"}  component={MeditationSessionsPage} options={{ headerShown: false }} />
 *           </Stack.Navigator>
 *       </NavigationContainer>
 */