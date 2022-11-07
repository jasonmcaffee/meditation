/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimePage from "./src/pages/TimePage";
import TrackPlayer, {Event} from "react-native-track-player";

const Stack = createNativeStackNavigator();

async function playbackService(){
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
}

TrackPlayer.registerPlaybackService(() => playbackService);

// const chimeTrack = {
//     url: require('./assets/chime.mp3'), // Load media from the file system - no spaces allowed !!
//     title: 'Chime',
//     artist: 'Jason McAffee',
//     // Load artwork from the file system:
//     artwork: require(`./artwork/jhana icon.png`),
//     duration: 15
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };

  async function setupTrackPlayer(){
      try{
          await TrackPlayer.setupPlayer();
          // await TrackPlayer.add([chimeTrack]);
      }catch(e){
          console.log(`error setting up trackplayer: `, e);
      }
  }
  useEffect(()=>{
      setupTrackPlayer();
      return ()=>{
          TrackPlayer.pause();
      }
  }, []);
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name={"Timer"}  component={TimePage} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
