import {Platform} from "react-native";

const soundFilesIos = {
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
};

const soundFilesAndroid = {
    chimeGentlePaced: 'chime_gentle_paced.mp3',
    chimeMediumPace: 'chime_medium_paced.mp3',
    chimeMediumSingle: 'chime_medium_single.mp3',
    metalBowlSingGoodLongWooden: 'metal_bowl_sing_good_long_wooden.mp3',
    metalBowlSingQuiet: 'metal_bowl_sing_quiet.mp3',
    metalBowlStrikeHard2Gong: 'metal_bowl_strike_hard2_gong.mp3',
    metalBowlStrikeMedium7Deep: 'metal_bowl_strike_medium7_deep.mp3',
    metalBowlStrikeMedium18Vibrato: 'metal_bowl_strike_medium18_vibrato.mp3',
    metalBowlStrikeSoft6: 'metal_bowl_strike_soft6.mp3',
    chime: 'chime.mp3',
}

export const soundFiles = Platform.OS == 'ios' ? soundFilesIos : soundFilesAndroid;

const soundFilesArray = Object.entries(soundFilesIos).map(([key, value]) => value);