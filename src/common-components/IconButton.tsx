import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/icon-button.scss";
import Div from "./Div";
import {faOm} from "@fortawesome/free-solid-svg-icons/faOm";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
const Button: React.FC<PropsWithChildren<{ className?: any, onClick?: ()=> void, icon?: IconDefinition, size?: number}>> = ({children, className = null, onClick, icon=faOm, size=20}) => {
    const style = [styles.iconButton, className];
    return <Div className={style} onClick={onClick}>
        {children}
        <FontAwesomeIcon style={styles.icon} icon={icon} size={size}/>
    </Div>;
}

export default Button;