
const Sound = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');

//@ts-ignore
function createSound(fileName: string): Sound{
    return new Sound(fileName, Sound.MAIN_BUNDLE, (error: any) =>{
        if(error){
            console.log(`error in creating react native sound`, error);
            return;
        }
    });
}

/**
 * Note: you can't play the same sound instance more than once at a time, but you can play the same sound with multiple instances.
 */
class AudioPlayer{
    //@ts-ignore
    chime: Sound;
    //@ts-ignore
    chime2: Sound;
    count: number = 0;
    constructor() {
        this.chime = createSound('chime.mp3');
        this.chime2 = createSound('chime.mp3');

    }
    async playChime(){
        return playSound(this.chime);
    }
    async playChime2(){
        return playSound(this.chime2);
    }
}

//await this if you want to know when the sound has been played completely. e.g. after 6 seconds.
//@ts-ignore
async function playSound(sound: Sound){
    return new Promise<void>((resolve, reject) => {
        sound.play((success: boolean)=>{
            if(success){
                resolve();
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
