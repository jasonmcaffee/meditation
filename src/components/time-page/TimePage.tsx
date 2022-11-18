import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StyleSheetProperties,  Text, useWindowDimensions} from 'react-native';
import Div from "../../common-components/Div";
import Button from "../../common-components/Button";
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
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import timePage from "../../services/timePage";
import Modal from "../../common-components/Modal";
import FinishSessionModal from "./FinishSessionModal";
//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

const TimePage = ({route, navigation}: Props) => {
    const [timeString, setTimeString] = useState(timePage.getFormattedTime());
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
            setTimeString(durationUpdateData.formattedDuration);
        });
        return ()=>{ unregister(); }
    }, []);

    const finishSessionModal = shouldShowFinishSessionModal && meditationSession ? <FinishSessionModal meditationSession={meditationSession} onCloseClick={() => timePage.closeFinishSessionModal()} onSaveClick={(notes, rating) => timePage.saveSession(notes, rating)}/> : null;
    //not possible to calculate with rn css, so have to do it with js.
    const timerTimeStyle = createTimerTimeStyle(screenWidth, screenHeight, styles.timerTime);
    return (
        <Page navigation={navigation}>
            {finishSessionModal}
            <Div className={styles.timer}>
                <Div className={timerTimeStyle}>
                    <Text style={styles.timeText}>{timeString}</Text>
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
        </Page>
    );
};

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
