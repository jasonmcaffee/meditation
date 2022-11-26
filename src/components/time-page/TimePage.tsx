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
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";

import timePage from "../../services/timePage";
import FinishSessionModal from "./FinishSessionModal";
import {IDurationUpdateData} from "../../services/stopwatch";
import DropDown from "../../common-components/DropDown";
import SoundSettingsModal from "./SoundSettingsModal";
import appEventBus from "../../services/appEventBus";
import fileSystem from "../../services/fileSystem";
import RNFS from "react-native-fs";
import ModalSelector from "../../common-components/ModalSelector";
import {proxyUseState, wrappedUseState} from "../../react-utils/proxyUseState";
//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

// const TimePage = ({route, navigation}: Props) => {
const TimePage = () => {
    const [durationData, setDurationData] = useState(timePage.getDurationData());
    const [isStopWatchRunning, setIsStopWatchRunning] = useState(false);
    const screenHeight = useWindowDimensions().height; // Dimensions.get('window').height;
    const screenWidth = useWindowDimensions().width; //Dimensions.get('window').width;
    const shouldShowFinishSessionModal = timePage.useShouldDisplayFinishSessionModal();
    const shouldShowSoundSettingsModal = timePage.useShouldDisplaySoundSettingsModal();
    const meditationSession = timePage.useMeditationSession();
    const isAlarmEnabled = timePage.useIsAlarmEnabled();
    const alarmMinutes = timePage.useAlarmMinutes();
    const {hours, minutes} = convertMinutesToHoursAndMinutes(alarmMinutes);

    async function startPauseStopwatch(){
        timePage.startPauseStopwatch();
    }

    function finishSessionClicked(){
        timePage.finishSession();
        // setIsStopWatchRunning(timePage.isStopWatchRunning);
    }

    useEffect(()=>{
        const unregister = appEventBus.stopwatch.durationUpdate().on(durationUpdateData => {
            setDurationData(durationUpdateData);
        });
        const unreg2 = appEventBus.stopwatch.isRunning().on(setIsStopWatchRunning)
        return ()=>{ unregister(); unreg2(); }
    }, []);

    const finishSessionModal = shouldShowFinishSessionModal && meditationSession ? <FinishSessionModal meditationSession={meditationSession} onCloseClick={() => timePage.closeFinishSessionModal()} onSaveClick={(notes, rating) => timePage.saveSession(notes, rating)}/> : null;
    const soundSettingsModal = shouldShowSoundSettingsModal ? <SoundSettingsModal onCloseClick={() => timePage.closeSoundSettingsModal()}/> : null;
    //not possible to calculate with rn css, so have to do it with js.
    const timerTimeStyle = createTimerTimeStyle(screenWidth, screenHeight, styles.timerTime);
    const minuteOptions = timePage.minuteOptions;
    const hourOptions = timePage.hourOptions;
    const selected = wrappedUseState(1);

    return (
        <Page pageName={'Timer'} modal={finishSessionModal || soundSettingsModal}>
            <Div className={styles.timer}>
                <Div className={styles.rowOne}>
                    <Div className={styles.hoursAndMinutes}>
                        <IconButton icon={faBell} className={styles.bellIconButton} iconClassName={isAlarmEnabled ? styles.bellIconButtonIcon : styles.bellIconButtonIconDisabled}/>
                        <DropDown value={hours} onSelected={(h)=>{ timePage.setAlarmMinutesFromHoursAndMinutes(h, minutes); }} data={hourOptions} label={"hours"} className={styles.hours}/>
                        <DropDown value={minutes} onSelected={(m)=>{ timePage.setAlarmMinutesFromHoursAndMinutes(hours, m); }} data={minuteOptions} label={"min"}/>
                        <IconButton icon={faGear} className={styles.bellIconButton} iconClassName={styles.gearIconButtonIcon} onClick={()=> timePage.setSoundSettingsModal(true) }/>
                    </Div>
                    <Div className={timerTimeStyle}>
                        {createTimeEl(durationData)}
                    </Div>
                </Div>
                <Div className={styles.rowTwo}>
                    {/*<ModalSelector options={[1, 2, 3, 4, 5]} value={selected.get()} onOptionRowClick={o => selected.set(o)} />*/}
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

function convertMinutesToHoursAndMinutes(minutes: number){
    // if(minutes <= 60) { return {hours: 0, minutes: 0}}
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return {hours, minutes: remainingMinutes};
}



export default TimePage;
