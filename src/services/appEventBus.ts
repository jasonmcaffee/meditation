import {IDurationUpdateData} from "./stopwatch";
import {createObserverProxy} from "./EventBus";
import IMeditationSession from "../models/IMeditationSession";

class AppEvents{
    stopwatchDuration = {} as IDurationUpdateData;
    meditationSessionRepositorySave = {} as IMeditationSession
    meditationSessionRepository = {
        meditationSessionsChanged: [] as IMeditationSession[]
    }
}

const appEventBus = createObserverProxy(new AppEvents());
export default appEventBus;

