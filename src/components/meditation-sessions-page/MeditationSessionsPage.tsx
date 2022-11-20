import React, {Component, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, Text, TextInput, Animated} from 'react-native';
import Div from "../../common-components/Div";
import {RectButton, Swipeable} from "react-native-gesture-handler";
import Button from "../../common-components/Button";
// @ts-ignore
import * as styles from '../../style/components/meditation-page/meditation-sessions-page.scss';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import IMeditationSession from "../../models/IMeditationSession";
import meditationSessionRepository from "../../repository/meditationSessionRepository";
import meditationSession from "../../services/meditationSession";
import Page from "../../common-components/Page";
import MeditationSession from "./MeditationSession";
// @ts-ignore
// type Props = NativeStackScreenProps<RootStackParamList, 'Sessions'>;
type Props = { navigation: {
        navigate: (to: string) => void
    } };
type RootStackParamList = {};

//TODO: Use a flatlist and load as they scroll so that the sessions page loads quickly when there are hundreds of sessions.
//https://github.com/rossbulat/rn-load-more/blob/master/List.js
//https://rossbulat.medium.com/react-native-lists-load-more-by-scrolling-378a1c5f56a6
const MeditationSessionsPage = ({navigation}: Props) => {
    const [meditationSessions, setMeditationSessions] = useState([] as IMeditationSession[]);
    useEffect(()=>{
        refreshMeditationSessions();
        const unregister = meditationSession.registerOnSaveObserver(refreshMeditationSessions);
        return ()=>{
            unregister();
        }
    },[]);

    const onDeleteClicked = async (i: IMeditationSession) => {
        await meditationSession.deleteMeditationSession(i);
        await refreshMeditationSessions();
    };

    const refreshMeditationSessions = async () => {
        console.log(`refresh meditation sessions`);
        const sessions = await meditationSession.getMeditationSessions();
        setMeditationSessions([...sessions]); //must clone array so flatlist gets updated after delete.
    };

    return (
        <Page currentPage={"Sessions"} navigation={navigation}>
            <Div>
                <FlatList onEndReachedThreshold={.5} data={meditationSessions} renderItem={i => { return createSessionEl(i.item, onDeleteClicked)}} keyExtractor={(i) => i.id}/>
            </Div>
        </Page>
    );
};

function createSessionEl(meditationSession: IMeditationSession, onDelete: (i: IMeditationSession)=> Promise<void>){
    return <MeditationSession key={meditationSession.id} meditationSession={meditationSession} onDeleteClick={onDelete}/>
}

export default MeditationSessionsPage;


