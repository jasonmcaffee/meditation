import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../../style/components/meditation-page/meditation-session.scss";
import Div from "../../common-components/Div";
import IMeditationSession, {getFormattedDate, getFormattedDuration} from "../../models/IMeditationSession";
import {Text} from "react-native";
import IconButton from "../../common-components/IconButton";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
type Type = React.FC<PropsWithChildren<{
    onDeleteClick: (i: IMeditationSession) => void,
    meditationSession: IMeditationSession,
}>>;

const MeditationSession: Type = ({children, onDeleteClick, meditationSession}) => {
    return <Div key={meditationSession.id} className={styles.meditationSession}>
        <Text>Date: {getFormattedDate(meditationSession.dateMs)}</Text>
        <Text>Duration: { getFormattedDuration(meditationSession.durationMs)}</Text>
        <Text>Notes: {meditationSession.notes}</Text>
        <IconButton icon={faTrash} onClick={()=> onDeleteClick(meditationSession)}/>
    </Div>;
}

export default MeditationSession;