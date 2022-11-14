import React, {PropsWithChildren, useEffect, useState} from "react";
import {Text, TextInput} from 'react-native';
// @ts-ignore
import * as styles from "../../style/components/time-page/finish-session-modal.scss";
import Div from "../../common-components/Div";
import Modal from "../../common-components/Modal";
import IMeditationSession from "../../models/IMeditationSession";
type Prop = React.FC<PropsWithChildren<{
    className?: any,
    onCloseClick?: ()=> void,
    meditationSession: IMeditationSession,
}>>;
const FinishSessionModal: Prop = ({meditationSession, children, className = null, onCloseClick}) => {
    const style = [styles.button, className];
    const [notes, setNotes] = useState<string>(meditationSession.notes);

    return <Modal onCloseClick={onCloseClick}>
        <Div><Text>Finish Session {meditationSession.durationMs}</Text></Div>
        <Div>
            <Text>Notes</Text>
            <TextInput value={notes} onChangeText={setNotes}/>
        </Div>
    </Modal>
}

export default FinishSessionModal;