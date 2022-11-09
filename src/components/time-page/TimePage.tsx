import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView, StyleSheet, StyleSheetProperties,
    Text,
    // Dimensions,
    useWindowDimensions
} from 'react-native';
import Div from "../../common-components/Div";
import Button from "../../common-components/Button";
// @ts-ignore
import * as styles from '../../style/components/time-page/time-page.scss';
import timer from "../../services/timer";
import audioPlayer from "../../services/audioPlayer";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import BottomNavigation from "../../common-components/BottomNavigation";
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
//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

const TimePage = ({route, navigation}: Props) => {
    const [timeString, setTimeString] = useState(timer.getFormattedTime());
    const [startPauseText, setStartPauseText] = useState('Start');
    const screenHeight = useWindowDimensions().height; // Dimensions.get('window').height;
    const screenWidth = useWindowDimensions().width; //Dimensions.get('window').width;
    async function startPauseTimer(){
        // await audioPlayer.playChime();
        audioPlayer.playChime();
        setTimeout(()=>{
            audioPlayer.playChime({volume: .5});
        }, 1000);

        setStartPauseText(timer.isRunning ? `Start` : 'Pause');
        timer.startPause();
    }

    function resetTimer(){
        setStartPauseText('Start');
        timer.reset();
    }

    useEffect(()=>{
        const unregister = timer.onDurationUpdated((durationUpdateData) => {
            setTimeString(durationUpdateData.formattedDuration);
        });
        return ()=>{
            unregister();
        }
    }, []);

    //not possible to calculate with rn css, so have to do it with js.
    const timerTimeStyle = createTimerTimeStyle(screenWidth, screenHeight, styles.timerTime);
    return (
        <Page navigation={navigation}>
            <Div className={styles.timer}>
                <Div className={timerTimeStyle}>
                    <Text style={styles.timeText}>{timeString}</Text>
                </Div>
                <Div className={styles.timerButtons}>
                    <Div className={styles.timerButtonsColumn}>
                        <IconButton icon={timer.isRunning ? faPause : faPlay} className={styles.timerButton} iconClassName={styles.timerButtonIcon} onClick={startPauseTimer}/>
                    </Div>
                    <Div className={styles.timerButtonsColumn}>
                        <Button className={styles.timerButton} onClick={resetTimer}><Text>Finish</Text></Button>
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
