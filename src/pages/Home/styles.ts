import { StyleSheet } from "react-native";

import { SCREEN_HEIGHT, StatusBarManager, colors } from "../../utils/constants";

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: colors.secondary,
        marginTop: StatusBarManager.HEIGHT + 55,
        marginHorizontal: 21,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        height: 56,
        paddingLeft: 26
    },
    searchIcon: {
        marginRight: 18,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,    
    },
    searchInput: {
        color: colors.placeholder,
    }
});

export default styles;