import React, {PropsWithChildren} from "react";
import {TouchableOpacity} from "react-native";

const Div: React.FC<PropsWithChildren<{ className?: any, onClick?: ()=> void, }>> = ({children, className = null, onClick}) => {
    // return <View style={className}>{children}</View>;
    return <TouchableOpacity onPress={onClick} activeOpacity={1} style={className}>{children}</TouchableOpacity>;
}

export default Div;