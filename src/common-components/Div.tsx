import React, {PropsWithChildren} from "react";
import {Pressable} from "react-native";

const Div: React.FC<PropsWithChildren<{ className?: any, onClick?: ()=> void, }>> = ({children, className = null, onClick}) => {
    return <Pressable onPress={onClick} style={className}>{children}</Pressable>;
}

export default Div;