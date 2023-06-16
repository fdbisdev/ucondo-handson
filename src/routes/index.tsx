import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import NewRevenue from '../pages/NewRevenue';
import { NavigationContainer } from '@react-navigation/native';
import { RootParamList } from '../utils/types';

const Stack = createStackNavigator<RootParamList>();

const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName='Home'
            >
                <Stack.Group>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="NewRevenue" component={NewRevenue} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;