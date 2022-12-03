## Jhana Meditation App
This is the open source repository for the Jhana Meditation app.

This app provides several features to assist your meditation practice, including:
- Meditation timer
- Session rating and notes so you can track your progress
- All data is stored locally on your device.
- Completely free of cost and ad free.
- Soon to have audio tracks, including guided meditations.

[App Store Link](https://apps.apple.com/us/app/jhana-meditation/id6444243938)

## Code Conventions

### Component Styling
Most styling is done via [react-native-sass-transformer](https://github.com/kristerkari/react-native-sass-transformer), which allows us to do styling in a similar way to web, and also allows us to separate our style related code from the component.

### Eventing
A [custom event bus](https://github.com/jasonmcaffee/meditation/blob/master/src/services/EventBus.ts) is used for event driven development.

The event bus creates a strongly typed proxy that intercepts property access and recursively lazy loads eventing functionality on the object and it's children.

This is useful for reactively updating the ui when state changes.

```javascript
const appEventBus = createObserverProxy({someProperty: string});
//subscribe to someProperty events
appEventBus.someProperty().on((value: string) => console.log('someProperty changed: ${value}'));
//trigger event
appEventBus.someProperty().set('hello');
```

### Page State
Often a component or page can have several pieces of state that can be tedious to setup the boiler plate for.

To help reduce the tediousness, a [custom proxy wrapper](https://github.com/jasonmcaffee/meditation/blob/master/src/react-utils/proxyUseState.ts) is used to setup useState for each property on an object.

Set on the proxied object is intercepted so that the underlying setX of useState is fired.

```javascript
const componentData = {
    countOne: 0,
    countTwo: 0
};

function MyComponent(){
    //normally we'd need to create 4 variables: countOne, setCountOne, countTwo, setCountTwo, but with pageState, we can simply do:
    const state = pageState(componentData);
    return <Div>
        <Div onClick={()=> state.countOne += 1}><Text>Increment Count 1</Text></Div>
        <Div onClick={()=> state.countTwo += 1}><Text>Increment Count 2</Text></Div>
        <Text>Count one: {state.countOne}</Text>
        <Text>Count two: {state.countTwo}</Text>
    </Div>;
}
```

## Setup
This app is written in React Native, with Typescript and SASS.

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

#### Install Assets
For fonts
```shell
npx react-native-assets
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
- Quit Metro and run `npm run ios` again or you will get errors.

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
