import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import colors from '../constants/colors';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in + scale up logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Pastel blob - góc trên bên phải */}
      <View style={[styles.blob, styles.blobTopRight]} />

      {/* Pastel blob - góc trên bên trái */}
      <View style={[styles.blob, styles.blobTopLeft]} />

      {/* Pastel blob - góc dưới bên trái */}
      <View style={[styles.blob, styles.blobBottomLeft]} />

      {/* Pastel blob - góc dưới bên phải */}
      <View style={[styles.blob, styles.blobBottomRight]} />

      {/* Logo EventHub */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 242,
    height: 58,
  },
  // Pastel background blobs
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobTopRight: {
    width: 227,
    height: 209,
    backgroundColor: colors.pastelPink,
    opacity: 0.2,
    top: -104,
    left: 187,
  },
  blobTopLeft: {
    width: 150,
    height: 150,
    backgroundColor: colors.pastelYellow,
    opacity: 0.15,
    top: 30,
    left: -40,
  },
  blobBottomLeft: {
    width: 180,
    height: 180,
    backgroundColor: colors.pastelCyan,
    opacity: 0.15,
    bottom: -40,
    left: -20,
  },
  blobBottomRight: {
    width: 160,
    height: 160,
    backgroundColor: colors.pastelPink,
    opacity: 0.15,
    bottom: -30,
    right: -30,
  },
});

export default SplashScreen;
