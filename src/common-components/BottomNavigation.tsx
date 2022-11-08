import React from 'react';
import {View, Text, Button} from "react-native";
import Div from "./Div";
// @ts-ignore
import * as styles from '../style/common-components/bottom-navigation.scss';
const BottomNavigation = ({navigate}: {navigate: (to: string) => void}) =>{
    return (
        <Div className={styles.bottomNavigation}>
            <Div onClick={()=> navigate('Test')}>
                <Text style={styles.bottomNavigationText}>Test</Text>
            </Div>
        </Div>
    )
}

export default BottomNavigation;