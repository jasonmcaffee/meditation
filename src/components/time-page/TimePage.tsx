import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StyleSheetProperties,  Text, useWindowDimensions} from 'react-native';
import Div from "../../common-components/Div";
import Button from "../../common-components/Button";
import SelectDropdown from 'react-native-select-dropdown'
// import ScrollPicker from 'react-native-wheel-scrollview-picker';
// @ts-ignore
import * as styles from '../../style/components/time-page/time-page.scss';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Page from "../../common-components/Page";
import IconButton from "../../common-components/IconButton";
// @ts-ignore
type Props = NativeStackScreenProps<RootStackParamList, 'Timer'>;
type RootStackParamList = {
    // Home: undefined;
    // Profile: { userId: string };
    // Feed: { sort: 'latest' | 'top' } | undefined;
};
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import timePage from "../../services/timePage";
import Modal from "../../common-components/Modal";
import FinishSessionModal from "./FinishSessionModal";
import {IDurationUpdateData} from "../../services/stopwatch";
import WheelPicker from "react-native-wheely";
import DropDown from "../../common-components/DropDown";
//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

const TimePage = ({route, navigation}: Props) => {
    const [durationData, setDurationData] = useState(timePage.getDurationData());
    const [isStopWatchRunning, setIsStopWatchRunning] = useState(false);
    const screenHeight = useWindowDimensions().height; // Dimensions.get('window').height;
    const screenWidth = useWindowDimensions().width; //Dimensions.get('window').width;
    const shouldShowFinishSessionModal = timePage.useShouldDisplayFinishSessionModal();
    const meditationSession = timePage.useMeditationSession();

    async function startPauseStopwatch(){
        timePage.startPauseStopwatch();
        setIsStopWatchRunning(timePage.isStopWatchRunning);
    }

    function finishSessionClicked(){
        timePage.finishSession();
        setIsStopWatchRunning(timePage.isStopWatchRunning);
    }

    useEffect(()=>{
        const unregister = timePage.onDurationUpdated((durationUpdateData) => {
            setDurationData(durationUpdateData);
        });
        return ()=>{ unregister(); }
    }, []);

    const finishSessionModal = shouldShowFinishSessionModal && meditationSession ? <FinishSessionModal meditationSession={meditationSession} onCloseClick={() => timePage.closeFinishSessionModal()} onSaveClick={(notes, rating) => timePage.saveSession(notes, rating)}/> : null;
    //not possible to calculate with rn css, so have to do it with js.
    const timerTimeStyle = createTimerTimeStyle(screenWidth, screenHeight, styles.timerTime);
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    return (
        <Page navigation={navigation} modal={finishSessionModal}>
            <Div className={styles.timer}>
                <Div className={styles.rowOne}>
                    <Div className={timerTimeStyle}>
                        {createTimeEl(durationData)}
                    </Div>
                </Div>
                <Div className={styles.rowTwo}>

                    <Div className={styles.hoursAndMinutes}>
                        <IconButton icon={faBell} className={styles.bellIconButton} iconClassName={styles.bellIconButtonIcon}/>
                        <DropDown onSelected={()=>{}} data={hours} label={"hours"} className={styles.hours}/>
                        <DropDown onSelected={()=>{}} data={minutes} label={"min"}/>
                    </Div>

                    <Div className={styles.timerButtons}>
                        <Div className={styles.timerButtonsColumn}>
                            <IconButton icon={isStopWatchRunning ? faPause : faPlay} className={styles.timerButton} iconClassName={styles.timerButtonIcon} onClick={startPauseStopwatch}/>
                        </Div>
                        <Div className={styles.timerButtonsColumn}>
                            <Button text={"Finish"} className={styles.timerButton} onClick={finishSessionClicked}/>
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Page>
    );
};

function createTimeEl(durationData: IDurationUpdateData){
    const chars = durationData.formattedDuration.split("");
    const els = chars.map( (c, i) => <Text key={i} adjustsFontSizeToFit style={styles.timeTextChar}>{c}</Text>);
    return <Div className={styles.timeTextCharContainer}>{els}</Div>
}
function createTimerTimeStyle(screenWidth: number, screenHeight: number, timerTimeStyleSheet: StyleSheetProperties){
    //not possible to calculate with rn css, so have to do it with js.
    const circleDiameter = (screenWidth < screenHeight ? screenWidth - 50 : screenHeight - 100);
    return {
        ...timerTimeStyleSheet,
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleDiameter / 2,
    };
}

export default TimePage;
