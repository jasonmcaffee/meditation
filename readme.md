## Meditation
Meditation timer, tracker, and guided meditation app, provided completely free and without ads.

## Setup
### ios
#### Install Xcode and command line tools
#### Install cocoapods
```shell
brew install cocoapods
```
#### Install pods
```shell
cd ios && pod install && cd ..
```
### React Native

## Running
### Development on simulator
```shell
npm run ios
```

## Add sound files
Sound files are embedded, and audio is played using https://github.com/johnsonsu/react-native-sound-player



### Development on a real phone
Open the ios/meditation.xcworkspace project (not the xcodeproj), and select your device in the dropdown, then click the play button.

Add sound files to iOS/Android.
- On iOS, drag and drop sound file into project in Xcode. Remember to check "Copy items if needed" option and "Add to targets".
- On Android, put sound files in {project_root}/android/app/src/main/res/raw/. Just create the folder if it doesn't exist.
- Import the library and call the playSoundFile(fileName, fileType) function:
```shell
import SoundPlayer from 'react-native-sound-player'
try {
  // play the file tone.mp3
  SoundPlayer.playSoundFile('tone', 'mp3')
} catch (e) {
  console.log(`cannot play the sound file`, e)
}
```
