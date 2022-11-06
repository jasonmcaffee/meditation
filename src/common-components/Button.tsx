import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/button.scss";
import Div from "./Div";
const Button: React.FC<PropsWithChildren<{ className?: any, onClick?: ()=> void, }>> = ({children, className = null, onClick}) => {
    const style = [styles.button, className];
    return <Div className={style} onClick={onClick}>{children}</Div>;
}

export default Button;