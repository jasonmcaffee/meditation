import audioPlayer, {S, createSound} from "../services/audioPlayer";
import {ISoundOption} from "../config/soundFiles";

type Options = {
    shouldLoop?: boolean,
    playEveryNms?: number,
    soundOption: ISoundOption,
    volume?: number,
    playImmediately?: boolean;
    // delayMs?: number, //eventually wait N ms before playing the first time.
}

export default class ScheduledSound {
    shouldLoop?: boolean;
    playEveryNms?: number;
    nextIntervalMs?: number;
    intervalId?: ReturnType<typeof setInterval>;
    soundOption: ISoundOption;
    volume: number;
    currentSound: S;
    lastIntervalTimeMs: number = 0;
    playImmediately = false;

    constructor({shouldLoop, playEveryNms, soundOption, volume = 1, playImmediately=false}: Options) {
        this.shouldLoop = shouldLoop;
        this.playEveryNms = playEveryNms;
        this.soundOption = soundOption;
        this.volume = volume;
        this.nextIntervalMs = this.playEveryNms;
        this.playImmediately = playImmediately;
    }

    async play(){
        if(this.playEveryNms){
            if(this.playImmediately || this.nextIntervalMs !== this.playEveryNms){
                this.currentSound = this.currentSound || await audioPlayer.playFile(this.soundOption.file, this.volume, this.shouldLoop);
                this.currentSound.play();
            }
            console.log(`Play: nextIntervalMs: ${this.nextIntervalMs}`);
            this.lastIntervalTimeMs = Date.now();
            this.intervalId = setInterval(async () => {
                this.lastIntervalTimeMs = Date.now();
                this.currentSound = await audioPlayer.playFile(this.soundOption.file, this.volume);

                //check if we are resuming from a pause, which is indicated by the nextIntervalMs differing from playEveryNms.
                if(this.nextIntervalMs !== this.playEveryNms){
                    this.nextIntervalMs = this.playEveryNms; //reset if we have changed next due to pause.
                    clearInterval(this.intervalId); //the current interval time is only valid the first time.
                    this.play();
                }
            }, this.nextIntervalMs);
        } else if(this.shouldLoop){
            //we may have paused, so don't recreate the sound.
            this.currentSound = this.currentSound || await audioPlayer.playFile(this.soundOption.file, this.volume, this.shouldLoop);
            this.currentSound.play();
        }
        console.log(`currentSound: `, this.currentSound);
    }

    async pause(){
        this.currentSound?.pause();
        if(this.playEveryNms){
            clearInterval(this.intervalId);
            const timeSinceLastInterval = Date.now() - this.lastIntervalTimeMs;
            this.nextIntervalMs = this.playEveryNms - timeSinceLastInterval;
            console.log(`Pause: timeSinceLastInterval: ${timeSinceLastInterval}  lastIntervalTimeMs: ${this.lastIntervalTimeMs} nextIntervalMs: ${this.nextIntervalMs}`);
        }
    }

    stop(){
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.currentSound?.stop();
        this.currentSound = undefined;
        this.lastIntervalTimeMs = 0;
    }
}

