import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding2Screen from './src/screens/Onboarding2Screen';

// Giữ native splash screen cho đến khi app sẵn sàng
ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const onLayoutRootView = useCallback(async () => {
    await ExpoSplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {currentScreen === 'splash' && (
        <SplashScreen onPress={() => setCurrentScreen('onboarding2')} />
      )}
      {currentScreen === 'onboarding2' && (
        <Onboarding2Screen />
      )}
    </View>
  );
}
