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
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo-signin.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Sign in title */}
        <Text style={styles.title}>Sign in</Text>

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

        {/* Remember Me & Forgot Password */}
        <View style={styles.optionsRow}>
          <View style={styles.rememberRow}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: '#E0E0E0', true: colors.primary }}
              thumbColor={colors.white}
              style={styles.switch}
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In button */}
        <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}>
          <Text style={styles.signInText}>SIGN IN</Text>
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

        {/* Sign up link */}
        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign up</Text>
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
  // Logo
  logoContainer: {
    alignItems: 'center',
    marginTop: 73 * scale,
    marginBottom: 20 * scale,
  },
  logo: {
    width: 162 * scale,
    height: 114 * scale,
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
  // Options row
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24 * scale,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: colors.textDark,
  },
  forgotText: {
    fontSize: 14,
    color: colors.textDark,
  },
  // Sign In button
  signInButton: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20 * scale,
    position: 'relative',
  },
  signInText: {
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
  // Sign up
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16 * scale,
    marginBottom: 30 * scale,
  },
  signUpText: {
    fontSize: 15,
    color: colors.textDark,
  },
  signUpLink: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SignInScreen;
