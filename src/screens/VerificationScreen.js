import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

const VerificationScreen = ({ onBack, onContinue, email = 'abc@email.com' }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [countdown, setCountdown] = useState(20);

  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if a digit was typed
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(20);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.textDark} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Verification</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We’ve send you the verification code on {email}
        </Text>

        {/* 4 OTP Input Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => {
            const isFocused = focusedIndex === index;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => inputRefs.current[index]?.focus()}
                style={[
                  styles.otpBox,
                  isFocused && styles.otpBoxFocused,
                ]}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    isFocused && !digit && styles.otpDashActive,
                  ]}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  placeholder="—"
                  placeholderTextColor={isFocused ? colors.primary : '#D3D4DD'}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => onContinue && onContinue(otp.join(''))}
        >
          <Text style={styles.continueButtonText}>CONTINUE</Text>
          <View style={styles.arrowCircle}>
            <Feather name="arrow-right" size={20} color={colors.textLight} />
          </View>
        </TouchableOpacity>

        {/* Resend code */}
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Re-send code in </Text>
          <TouchableOpacity onPress={handleResend} disabled={countdown > 0}>
            <Text style={styles.resendTimer}>
              {countdown > 0 ? formatTimer(countdown) : 'Re-send'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28 * scale,
  },
  // Back button
  backButton: {
    marginTop: 44 * scale,
    marginBottom: 20 * scale,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  // Title
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12 * scale,
  },
  // Subtitle
  subtitle: {
    fontSize: 15,
    color: colors.textDark,
    lineHeight: 25,
    opacity: 0.8,
    marginBottom: 30 * scale,
  },
  // OTP row & boxes
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40 * scale,
  },
  otpBox: {
    width: 56 * scale,
    height: 56 * scale,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  otpDashActive: {
    color: colors.primary,
  },
  // Continue button
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24 * scale,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  arrowCircle: {
    position: 'absolute',
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Resend code timer
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6 * scale,
  },
  resendText: {
    fontSize: 15,
    color: colors.textDark,
  },
  resendTimer: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '500',
  },
});

export default VerificationScreen;
