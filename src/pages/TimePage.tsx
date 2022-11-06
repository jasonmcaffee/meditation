import React, {type PropsWithChildren, useEffect, useState} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';

// @ts-ignore
import TimePageStyles from '../style/pages/time-page.scss';
import timer from "../services/timer";

const Section: React.FC<PropsWithChildren<{ title: string; }>> = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text style={[ styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black, }, ]}>
                {title}
            </Text>
            <Text style={[ styles.sectionDescription,  {  color: isDarkMode ? Colors.light : Colors.dark, }, ]}>
                {children}
            </Text>
        </View>
    );
};

const TimePage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };

    const [timeString, setTimeString] = useState(timer.getFormattedTime());
    const defaultUnregisterOnDurationUpdated = () => () => { console.log(`nope`)}; //has to be wrapped with additional function for useState to work.
    const [unregisterOnDurationUpdated, setUnregisterOnDurationUpdated] = useState(defaultUnregisterOnDurationUpdated);
    const [startPauseText, setStartPauseText] = useState('Start');

    function startPauseTimer(){
        if(timer.isRunning){//should pause
            setStartPauseText('Start');
            unregisterOnDurationUpdated();
        }else{//should start
            setStartPauseText('Pause');
            const unregister = timer.onDurationUpdated((durationUpdateData) => {
                setTimeString(durationUpdateData.formattedDuration);
            });
            setUnregisterOnDurationUpdated(() => unregister);
        }
        timer.startPause();
    }

    function resetTimer(){
        setStartPauseText('Start');
        timer.reset();
        unregisterOnDurationUpdated();
        setUnregisterOnDurationUpdated(defaultUnregisterOnDurationUpdated);
    }

    // useEffect(()=>{
    //     return () => {
    //     }
    // });

    return (
        <SafeAreaView style={backgroundStyle}>
            {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />*/}
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={ {backgroundColor: 'black'}}>

                <View style={TimePageStyles.timePage}>
                    <Section title="Timer">
                        <Button title={startPauseText} onPress={startPauseTimer}></Button>
                        <Button title={"Reset"} onPress={resetTimer}></Button>
                        <Text>Time: {timeString}</Text>

                    </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default TimePage;
