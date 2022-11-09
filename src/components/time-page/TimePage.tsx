import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
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
// @ts-ignore
type Props = NativeStackScreenProps<RootStackParamList, 'Timer'>;
type RootStackParamList = {
    // Home: undefined;
    // Profile: { userId: string };
    // Feed: { sort: 'latest' | 'top' } | undefined;
};
//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

const TimePage = ({route, navigation}: Props) => {
    const [timeString, setTimeString] = useState(timer.getFormattedTime());
    const [startPauseText, setStartPauseText] = useState('Start');

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

    return (
        <Page navigation={navigation}>
            <Div className={styles.timer}>
                <Div className={styles.timerTime}>
                    <Text style={styles.timeText}>{timeString}</Text>
                </Div>
                <Div className={styles.timerButtons}>
                    <Button className={styles.timerButton} onClick={startPauseTimer}><Text>{startPauseText}</Text></Button>
                    <Button className={styles.timerButton} onClick={resetTimer}><Text>Reset</Text></Button>
                </Div>
            </Div>
        </Page>
    );
};

export default TimePage;
