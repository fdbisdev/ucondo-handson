import { Platform, StyleSheet } from "react-native";

import { SCREEN_HEIGHT, StatusBarManager } from "../../utils/constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EDF5',
        flex: 1,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    listHeader: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 28,
    }, 
    listHeaderTitle: {
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        color: '#3D3D4C',
    },
    listHeaderRegisters: {
        color: '#A0A0B2',
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    listElement: {
        marginHorizontal: 22,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginTop: 18,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    listElementTitle: {
        fontSize: 15,
        marginRight: 4,
    },
    listElementHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingVertical: 36,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        height: 242,
        position: 'absolute',
        top: SCREEN_HEIGHT / 2.8,
    }, 
    modalText: {
        marginTop: 24,
    },
    modalHeader: {
        alignItems: 'center',
    }, 
    modalButtons: {
        flexDirection: 'row',
        marginTop: 23,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    modalTitle: {
        fontSize: 15,
        color: '#6C6C80',
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        fontStyle: 'normal',
    }, 
    cancelButton: {
        color: '#FF6680',
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        fontStyle: 'normal',
    },
    cancelButtonContainer: {
        width: 120,
        borderColor: '#FF6680',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 11,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonContainer: {
        backgroundColor: '#FF6680',
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 11,
        marginLeft: 24,
        width: 140,
    }, 
    confirmButton: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        fontStyle: 'normal',
    },
    listHeaderAdded: {
        paddingHorizontal: 23,
        marginTop: 23,
    },
    dropDownPicker: {
        marginTop: 4,
        width: '100%',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderRadius: 10,
        zIndex: 1,
    },
    label: {
        marginTop: 12,
        fontStyle: 'normal',
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
        fontSize: 15,
        color: '#6A6A6A',
    },
    input: {
        marginTop: 4,
        width: '100%',
        height: 43,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 12,
    }
});

export default styles;