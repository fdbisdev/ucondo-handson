import React from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Header from '../../components/Header';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import globalStyles from '../../globals/styles';
import styles from './styles';
import Body from '../../components/Body';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Home: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={globalStyles.container}
            >
                <Header
                    title='Plano de Contas'
                    rightIcon={faPlus}
                    pressableFunction={() => navigation.navigate('NewRevenue')}
                />
                <View
                    style={styles.searchBarContainer}
                >
                    <View
                        style={styles.searchBar}
                    >
                        <Pressable
                            style={styles.searchIcon}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                size={20}
                                color='#C4C4D1'
                            />
                        </Pressable>
                        <TextInput
                            placeholder='Pesquisar conta'
                        />
                    </View>
                </View>

                <Body
                    searchable
                />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
};

export default Home;
