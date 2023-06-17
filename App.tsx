import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native';

import Routes from './src/routes';
import { BillsProvider } from './src/hooks/useBills';

function App(): JSX.Element {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor={'transparent'}
                />
                <BillsProvider>
                    <Routes />
                </BillsProvider>
            </SafeAreaProvider >
        </GestureHandlerRootView >
    );
}

export default App;
