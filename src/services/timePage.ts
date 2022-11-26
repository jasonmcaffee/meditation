import stopwatch  from "./stopwatch";
import {useState} from "react";
import FinishSessionModal from "../components/time-page/FinishSessionModal";
import IMeditationSession from "../models/IMeditationSession";
import meditationSessionRepository from "../repository/meditationSessionRepository";
import {pageState} from "../react-utils/proxyUseState";

class TimePage{
    isStopWatchRunning = false;
    setAlarmMinutes = (m: number) => {};
    setIsAlarmEnabled = (s: boolean) => {};
    setMeditationSession = (s?: IMeditationSession) => {};
    minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; //todo: 60 minutes here makes 1 hour and 60 minutes.
    hourOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    meditationSession?: IMeditationSession;
    state = {
        selected: 1,
        shouldDisplayFinishSessionModal: false,
        shouldDisplaySoundSettingsModal: false,
        durationData: stopwatch.getDurationData(),
        isStopWatchRunning: stopwatch.isRunning,
        meditationSession: undefined as undefined | IMeditationSession,
    };
    pageState?: TimePage['state']; //I don't want to have to type out this Type somewhere else, so I can just reference the definition place
    usePageState(){
        this.pageState = pageState(this.state);
        return this.pageState;
    }
    async startPauseStopwatch(){
        stopwatch.startPause();
        this.isStopWatchRunning = stopwatch.isRunning;
    }

    //when the finish button is pressed, show a modal and prompt for notes, rating, etc.
    finishSession(){
        const durationMs = stopwatch.getCurrentDurationMs();
        const createdDateMs = stopwatch.getStartTimeMs();
        stopwatch.reset();
        this.isStopWatchRunning = stopwatch.isRunning;
        const meditationSession = createMeditationSessionBasedOnDurationData(durationMs, createdDateMs);
        this.meditationSession = meditationSession;
        // this.setMeditationSession(this.meditationSession);
        this.pageState!.meditationSession = meditationSession;
        //show modal
        this.pageState!.shouldDisplayFinishSessionModal = true;
    }

    async saveSession(notes: string, rating: number){
        if(!this.meditationSession) { return console.warn('no meditation session was set to save'); }
        this.meditationSession.notes = notes;
        this.meditationSession.rating = rating;

        await meditationSessionRepository.saveMeditationSession(this.meditationSession);

        this.meditationSession = undefined;
        // this.setMeditationSession(this.meditationSession);
        this.pageState!.meditationSession = this.meditationSession;

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