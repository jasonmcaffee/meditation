import React, {PropsWithChildren, ReactNode} from "react";
// @ts-ignore
import * as styles from "../style/common-components/page.scss";
import Div from "./Div";
import {SafeAreaView, ScrollView, Text} from "react-native";
import BottomNavigation from "./BottomNavigation";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList>;
type RootStackParamList = {};

const Page: React.FC<PropsWithChildren<{currentPage: string, className?: any, navigation: any, modal?: ReactNode}>> = ({currentPage, children, className = null, navigation, modal}) => {
    // const style = [styles.page, className];

    return <SafeAreaView style={styles.page}>
        {modal}
        <Div className={styles.pageContent}>
            {children}
        </Div>
        <BottomNavigation currentPage={currentPage} className={styles.bottomNavigation} navigate={(to) => {
            //@ts-ignore
            navigation.navigate(to);
        }}/>
    </SafeAreaView>
}

export default Page;