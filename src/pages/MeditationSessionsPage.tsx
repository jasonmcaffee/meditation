import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, Text,} from 'react-native';
import Div from "../common-components/Div";
import Button from "../common-components/Button";
// @ts-ignore
import * as styles from '../style/pages/meditation-sessions-page.scss';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import BottomNavigation from "../common-components/BottomNavigation";
import IMeditationSession from "../models/IMeditationSession";
import meditationSessionRepository from "../repository/meditationSessionRepository";
import meditationSession from "../services/meditationSession";
import {getFormattedDate, getFormattedDuration} from "../models/IMeditationSession";
// @ts-ignore
type Props = NativeStackScreenProps<RootStackParamList, 'Sessions'>;
type RootStackParamList = {};

const MeditationSessionsPage = ({route, navigation}: Props) => {
    const [meditationSessions, setMeditationSessions] = useState([] as IMeditationSession[]);
    useEffect(()=>{
        meditationSessionRepository.getMeditationSessions().then((sessions)=>{
            console.log(`meditation sessions: `, sessions);
            setMeditationSessions(sessions);
        });
    }, []);
    const sessionEls = createSessionEls(meditationSessions);
    return (
        <SafeAreaView style={styles.meditationSessionsPage}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Div>
                    <Div>
                        <Text>Meditation Session History</Text>
                    </Div>
                    <Div>
                        {sessionEls}
                    </Div>
                    <Div onClick={async ()=>{
                        await meditationSession.createAndSaveMeditationSession(15 * 60 * 1000, `good stuff`);
                        //await meditationSessionRepository.saveMeditationSession(session);
                        console.log(`meditation added`);
                        meditationSessionRepository.getMeditationSessions().then(setMeditationSessions);
                    }}>
                        <Text>Create test session</Text>
                    </Div>
                </Div>
                <BottomNavigation navigate={(to) => {
                    //@ts-ignore
                    navigation.navigate(to);
                }}/>
            </ScrollView>
        </SafeAreaView>
    );
};

function createSessionEls(meditationSessions: IMeditationSession[]){
    return meditationSessions.map(createSessionEl);
}

function createSessionEl(meditationSession: IMeditationSession){
    return <Div key={meditationSession.id}>
        <Text>Date: {getFormattedDate(meditationSession.dateMs)}</Text>
        <Text>Duration: { getFormattedDuration(meditationSession.durationMs)}</Text>
        <Text>Notes: {meditationSession.notes}</Text>
    </Div>
}

export default MeditationSessionsPage;
