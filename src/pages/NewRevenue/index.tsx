import React, { useCallback } from 'react';
import Header from '../../components/Header';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import Body from '../../components/Body';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../../globals/styles';
import { IListItem, RootParamList } from '../../utils/types';
import { useBill } from '../../hooks/useBills';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const NewRevenue: React.FC = () => {
    const { saveBill, newBill } = useBill();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    const handleSave = useCallback((item: IListItem) => {
        saveBill(item);
        navigation.goBack();
    }, [])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
            >
                <Header
                    title='Inserir Conta'
                    rightIcon={faCheck}
                    leftIcon={faChevronLeft}
                    pressableFunction={() => handleSave(newBill)}
                />
                <Body />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
};

export default NewRevenue;
