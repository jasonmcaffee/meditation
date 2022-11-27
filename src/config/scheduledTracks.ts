import ScheduledTrack from "../models/ScheduledTrack";
import ScheduledSound from "../models/ScheduledSound";
import {soundOptions} from "./soundFiles";

const scheduledSound1 = new ScheduledSound({soundOption: soundOptions.metalBowlSingQuiet, shouldLoop: true});
const scheduledSound2 = new ScheduledSound({soundOption: soundOptions.metalBowlStrikeSoft6, playEveryNms: 5 * 60 * 1000});
const scheduledSound3 = new ScheduledSound({soundOption: soundOptions.chime, playEveryNms: 4000});


const scheduledTrackNone = new ScheduledTrack();
const scheduledTrack1 = new ScheduledTrack([scheduledSound1, scheduledSound3]);

export interface IScheduledTrackOption {
    value: ScheduledTrack;
    label: string;
}

export const scheduledTrackOptionsArray: IScheduledTrackOption[] = [
    {label: 'None', value: scheduledTrackNone},
    {label: 'Test', value: scheduledTrack1}
]