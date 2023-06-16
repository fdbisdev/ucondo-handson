import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native';

import Routes from './src/routes';

function App(): JSX.Element {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor={'transparent'}
                />
                <Routes />
            </SafeAreaProvider >
        </GestureHandlerRootView >
    );
}

export default App;
