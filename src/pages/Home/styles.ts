import { StyleSheet } from "react-native";

import { SCREEN_HEIGHT, StatusBarManager } from "../../utils/constants";

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: '#F0EDF5',
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
    }
});

export default styles;