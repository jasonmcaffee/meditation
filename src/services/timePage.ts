import stopwatch, {IDurationUpdateData} from "./stopwatch";
import audioPlayer from "./audioPlayer";

class TimePage{
    isStopWatchRunning = false;

    startPauseStopwatch(){
        audioPlayer.playChime();
        setTimeout(()=>{
            audioPlayer.playChime({volume: .5});
        }, 1000);
        stopwatch.startPause();
        this.isStopWatchRunning = stopwatch.isRunning;
    }

    onDurationUpdated(notifyDurationUpdated: (durationUpdateData: IDurationUpdateData) => void){
        return stopwatch.onDurationUpdated(notifyDurationUpdated);
    }

    finishSession(){
        stopwatch.reset();
        this.isStopWatchRunning = stopwatch.isRunning;
        //show modal
    }
    getFormattedTime(){
        return stopwatch.getFormattedTime();
    }
}

const timePage = new TimePage();
export default timePage;