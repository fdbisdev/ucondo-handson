import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import { RootParamList } from '../../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import globalStyles from '../../globals/styles';
import Body from '../../components/Body';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './styles';
import Header from '../../components/Header';

const Details: React.FC<NativeStackScreenProps<RootParamList, 'Details'>> = ({ route }: NativeStackScreenProps<RootParamList, 'Details'>) => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={globalStyles.container}
            >
                <Header
                    title='Plano de Contas'
                    leftIcon={faChevronLeft}
                />
                <Body />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Details;