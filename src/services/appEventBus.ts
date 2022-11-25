import {IDurationUpdateData} from "./stopwatch";
import {createObserverProxy} from "./EventBus";
import IMeditationSession from "../models/IMeditationSession";

class AppEvents{
    stopwatch = {
        durationUpdate: {} as IDurationUpdateData,
        isRunning: false,
        timerCompleted: false
    }
    meditationSessionRepository = {
        meditationSessionsChanged: [] as IMeditationSession[],
    }
    navigation = {
        goToPage: 'Timer'
    }
}

// type TAppEvents = {
//     stopwatch: {
//         durationUpdate: IDurationUpdateData,
//         isRunning: false,
//     },
//     meditationSessionRepository: {
//         meditationSessionsChanged: IMeditationSession[],
//     }
// }

const appEventBus = createObserverProxy(new AppEvents());
// const appEventBus = createObserverProxy({} as TAppEvents);
export default appEventBus;

