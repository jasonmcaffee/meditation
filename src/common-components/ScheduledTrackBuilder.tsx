import React, {PropsWithChildren} from "react";
import {Pressable, StyleProp, View, ViewStyle} from "react-native";
//@ts-ignore
import * as styles from '../style/common-components/scheduled-track-builder.scss';
import ScheduledTrack from "../models/ScheduledTrack";
import ScheduledSoundBuilder from "./ScheduledSoundBuilder";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

type Prop = {
    scheduledTrack: ScheduledTrack
};

function ScheduledTrackBuilder({scheduledTrack}: Prop) {
    return <View></View>
}

export default ScheduledTrackBuilder;