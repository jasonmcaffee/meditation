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
// import { useRoute } from '@react-navigation/native';

// @ts-ignore
import * as styles from '../style/common-components/bottom-navigation.scss';
const BottomNavigation = ({navigate, className, currentPage}: {currentPage: string, className?: string, navigate: (to: string) => void}) =>{
    // const currentPage = useRoute().name;
    // console.log(`rendering bottom nav`);
    return (
        <Div className={[styles.bottomNavigation, className]}>
            <Div className={currentPage == "Timer" ? styles.navigationItemActive : styles.navigationItem}  onClick={()=> navigate('Timer')}>
                <FontAwesomeIcon style={currentPage == "Timer" ? styles.navigationIconActive: styles.navigationIcon} icon={faOm} size={30}/>
            </Div>
            <Div className={currentPage == "Sessions" ? styles.navigationItemActive : styles.navigationItem} onClick={()=> navigate('Sessions')}>
                <FontAwesomeIcon style={currentPage == "Sessions" ? styles.navigationIconActive : styles.navigationIcon} icon={faVihara} size={30}/>
            </Div>
        </Div>
    );
}



const MemoizedBottomNavigation = React.memo(BottomNavigation);
// export default BottomNavigation;
export default MemoizedBottomNavigation;

// function areEqual(prevProps, nextProps){
//
// }