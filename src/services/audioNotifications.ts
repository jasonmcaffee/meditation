import appEventBus from "./appEventBus";
import audioPlayer, {soundFiles} from "./audioPlayer";

class AudioNotifications{
    soundFileToPlayAsAlarm?: string = soundFiles.chimeGentlePaced;
    constructor() {
        appEventBus.stopwatch.timerCompleted().on(didComplete => {
            if(this.soundFileToPlayAsAlarm){
                audioPlayer.playFile(this.soundFileToPlayAsAlarm);
            }
        });
    }
}

const audioNotifications = new AudioNotifications();
export default audioNotifications