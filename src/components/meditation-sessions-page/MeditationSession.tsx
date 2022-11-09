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
        <Div className={styles.rowOne}>
            <Text style={styles.date}>{getFormattedDate(meditationSession.dateMs)}</Text>
            <Text style={styles.duration}>{ getFormattedDuration(meditationSession.durationMs)}</Text>
            <IconButton className={styles.deleteButton} icon={faTrash} onClick={()=> onDeleteClick(meditationSession)}/>
        </Div>
        <Div className={styles.rowTwo}>
            <Text style={styles.notes}>{meditationSession.notes}</Text>
        </Div>
    </Div>;
}

export default MeditationSession;