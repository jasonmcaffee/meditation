const Sound = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');
//@ts-ignore use an alias due to TS having issue with value being same name as type Sound
type S = Sound;

export const soundFiles = {
    chimeGentlePaced: 'chime-gentle-paced.mp3',
    chimeMediumPace: 'chime-medium-paced.mp3',
    chimeMediumSingle: 'chime-medium-single.mp3',
    metalBowlSingGoodLongWooden: 'metal-bowl-sing-good-long-wooden.mp3',
    metalBowlSingQuiet: 'metal-bowl-sing-quiet.mp3',
    metalBowlStrikeHard2Gong: 'metal-bowl-strike-hard2-gong.mp3',
    metalBowlStrikeMedium7Deep: 'metal-bowl-strike-medium7-deep.mp3',
    metalBowlStrikeMedium18Vibrato: 'metal-bowl-strike-medium18-vibrato.mp3',
    metalBowlStrikeSoft6: 'metal-bowl-strike-soft6.mp3',
    chime: 'chime.mp3',
}

function createSound(fileName: string): Promise<S>{
    return new Promise<S>((resolve, reject)=>{
       let s = new Sound(fileName, Sound.MAIN_BUNDLE, (error: any) =>{
           if(error){
               console.log(`error in creating react native sound`, error);
               return reject(error);
           }
           resolve(s);
       });
    });
}

/**
 * Note: you can't play the same sound instance more than once at a time, but you can play the same sound with multiple instances.
 */
class AudioPlayer{
    chime: S;

    constructor() {}

    async playChime({volume} = {volume: 1}){
        return this.playFile( soundFiles.chimeGentlePaced, volume);
    }

    // async playFile({volume, fileName} = {volume: 1, fileName: 'chime.mp3'}): Promise<S>{
    async playFile(fileName:string, volume = 1): Promise<S>{
        const sound = await createSound(fileName);
        sound.setVolume(volume);
        return playSound(sound);
    }
}

//await this if you want to know when the sound has been played completely. e.g. after 6 seconds.
async function playSound(sound: S){
    // return sound.play(); <-- not a promise.
    return new Promise<S>((resolve, reject) => {
        sound.play((success: boolean)=>{
            if(success){
                resolve(sound);
            }else{
                reject();
            }
        })
    });
}



const audioPlayer = new AudioPlayer();
export default audioPlayer;

//TrackPlayer is useful for guided meditations.
//another option that's setup in this project.
//Can only play one sound at a time though, but does show the sound on the lock screen, along with artwork.
//import TrackPlayer, {Event} from "react-native-track-player";
// async function playbackService(){
//     TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
//     TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
// }
//
// TrackPlayer.registerPlaybackService(() => playbackService);
//
// const chimeTrack = {
//     url: require('../../assets/chime.mp3'), // Load media from the file system.  No spaces allowed!
//     title: 'Chime',
//     artist: 'Jason McAffee',
//     // Load artwork from the file system:
//     artwork: require(`../../artwork/jhana icon.png`),
//     duration: 6
// };
// await TrackPlayer.setupPlayer();
// await TrackPlayer.add([chimeTrack]);
// await TrackPlayer.setVolume(1);
// let trackIndex = await TrackPlayer.getCurrentTrack();
// let trackObject = await TrackPlayer.getTrack(trackIndex!);
// console.log(`Title: ${trackObject?.title}`);
// await TrackPlayer.play();
// TrackPlayer.pause();
// TrackPlayer.reset();
