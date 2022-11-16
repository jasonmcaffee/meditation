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
}>>;
const Modal: Prop = ({children, className = null, windowClassName = null, onCloseClick}) => {
    const screenHeight = useWindowDimensions().height; // Dimensions.get('window').height;
    const screenWidth = useWindowDimensions().width; //Dimensions.get('window').width;
    const sizeStyle = {height: screenHeight, width: screenWidth};
    const style = [styles.modal, sizeStyle, className];
    return <Div className={style}>
        {/*<BlurView blurType={"light"} style={styles.blurView}/>*/}
        <Div className={[styles.modalWindow, windowClassName]}>
            <IconButton icon={faClose} onClick={onCloseClick} className={styles.modalCloseButton} iconClassName={styles.modalCloseButtonIcon}/>
            {children}
        </Div>
    </Div>;
}

export default Modal;