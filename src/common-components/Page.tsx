import React, {PropsWithChildren, ReactNode, useRef} from "react";
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
// @ts-ignore
import * as styles from "../style/common-components/page.scss";
import Div from "./Div";
import {SafeAreaView, ScrollView, Text} from "react-native";
import BottomNavigation from "./BottomNavigation";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList>;
type RootStackParamList = {};

const Page: React.FC<PropsWithChildren<{currentPage: string, className?: any, modal?: ReactNode}>> = ({currentPage, children, className = null, modal}) => {
    const bottom = StaticSafeAreaInsets?.safeAreaInsetsBottom ?? 10;
    const bottomPosition = {bottom};
    const bottomStyle = {...styles.bottomNavigation, ...bottomPosition};
    return <SafeAreaView style={styles.page}>
        {modal}
        <Div className={styles.pageContent}>
            {children}
        </Div>
        <Div className={styles.bottomNavigationSpace}/>
        <BottomNavigation currentPage={currentPage} className={bottomStyle}/>
    </SafeAreaView>
}

export default Page;