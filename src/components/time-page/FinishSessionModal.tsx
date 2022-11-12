import React, {PropsWithChildren} from "react";
import {Text} from 'react-native';
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
    return <Modal onCloseClick={onCloseClick}>
        <Div><Text>Finish Session {meditationSession.durationMs}</Text></Div>
    </Modal>
}

export default FinishSessionModal;