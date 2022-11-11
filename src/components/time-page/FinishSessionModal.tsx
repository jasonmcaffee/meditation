import React, {PropsWithChildren} from "react";
import {Text} from 'react-native';
// @ts-ignore
import * as styles from "../../style/components/time-page/finish-session-modal.scss";
import Div from "../../common-components/Div";
import Modal from "../../common-components/Modal";
type Prop = React.FC<PropsWithChildren<{ className?: any, onCloseClick?: ()=> void, }>>;
const FinishSessionModal: Prop = ({children, className = null, onCloseClick}) => {
    const style = [styles.button, className];
    return <Modal onCloseClick={onCloseClick}>
        <Div><Text>Finish Session</Text></Div>
    </Modal>
}

export default FinishSessionModal;