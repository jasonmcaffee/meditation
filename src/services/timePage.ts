import stopwatch, {IDurationUpdateData} from "./stopwatch";
import audioPlayer from "./audioPlayer";
import {useState} from "react";
import FinishSessionModal from "../components/time-page/FinishSessionModal";
import IMeditationSession from "../models/IMeditationSession";

class TimePage{
    isStopWatchRunning = false;
    setFinishSessionModal = (s: boolean) => {};
    setMeditationSession = (s: IMeditationSession) => {};
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
        const durationMs = stopwatch.getCurrentDurationMs();
        const createdDateMs = stopwatch.getStartTimeMs();
        stopwatch.reset();
        this.isStopWatchRunning = stopwatch.isRunning;
        const meditationSession = createMeditationSessionBasedOnDurationData(durationMs, createdDateMs);
        this.setMeditationSession(meditationSession);
        //show modal
        this.setFinishSessionModal(true);
    }
    getFormattedTime(){
        return stopwatch.getFormattedTime();
    }

    useShouldDisplayFinishSessionModal(){
        const [shouldDisplayFinishSessionModal, setFinishSessionModal] = useState(false);
        this.setFinishSessionModal = (s) => setFinishSessionModal(s);
        return shouldDisplayFinishSessionModal;
    }
    useMeditationSession(){
        const [meditationSession, setMeditationSession] = useState<IMeditationSession>();
        this.setMeditationSession = (m) => setMeditationSession(m);
        return meditationSession;
    }
}

function createMeditationSessionBasedOnDurationData(durationMs: number, dateMs: number){
    const meditationSession: IMeditationSession = {
        id: Date.now().toString(),
        durationMs,
        dateMs,
        notes: '',
    };
    return meditationSession;

}

const timePage = new TimePage();
export default timePage;