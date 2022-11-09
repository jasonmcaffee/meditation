import React, {useEffect} from 'react';
import { useColorScheme, } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimePage from "./src/components/time-page/TimePage";
import TestPage from "./src/components/TestPage";
import MeditationSessionsPage from "./src/components/meditation-sessions-page/MeditationSessionsPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };

  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name={"Timer"}  component={TimePage} options={{ headerShown: false }} />
              <Stack.Screen name={"Test"}  component={TestPage} options={{ headerShown: false }} />
              <Stack.Screen name={"Sessions"}  component={MeditationSessionsPage} options={{ headerShown: false }} />

          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
