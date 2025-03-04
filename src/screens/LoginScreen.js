//LoginScreen.js
import React, { useState, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, 
  StyleSheet, ImageBackground, Image, Animated 
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Icons

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Fade-in effect
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Handle login validation
  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }
    navigation.replace('Home'); // Navigate to Home screen
  };

  // Fade-in animation when screen loads
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground 
      source={{ uri: 'https://source.unsplash.com/1600x900/?open-book,library' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' }} 
            style={styles.logo}
          />
          <Text style={styles.header}>Welcome Back!</Text>
          <Text style={styles.subHeader}>Discover amazing book reviews</Text>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.inputContainer}
            onPress={() => emailRef.current.focus()}
          >
            <Ionicons name="mail-outline" size={24} color="#2C3E50" style={styles.icon} />
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#5D6D7E"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.inputContainer}
            onPress={() => passwordRef.current.focus()}
          >
            <Ionicons name="lock-closed-outline" size={24} color="#2C3E50" style={styles.icon} />
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#5D6D7E"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 15, top: 13 }}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#5D6D7E" />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or continue with</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#DB4437" style={{ marginRight: 10 }} />
              <Text style={{ color: '#DB4437', fontWeight: 'bold' }}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#4267B2" style={{ marginRight: 10 }} />
              <Text style={{ color: '#4267B2', fontWeight: 'bold' }}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>New here?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}> Create an Account</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(125, 221, 238, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#5D6D7E',
    marginBottom: 20,
    textAlign: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: '#2980B9',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginTop: 20,
    color: '#5D6D7E',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ECF0F1',
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
});

export default LoginScreen;
