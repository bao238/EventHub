import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

const SignUpScreen = ({ onBack }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        {/* Sign up title */}
        <Text style={styles.title}>Sign up</Text>

        {/* Full name input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account-outline" size={22} color="#747688" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor="#747688"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Email input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={22} color="#747688" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="abc@email.com"
            placeholderTextColor="#747688"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={22} color="#747688" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="#747688"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#747688" />
          </TouchableOpacity>
        </View>

        {/* Confirm password input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={22} color="#747688" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#747688"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#747688" />
          </TouchableOpacity>
        </View>

        {/* Sign Up button */}
        <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
          <View style={styles.arrowCircle}>
            <Feather name="arrow-right" size={20} color={colors.textLight} />
          </View>
        </TouchableOpacity>

        {/* OR */}
        <Text style={styles.orText}>OR</Text>

        {/* Login with Google */}
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/images/icon-google.png')} style={styles.socialIcon} resizeMode="contain" />
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>

        {/* Login with Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/images/icon-facebook.png')} style={styles.socialIcon} resizeMode="contain" />
          <Text style={styles.socialText}>Login with Facebook</Text>
        </TouchableOpacity>

        {/* Sign in link */}
        <View style={styles.signInRow}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.signInLink}>Signin</Text>
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
    marginBottom: 16 * scale,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  // Title
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 20 * scale,
  },
  // Input fields
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16 * scale,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    padding: 0,
  },
  // Sign Up button
  signUpButton: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10 * scale,
    marginBottom: 20 * scale,
    position: 'relative',
  },
  signUpButtonText: {
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
  // OR text
  orText: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 16 * scale,
  },
  // Social buttons
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 15,
    paddingVertical: 14,
    marginBottom: 14 * scale,
    backgroundColor: colors.white,
  },
  socialIcon: {
    width: 26,
    height: 26,
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },
  // Sign in
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16 * scale,
    marginBottom: 30 * scale,
  },
  signInText: {
    fontSize: 15,
    color: colors.textDark,
  },
  signInLink: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SignUpScreen;
