import React, { useCallback } from 'react';
import Header from '../../components/Header';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import Body from '../../components/Body';
import { View } from 'react-native';
import styles from '../../globals/styles';

const NewRevenue: React.FC = () => {
    const handleSave = useCallback(() => {
        console.log('Salvou');
    }, [])

    return (
        <View
            style={styles.container}
        >
            <Header
                title='Inserir Conta'
                rightIcon={faCheck}
                leftIcon={faChevronLeft}
                pressableFunction={handleSave}
            />
            <Body />
        </View>
    )
};

export default NewRevenue;
