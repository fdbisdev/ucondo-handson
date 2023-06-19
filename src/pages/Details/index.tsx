import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { RootParamList } from '../../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import globalStyles from '../../globals/styles';
import Body from '../../components/Body';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header';

const Details: React.FC<NativeStackScreenProps<RootParamList, 'Details'>> = ({ route }: NativeStackScreenProps<RootParamList, 'Details'>) => {

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={globalStyles.container}
            >
                <Header
                    title='Detalhes da Conta'
                    leftIcon={faChevronLeft}
                />
                <Body
                    details={route.params.item}
                />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Details;