import { Platform, StyleSheet } from "react-native";

import { SCREEN_HEIGHT, StatusBarManager } from "../../utils/constants";

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.12,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: StatusBarManager.HEIGHT,
        marginHorizontal: 22,
    },
    backContainer: {
        flexDirection: 'row',
    },
    backButton: {
        marginRight: 18,
    },
});

export default styles;