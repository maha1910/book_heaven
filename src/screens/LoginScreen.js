import React, { useState } from 'react';
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
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' }} 
            style={styles.logo}
          />
          <Text style={styles.header}>Welcome Back!</Text>
          <Text style={styles.subHeader}>Discover amazing book reviews</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#2C3E50" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#5D6D7E"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#2C3E50" style={styles.icon} />
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

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or continue with</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButtonGoogle}>
              <FontAwesome name="google" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButtonFacebook}>
              <FontAwesome name="facebook" size={24} color="white" />
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
    backgroundColor: 'rgba(240, 248, 255, 0.9)', // Soft Light Blue Overlay
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50', // Deep Blue
    textAlign: 'center',
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#2980B9',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2980B9', // Cool Blue Button
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#2980B9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginTop: 15,
    color: '#5D6D7E',
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialButtonGoogle: {
    backgroundColor: '#D35400', // Orange Google
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButtonFacebook: {
    backgroundColor: '#3B5998', // Facebook Blue
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#5D6D7E',
  },
  signupLink: {
    color: '#2980B9',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
