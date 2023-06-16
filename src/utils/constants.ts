import { Dimensions, NativeModules } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const { StatusBarManager } = NativeModules;