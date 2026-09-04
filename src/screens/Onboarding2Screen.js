import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import colors from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Scale factor dựa trên design width 375px
const scale = SCREEN_WIDTH / 375;

const Onboarding2Screen = ({ onNext, onSkip }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Hình minh họa - preview app */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../assets/images/onboarding2.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Phần nội dung bên dưới với nền xanh bo góc */}
      <View style={styles.bottomSection}>
        {/* Tiêu đề */}
        <Text style={styles.title}>
          Explore Upcoming and{'\n'}Nearby Events
        </Text>

        {/* Mô tả */}
        <Text style={styles.description}>
          In publishing and graphic design, Lorem is a placeholder text commonly
        </Text>

        {/* Navigation row: Skip - Dots - Next */}
        <View style={styles.navigationRow}>
          {/* Skip */}
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Dot indicators */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Next */}
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // Hình minh họa
  illustrationContainer: {
    position: 'absolute',
    top: 63 * scale,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  illustration: {
    width: 375 * scale,
    height: 475 * scale,
  },
  // Phần nền xanh bên dưới
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 288 * scale,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingHorizontal: 40 * scale,
    paddingTop: 36 * scale,
    alignItems: 'center',
  },
  // Tiêu đề
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 16,
  },
  // Mô tả
  description: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 25,
    opacity: 0.8,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  // Navigation row
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 40 * scale,
    left: 40 * scale,
    right: 40 * scale,
  },
  // Skip button
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  skipText: {
    fontSize: 18,
    color: colors.textLight,
    opacity: 0.7,
  },
  // Dot indicators
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textLight,
    opacity: 0.4,
  },
  dotActive: {
    opacity: 1,
  },
  // Next button
  nextButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  nextText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
  },
});

export default Onboarding2Screen;
