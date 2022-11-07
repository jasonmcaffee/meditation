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

//todo: follow setup: https://github.com/doublesymmetry/react-native-track-player/issues/1468
//https://react-native-track-player.js.org/docs/basics/getting-started
//https://medium.com/@bharat.tiwari/creating-an-audio-player-in-react-native-2628c4262db4

async function playbackService(){
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
}

TrackPlayer.registerPlaybackService(() => playbackService);

const chimeTrack = {
    url: require('../../assets/chime.mp3'), // Load media from the file system.  No spaces allowed!
    title: 'Chime',
    artist: 'Jason McAffee',
    // Load artwork from the file system:
    artwork: require(`../../artwork/jhana icon.png`),
    duration: 6
};

const TimePage = () => {
    const [timeString, setTimeString] = useState(timer.getFormattedTime());
    const [startPauseText, setStartPauseText] = useState('Start');

    async function startPauseTimer(){
        // await TrackPlayer.setupPlayer();
        await TrackPlayer.add([chimeTrack]);
        await TrackPlayer.setVolume(1);
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex!);
        console.log(`Title: ${trackObject?.title}`);
        await TrackPlayer.play();

        setStartPauseText(timer.isRunning ? `${trackObject?.title}` : 'Pause');
        timer.startPause();
    }

    function resetTimer(){
        setStartPauseText('Start');
        timer.reset();
    }

    useEffect(()=>{
        // TrackPlayer.setupPlayer();
        // TrackPlayer.setVolume(1);

        const unregister = timer.onDurationUpdated((durationUpdateData) => {
            setTimeString(durationUpdateData.formattedDuration);
        });
        return ()=>{
            unregister();
            TrackPlayer.pause();
            TrackPlayer.reset();
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
