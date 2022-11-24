import stopwatch, {IDurationUpdateData} from "./stopwatch";
import audioPlayer, {soundFiles} from "./audioPlayer";
import {useState} from "react";
import FinishSessionModal from "../components/time-page/FinishSessionModal";
import IMeditationSession from "../models/IMeditationSession";
import meditationSessionRepository, {MeditationSessionRepository} from "../repository/meditationSessionRepository";

class TimePage{
    isStopWatchRunning = false;
    setAlarmMinutes = (m: number) => {};
    setIsAlarmEnabled = (s: boolean) => {};
    setFinishSessionModal = (s: boolean) => {};
    setSoundSettingsModal = (s: boolean) => {};
    setMeditationSession = (s?: IMeditationSession) => {};
    minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; //todo: 60 minutes here makes 1 hour and 60 minutes.
    hourOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    meditationSession?: IMeditationSession;
    async startPauseStopwatch(){
        // audioPlayer.playChime();
        audioPlayer.playFile(soundFiles.metalBowlStrikeHard2Gong);
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

    getDurationData(){
        return stopwatch.getDurationData();
    }

    useShouldDisplayFinishSessionModal(){
        const [shouldDisplayFinishSessionModal, setFinishSessionModal] = useState(false);
        this.setFinishSessionModal = (s) => setFinishSessionModal(s);
        return shouldDisplayFinishSessionModal;
    }
    useShouldDisplaySoundSettingsModal(){
        const [shouldDisplaySoundSettingsModal, setShouldDisplaySoundSettingsModal] = useState(false);
        this.setSoundSettingsModal = (s) => setShouldDisplaySoundSettingsModal(s);
        return shouldDisplaySoundSettingsModal;
    }
    useMeditationSession(){
        const [meditationSession, setMeditationSession] = useState<IMeditationSession>();
        this.setMeditationSession = (m) => setMeditationSession(m);
        return meditationSession;
    }

    useIsAlarmEnabled(){
        const [isAlarmEnabled, setIsAlarmEnabled] = useState(stopwatch.isAlarmEnabled);
        this.setIsAlarmEnabled = function(val){
            stopwatch.isAlarmEnabled = val;
            console.log(`isAlarmEnabled: `, stopwatch.isAlarmEnabled);
            setIsAlarmEnabled(val);
        }
        return isAlarmEnabled;
    }

    useAlarmMinutes(){
        const [alarmMinutes, setAlarmMinutes] = useState(stopwatch.alarmMinutes);
        this.setAlarmMinutes = function(minutes){
            console.log(`setAlarmMinutes: ${minutes}`);
            stopwatch.setAlarmMinutes(minutes);
            this.setIsAlarmEnabled(stopwatch.isAlarmEnabled);
            setAlarmMinutes(stopwatch.alarmMinutes);
        }
        return alarmMinutes;
    }

    setAlarmMinutesFromHoursAndMinutes(hours: number, minutes: number){
        const value = (hours * 60) + minutes;
        console.log(`set hours: ${hours}  minutes: ${minutes} totalMinutes: ${value}`);
        this.setAlarmMinutes(value);
    }

    closeFinishSessionModal(){
        this.setFinishSessionModal(false);
    }
    closeSoundSettingsModal(){
        this.setSoundSettingsModal(false);
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