import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IHeader, RootParamList } from '../../utils/types';

const Header: React.FC<IHeader> = ({ title, rightIcon, leftIcon, pressableFunction }: IHeader) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <View style={[
            styles.container,
        ]}>
            <View style={styles.titleContainer}>
                <View style={styles.backContainer}>
                    {
                        leftIcon &&
                        (
                            <Pressable
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <FontAwesomeIcon
                                    size={28}
                                    color='#FFF'
                                    icon={leftIcon}
                                />
                            </Pressable>
                        )
                    }
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Pressable
                    onPress={() => pressableFunction()}
                >
                    <FontAwesomeIcon
                        size={28}
                        color='#FFF'
                        icon={rightIcon}
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default Header;