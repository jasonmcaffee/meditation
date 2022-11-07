import React, {type PropsWithChildren, useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
} from 'react-native';
import Div from "../common-components/Div";
import Button from "../common-components/Button";
// @ts-ignore
import * as styles from '../style/pages/time-page.scss';
import timer from "../services/timer";
import TrackPlayer, {Event} from 'react-native-track-player';
import * as Track from 'react-native-track-player';
import audioPlayer from "../services/audioPlayer";
const TrackPlayer2 = Track.default;

//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4



const TimePage = () => {
    const [timeString, setTimeString] = useState(timer.getFormattedTime());
    const [startPauseText, setStartPauseText] = useState('Start');

    async function startPauseTimer(){

        // await audioPlayer.playChime();
        audioPlayer.playChime();
        setTimeout(()=>{
            audioPlayer.playChime2();
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
        <SafeAreaView style={styles.timePage}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Div className={styles.timer}>
                    <Div className={styles.timerTime}>
                        <Text style={styles.timeText}>{timeString}</Text>
                    </Div>
                    <Div className={styles.timerButtons}>
                        <Button className={styles.timerButton} onClick={startPauseTimer}><Text>{startPauseText}</Text></Button>
                        <Button className={styles.timerButton} onClick={resetTimer}><Text>Reset</Text></Button>
                    </Div>
                </Div>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TimePage;
