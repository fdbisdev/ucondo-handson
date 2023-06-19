import React, { useCallback } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { IListItem, RootParamList } from '../../utils/types';
import { useBill } from '../../hooks/useBills';
import Header from '../../components/Header';
import Body from '../../components/Body';

import styles from '../../globals/styles';

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
