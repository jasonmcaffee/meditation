import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
} from 'react-native';
import Div from "../common-components/Div";
import Button from "../common-components/Button";
// @ts-ignore
import * as styles from '../style/components/time-page/time-page.scss';
import stopwatch from "../services/stopwatch";
import audioPlayer from "../services/audioPlayer";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
// @ts-ignore
type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;
type RootStackParamList = {};

const TestPage = ({route, navigation}: Props) => {
    const [timeString, setTimeString] = useState(stopwatch.getFormattedTime());
    const [startPauseText, setStartPauseText] = useState('Start');

    async function startPauseTimer(){

        audioPlayer.playChime();
        setTimeout(()=>{
            audioPlayer.playChime({volume: .5});
        }, 1000);

        setStartPauseText(stopwatch.isRunning ? `Start` : 'Pause');
        stopwatch.startPause();
    }

    function resetTimer(){
        setStartPauseText('Start');
        stopwatch.reset();
    }

    useEffect(()=>{


        const unregister = stopwatch.onDurationUpdated((durationUpdateData) => {
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
                    <Div className={styles.timerButtons}>
                        <Button className={styles.timerButton} onClick={startPauseTimer}><Text>{startPauseText}</Text></Button>
                    </Div>
                </Div>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TestPage;
