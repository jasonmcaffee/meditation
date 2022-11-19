import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TextInput,} from 'react-native';
import Div from "../../common-components/Div";
import Button from "../../common-components/Button";
// @ts-ignore
import * as styles from '../style/pages/meditation-sessions-page.scss';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import IMeditationSession from "../../models/IMeditationSession";
import meditationSessionRepository from "../../repository/meditationSessionRepository";
import meditationSession from "../../services/meditationSession";
import Page from "../../common-components/Page";
import MeditationSession from "./MeditationSession";
// @ts-ignore
type Props = NativeStackScreenProps<RootStackParamList, 'Sessions'>;
type RootStackParamList = {};

//TODO: Use a flatlist and load as they scroll so that the sessions page loads quickly when there are hundreds of sessions.
//https://github.com/rossbulat/rn-load-more/blob/master/List.js
//https://rossbulat.medium.com/react-native-lists-load-more-by-scrolling-378a1c5f56a6
const MeditationSessionsPage = ({route, navigation}: Props) => {
    const [meditationSessions, setMeditationSessions] = useState([] as IMeditationSession[]);
    useEffect(()=>{
        refreshMeditationSessions();
    }, []);

    const onDeleteClicked = async (i: IMeditationSession) => {
        await meditationSession.deleteMeditationSession(i);
        await refreshMeditationSessions(); //TODO: this needs fixing.
    };

    const refreshMeditationSessions = async () => {
        const sessions = await meditationSession.getMeditationSessions();
        setMeditationSessions(sessions);
    };

    const sessionEls = createSessionEls(meditationSessions, onDeleteClicked);
    return (
        <Page navigation={navigation}>
            <Div>
                <ScrollView>
                    {sessionEls}
                </ScrollView>
            </Div>
        </Page>
    );
};

function createSessionEls(meditationSessions: IMeditationSession[], onDelete: (i: IMeditationSession)=> Promise<void>){
    return meditationSessions.map((i) => createSessionEl(i, onDelete));
}

function createSessionEl(meditationSession: IMeditationSession, onDelete: (i: IMeditationSession)=> Promise<void>){
    return <MeditationSession meditationSession={meditationSession} onDeleteClick={onDelete}/>
}

export default MeditationSessionsPage;
