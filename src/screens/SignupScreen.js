import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!agree) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }

    Alert.alert('Success', 'Account created successfully!');
    navigation.replace('Home');
  };

  return (
    <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.container}>
      <View style={styles.content}>
        {/* Logo & Branding */}
        <View style={styles.logoContainer}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5516/5516842.png' }} style={styles.logo} />
          <Text style={styles.appName}>BOOK HEAVEN !</Text>
        </View>

        {/* Signup Form */}
        <View style={styles.signupBox}>
          <Text style={styles.welcomeText}>Create an Account</Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#5D6D7E" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#5D6D7E"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#5D6D7E" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#5D6D7E"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#5D6D7E" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#5D6D7E"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#5D6D7E" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#5D6D7E" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#5D6D7E"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#5D6D7E" />
            </TouchableOpacity>
          </View>

          {/* Terms & Conditions Checkbox */}
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgree(!agree)}>
            <View style={[styles.checkbox, agree && styles.checkboxChecked]} />
            <Text style={styles.checkboxText}>I agree to the terms and conditions</Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 130,
    height: 130,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  signupBox: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#BDC3C7',
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#5D6D7E',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#0072FF',
  },
  checkboxText: {
    color: '#5D6D7E',
  },
  button: {
    backgroundColor: '#0072FF',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
