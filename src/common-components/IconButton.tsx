import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/icon-button.scss";
import Div from "./Div";
import {faOm} from "@fortawesome/free-solid-svg-icons/faOm";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {StyleProp, ViewStyle} from "react-native";

type Prop = PropsWithChildren<{
    className?: StyleProp<ViewStyle>,
    iconClassName?: StyleProp<ViewStyle>,
    onClick?: ()=> void,
    icon?: IconDefinition,
    size?: number
}>;

function Button({children, className = null, iconClassName = null, onClick, icon=faOm, size=20}: Prop){
    const style = [styles.iconButton, className];
    const iconStyle = [styles.icon, iconClassName];
    return <Div className={style} onClick={onClick}>
        {children}
        <FontAwesomeIcon style={iconStyle} icon={icon} size={size}/>
    </Div>;
}

export default Button;