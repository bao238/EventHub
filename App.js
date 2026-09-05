import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding2Screen from './src/screens/Onboarding2Screen';
import Onboarding3Screen from './src/screens/Onboarding3Screen';
import Onboarding4Screen from './src/screens/Onboarding4Screen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

// Giữ native splash screen cho đến khi app sẵn sàng
ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const goToSignIn = () => setCurrentScreen('signin');
  const goToSignUp = () => setCurrentScreen('signup');

  const onLayoutRootView = useCallback(async () => {
    await ExpoSplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {currentScreen === 'splash' && (
        <SplashScreen onPress={() => setCurrentScreen('onboarding2')} />
      )}
      {currentScreen === 'onboarding2' && (
        <Onboarding2Screen
          onNext={() => setCurrentScreen('onboarding3')}
          onSkip={goToSignIn}
        />
      )}
      {currentScreen === 'onboarding3' && (
        <Onboarding3Screen
          onNext={() => setCurrentScreen('onboarding4')}
          onSkip={goToSignIn}
        />
      )}
      {currentScreen === 'onboarding4' && (
        <Onboarding4Screen
          onNext={goToSignIn}
          onSkip={goToSignIn}
        />
      )}
      {currentScreen === 'signin' && (
        <SignInScreen onSignUp={goToSignUp} />
      )}
      {currentScreen === 'signup' && (
        <SignUpScreen onBack={goToSignIn} />
      )}
    </View>
  );
}
