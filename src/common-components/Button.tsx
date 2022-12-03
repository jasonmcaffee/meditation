import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/button.scss";
import Div from "./Div";
import {StyleProp, Text, ViewStyle} from "react-native";

type Props = PropsWithChildren<{
    className?: StyleProp<ViewStyle>,
    onClick?: ()=> void,
    text?: string,
    style2?: boolean
}>;

function Button({children, className = null, onClick, text, style2}: Props){
    const style = [ style2 ? styles.buttonStyle2 : styles.button, className];
    const textEl = text == null ? null : <Text style={styles.buttonText}>{text}</Text>
    return <Div className={style} onClick={onClick}>{textEl}{children}</Div>;
}

export default Button;