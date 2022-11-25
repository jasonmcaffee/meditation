import React, {PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
// @ts-ignore
import * as styles from "../style/common-components/page.scss";
import Div from "./Div";
import {SafeAreaView, ScrollView, Text} from "react-native";
import BottomNavigation from "./BottomNavigation";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import appEventBus from "../services/appEventBus";
type Props = NativeStackScreenProps<RootStackParamList>;
type RootStackParamList = {};

const Page: React.FC<PropsWithChildren<{pageName: string, className?: any, modal?: ReactNode}>> = ({pageName, children, className = null, modal}) => {
    const bottom = StaticSafeAreaInsets?.safeAreaInsetsBottom ?? 10;
    const bottomPosition = {bottom};
    const bottomStyle = {...styles.bottomNavigation, ...bottomPosition};
    const [currentPageName, setCurrentPageName] = useState(appEventBus.navigation.goToPage().get());
    const style = currentPageName == pageName ? {} : {display: 'none'};
    // const style = {};
    const pageStyle = {...styles.page, ...style};
    useEffect(()=>{
        const unreg = appEventBus.navigation.goToPage().on(setCurrentPageName);
        return () => unreg();
    }, [])
    return <SafeAreaView style={pageStyle}>
        {modal}
        <Div className={styles.pageContent}>
            {children}
        </Div>
        <Div className={styles.bottomNavigationSpace}/>
        <BottomNavigation className={bottomStyle}/>
    </SafeAreaView>
}

export default Page;