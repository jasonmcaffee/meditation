import React from 'react';
import {View, Text, Button} from "react-native";
import Div from "./Div";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons/faStopwatch";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import {faCalendar} from "@fortawesome/free-regular-svg-icons/faCalendar";

//dharma wheel
import {faDharmachakra} from "@fortawesome/free-solid-svg-icons/faDharmachakra";
import {faOm} from "@fortawesome/free-solid-svg-icons/faOm";
import {faVihara} from "@fortawesome/free-solid-svg-icons/faVihara";

// @ts-ignore
import * as styles from '../style/common-components/bottom-navigation.scss';
const BottomNavigation = ({navigate, className}: { className?: string, navigate: (to: string) => void}) =>{
    return (
        <Div className={[styles.bottomNavigation, className]}>
            <Div className={styles.navigationItem}  onClick={()=> navigate('Timer')}>
                <FontAwesomeIcon style={styles.navigationIcon} icon={faOm} size={30}/>
            </Div>
            <Div className={styles.navigationItem} onClick={()=> navigate('Sessions')}>
                <FontAwesomeIcon style={styles.navigationIcon} icon={faVihara} size={30}/>
            </Div>
        </Div>
    );
}

export default BottomNavigation;