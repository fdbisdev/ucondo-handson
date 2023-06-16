import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { IBody } from '../../utils/types';
import { SCREEN_HEIGHT } from '../../utils/constants';

const Body: React.FC<IBody> = ({ searchable }: IBody) => {
    return (
        <View style={[
            styles.container,
            {
                marginTop: searchable ? SCREEN_HEIGHT * 0.04 : SCREEN_HEIGHT * 0.12,
            }]}>
        </View>
    )
}

export default Body;