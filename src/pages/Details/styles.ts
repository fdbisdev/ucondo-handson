import { Platform, StyleSheet } from "react-native";

import { SCREEN_HEIGHT, StatusBarManager, colors } from "../../utils/constants";

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.12,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
});

export default styles;