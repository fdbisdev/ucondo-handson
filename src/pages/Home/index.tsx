import React from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../utils/constants';
import { useBill } from '../../hooks/useBills';
import { RootParamList } from '../../utils/types';
import Header from '../../components/Header';
import globalStyles from '../../globals/styles';
import Body from '../../components/Body';

import styles from './styles';

const Home: React.FC = () => {
    const [searchItem, setSearchItem] = React.useState<string | null>(null);
    const { handleSearch } = useBill()

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
                            onPress={() => handleSearch(searchItem ?? '')}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                size={20}
                                color={colors.icon}
                            />
                        </Pressable>
                        <TextInput
                            placeholder='Pesquisar conta'
                            value={searchItem || ''}
                            onChangeText={setSearchItem}
                            style={styles.searchInput}
                            placeholderTextColor={colors.placeholder}
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
