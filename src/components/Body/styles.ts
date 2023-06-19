import { Platform, StyleSheet } from "react-native";

import { SCREEN_HEIGHT, colors } from "../../utils/constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
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
        color: colors.title,
    },
    listHeaderRegisters: {
        color: colors.subtitle,
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    listElement: {
        marginHorizontal: 22,
        backgroundColor: colors.white,
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
        backgroundColor: colors.white,
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
        color: colors.lightGray,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        fontStyle: 'normal',
    }, 
    cancelButton: {
        color: colors.negativeButton,
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        fontStyle: 'normal',
    },
    cancelButtonContainer: {
        width: 120,
        borderColor: colors.negativeButton,
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 11,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonContainer: {
        backgroundColor: colors.negativeButton,
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 11,
        marginLeft: 24,
        width: 140,
    }, 
    confirmButton: {
        color: colors.white,
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
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        zIndex: 1,
    },
    label: {
        marginTop: 12,
        fontStyle: 'normal',
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
        fontSize: 15,
        color: colors.label,
    },
    input: {
        marginTop: 4,
        width: '100%',
        height: 43,
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 12,
        color: colors.placeholder,
    }, 
});

export default styles;