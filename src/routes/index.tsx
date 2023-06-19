import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../pages/Home';
import NewRevenue from '../pages/NewRevenue';
import Details from '../pages/Details';
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
                    <Stack.Screen name="Details" component={Details} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;