import appEventBus from "./appEventBus";
import audioPlayer from "./audioPlayer";
import {soundFiles} from "../config/soundFiles";

class AudioNotifications{
    soundFileToPlayAsAlarm?: string = soundFiles.chimeGentlePaced;
    soundFileToPlayOnStartPause?: string = soundFiles.metalBowlStrikeHard2Gong;
    constructor() {
        appEventBus.stopwatch.timerCompleted().on(didComplete => {
            if(this.soundFileToPlayAsAlarm){  audioPlayer.playFile(this.soundFileToPlayAsAlarm); }
        });

        appEventBus.stopwatch.startPauseChange().on(isStart => {
            if(this.soundFileToPlayOnStartPause){ audioPlayer.playFile(this.soundFileToPlayOnStartPause); }
        });
    }
}

const audioNotifications = new AudioNotifications();
export default audioNotifications