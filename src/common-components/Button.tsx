import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/button.scss";
import Div from "./Div";
import {Text} from "react-native";
const Button: React.FC<PropsWithChildren<{ className?: any, onClick?: ()=> void, text?: string, style2?: boolean}>> = ({children, className = null, onClick, text, style2}) => {
    const style = [ style2 ? styles.buttonStyle2 : styles.button, className];
    const textEl = text == null ? null : <Text style={styles.buttonText}>{text}</Text>
    return <Div className={style} onClick={onClick}>{textEl}{children}</Div>;
}

export default Button;