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

## Sound Files

### React Native Sound
For playing multiple sounds at once, React-Native-Sound is used.

Add sound files to iOS/Android.
- On iOS, drag and drop sound file into project in Xcode. Remember to check "Copy items if needed" option and "Add to targets".
- On Android, put sound files in {project_root}/android/app/src/main/res/raw/. Just create the folder if it doesn't exist.

### React Native Track Player
This lib is setup, but not used.  It only can play one track at a time, but it has lock screen display and some other nice functionality that may come in handy later.

Add sound files to ./assets then require('./assets/chime.mp3') and use that as the url.

```javascript
const chimeTrack = {
    url: require('../../assets/chime.mp3'), // Load media from the file system.  No spaces allowed!
}
```

### Development on a real phone
Open the ios/meditation.xcworkspace project (not the xcodeproj), and select your device in the dropdown, then click the play button.


```shell

```
