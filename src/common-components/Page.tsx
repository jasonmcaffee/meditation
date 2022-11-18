import React, {PropsWithChildren} from "react";
// @ts-ignore
import * as styles from "../style/common-components/page.scss";
//@ts-ignore
import * as common from "../style/common.scss";
import Div from "./Div";
import {SafeAreaView, ScrollView, Text} from "react-native";
import BottomNavigation from "./BottomNavigation";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList>;
type RootStackParamList = {};

const Page: React.FC<PropsWithChildren<{ className?: any, navigation: any}>> = ({children, className = null, navigation}) => {
    const s = common.common
    const style = [styles.page, className];
    return <SafeAreaView style={style}>
        <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
            {children}
            <Div className={styles.bottomSpace}></Div>
        </ScrollView>
        <BottomNavigation navigate={(to) => {
            //@ts-ignore
            navigation.navigate(to);
        }}/>
    </SafeAreaView>
}

export default Page;