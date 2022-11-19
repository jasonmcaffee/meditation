import stopwatch, {IDurationUpdateData} from "./stopwatch";
import audioPlayer from "./audioPlayer";
import {useState} from "react";
import FinishSessionModal from "../components/time-page/FinishSessionModal";
import IMeditationSession from "../models/IMeditationSession";
import meditationSessionRepository, {MeditationSessionRepository} from "../repository/meditationSessionRepository";

class TimePage{
    isStopWatchRunning = false;
    setFinishSessionModal = (s: boolean) => {};
    setMeditationSession = (s?: IMeditationSession) => {};
    meditationSession?: IMeditationSession;
    async startPauseStopwatch(){
        audioPlayer.playChime();
        setTimeout(()=>{
            audioPlayer.playChime({volume: .5});
        }, 1000);
        stopwatch.startPause();
        this.isStopWatchRunning = stopwatch.isRunning;

        // await meditationSessionRepository.deleteAll();
        //
        // const sessions: IMeditationSession[] = [];
        // for(let i = 0; i < 1000; ++i){
        //     sessions.push({
        //         durationMs: 1000000,
        //         rating: 5,
        //         notes: 'good session fellas really enjoyed the whole thing maybe next time ill be here and youll be there you know. ---' + i,
        //         dateMs: Date.now() + i,
        //         id: (Date.now() + i).toString()
        //     });
        // }
        //
        // for(let session of sessions){
        //     await meditationSessionRepository.saveMeditationSession(session);
        // }
        // await meditationSessionRepository.getDataContainer(true);
    }

    onDurationUpdated(notifyDurationUpdated: (durationUpdateData: IDurationUpdateData) => void){
        return stopwatch.onDurationUpdated(notifyDurationUpdated);
    }

    //when the finish button is pressed, show a modal and prompt for notes, rating, etc.
    finishSession(){
        const durationMs = stopwatch.getCurrentDurationMs();
        const createdDateMs = stopwatch.getStartTimeMs();
        stopwatch.reset();
        this.isStopWatchRunning = stopwatch.isRunning;
        this.meditationSession = createMeditationSessionBasedOnDurationData(durationMs, createdDateMs);
        this.setMeditationSession(this.meditationSession);
        //show modal
        this.setFinishSessionModal(true);
    }

    async saveSession(notes: string, rating: number){
        if(!this.meditationSession) { return console.warn('no meditation session was set to save'); }
        this.meditationSession.notes = notes;
        this.meditationSession.rating = rating;

        await meditationSessionRepository.saveMeditationSession(this.meditationSession);
        this.meditationSession = undefined;
        this.setMeditationSession(this.meditationSession);
    }

    getFormattedTime(){
        return stopwatch.getFormattedTime();
    }

    getDurationData(){
        return stopwatch.getDurationData();
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

    closeFinishSessionModal(){
        this.setFinishSessionModal(false);
    }
}

function createMeditationSessionBasedOnDurationData(durationMs: number, dateMs: number){
    const meditationSession: IMeditationSession = {
        id: Date.now().toString(),
        durationMs,
        dateMs,
        notes: '',
        rating: 0,
    };
    return meditationSession;

}

const timePage = new TimePage();
export default timePage;

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}