import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/modal.scss";
import Div from "../common-components/Div";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";
import IconButton from "./IconButton";
import {useWindowDimensions} from "react-native";
// import {BlurView} from "react-native-blur";

type Prop = React.FC<PropsWithChildren<{
    className?: any,
    onCloseClick?: ()=> void,
    windowClassName?: any,
    showCloseButton?: boolean,
}>>;
const Modal: Prop = ({children, className = null, windowClassName = null, onCloseClick, showCloseButton = true}) => {
    const screenHeight = useWindowDimensions().height; // Dimensions.get('window').height;
    const screenWidth = useWindowDimensions().width; //Dimensions.get('window').width;
    const sizeStyle = {height: screenHeight, width: screenWidth};
    const style = [styles.modal, sizeStyle, className];
    const closeButton = showCloseButton ? <IconButton icon={faClose} onClick={onCloseClick} className={styles.modalCloseButton} iconClassName={styles.modalCloseButtonIcon} size={35}/> : null;
    return <Div className={style} onClick={onCloseClick} >
        <Div className={[styles.modalWindow, windowClassName]}>
            {closeButton}
            {children}
        </Div>
    </Div>;
}

export default Modal;