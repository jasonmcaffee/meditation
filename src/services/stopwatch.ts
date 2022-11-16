export interface IDurationUpdateData{
    durationMs: number;
    durationSeconds: number;
    formattedDuration: string;
}

class Stopwatch {
    notifyDurationUpdated: (durationUpdateData: IDurationUpdateData) => void = ()=>{};

    startTimeMs = 0;
    durationMs = 0; //running total, modified on pause and stop.
    notifyIntervalId = 0;
    isRunning = false;

    start(){
        this.isRunning = true;
        this.startTimeMs = Date.now();
        this.notifyIntervalId = setInterval(()=> {
            this.notifyDurationUpdated(getDurationDataFromDurationMs(this.getCurrentDurationMs()));
        }, 100);
    }

    pause(){
        this.isRunning = false;
        this.durationMs += Date.now() - this.startTimeMs; //count all the time that has passed.
        clearInterval(this.notifyIntervalId);
    }

    startPause(){
        if(this.isRunning){
            this.pause();
        }else{
            this.start();
        }
    }

    reset(){
        this.pause();
        this.durationMs = 0;
        this.startTimeMs = 0;
        this.notifyDurationUpdated(getDurationDataFromDurationMs(0));
    }

    getCurrentDurationMs(){
        if(this.startTimeMs === 0){ return 0; }
        return (Date.now() - this.startTimeMs) + this.durationMs;
    }

    getStartTimeMs = ()=> this.startTimeMs

    /**
     * return HH:MM:SS formatted time
     */
    getFormattedTime(){
        return getDurationDataFromDurationMs(this.durationMs).formattedDuration;
    }
    onDurationUpdated(notifyDurationUpdated: (durationUpdateData: IDurationUpdateData) => void){
        this.notifyDurationUpdated = notifyDurationUpdated;
        return () => {
            console.log(`unregistered`);
            this.notifyDurationUpdated = () => {};
        }
    }

}

function getDurationDataFromDurationMs(durationMs: number): IDurationUpdateData {
    const durationSeconds = durationMs / 1000;
    // const days = Math.floor(durationSeconds / 86400);
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor(durationSeconds / 60) % 60;
    const seconds = Math.floor(durationSeconds % 60);
    return {
        durationMs,
        durationSeconds,
        formattedDuration: `${zeroFormat(hours)}:${zeroFormat(minutes)}:${zeroFormat(seconds)}`,
    };
}

function zeroFormat(time: number){
    return time > 9 ? time : `0${time}`;
}

const stopwatch = new Stopwatch();
export default stopwatch;