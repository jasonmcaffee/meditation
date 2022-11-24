import React, {PropsWithChildren, ReactNode} from "react";
// @ts-ignore
import * as styles from "../style/common-components/page.scss";
import Div from "./Div";
import {SafeAreaView, ScrollView, Text} from "react-native";
import BottomNavigation from "./BottomNavigation";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList>;
type RootStackParamList = {};

const Page: React.FC<PropsWithChildren<{currentPage: string, className?: any, modal?: ReactNode}>> = ({currentPage, children, className = null, modal}) => {
    // const style = [styles.page, className];

    return <SafeAreaView style={styles.page}>
        {modal}
        <Div className={styles.pageContent}>
            {children}
        </Div>
        <BottomNavigation currentPage={currentPage} className={styles.bottomNavigation}/>
    </SafeAreaView>
}

export default Page;