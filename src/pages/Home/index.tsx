import React from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../../globals/styles';
import Body from '../../components/Body';

const Home: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <View
            style={styles.container}
        >
            <Header
                title='Plano de Contas'
                rightIcon={faPlus}
                pressableFunction={() => navigation.navigate('NewRevenue')}
            />
            <Body
                searchable
            />
        </View>
    )
};

export default Home;
