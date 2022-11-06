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

const TimePage = () => {
    const [timeString, setTimeString] = useState(timer.getFormattedTime());
    const [startPauseText, setStartPauseText] = useState('Start');

    function startPauseTimer(){
        setStartPauseText(timer.isRunning ? 'Start' : 'Pause');
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
        return unregister;
    })

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
