import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TimePage from "./src/components/time-page/TimePage";
import MeditationSessionsPage from "./src/components/meditation-sessions-page/MeditationSessionsPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "react-native-gesture-handler";
import Div from "./src/common-components/Div";
const Tab = createBottomTabNavigator();


const App = () => {
    const [currentPage, setCurrentPage] = useState("Timer");
    const navigation = {
        navigate(to: string){
            setCurrentPage(to);
        }
    }
    let page = <TimePage navigation={navigation} />;
    if(currentPage == "Sessions"){
        page = <MeditationSessionsPage navigation={navigation}/>
    }
  return (
      <Div>
          {page}
      </Div>

  );
};
//
// const App = () => {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator>
//                 <Tab.Screen name={"Timer"}  component={TimePage} options={{ headerShown: false, tabBarStyle:{display: 'none'} }} />
//                 <Tab.Screen name={"Sessions"}  component={MeditationSessionsPage} options={{ headerShown: false,  tabBarStyle:{display: 'none'}, }} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// };
//{/* this causes flashing of bottom tabs --> unmountOnBlur:true */}
export default App;