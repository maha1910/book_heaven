import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabaseConfig';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (!agree) {
      Alert.alert('Error', 'You must agree to the terms and conditions.');
      return;
    }

    try {
      // Signup user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error('Supabase Auth Error:', error.message);
        Alert.alert('Signup Failed', error.message);
        return;
      }

      const user = data?.user;
      if (!user) {
        Alert.alert('Signup Failed', 'Check your email for verification before logging in.');
        return;
      }

      // Insert user into the 'users' table
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, username, email }]);

      if (insertError) {
        console.error('Database Insert Error:', insertError.message);
        Alert.alert('Signup Failed', 'Could not save user in database.');
        return;
      }

      Alert.alert('Success', 'Account created! Verify your email before logging in.');
      navigation.navigate('Login');
    } catch (err) {
      console.error('Signup Error:', err.message);
      Alert.alert('Signup Failed', 'Something went wrong. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5516/5516842.png' }} style={styles.logo} />
          <Text style={styles.appName}>BOOK HEAVEN</Text>
        </View>

        <View style={styles.signupBox}>
          <Text style={styles.welcomeText}>Create an Account</Text>

          {[{ icon: 'person-outline', placeholder: 'Username', value: username, setter: setUsername },
            { icon: 'mail-outline', placeholder: 'Email', value: email, setter: setEmail, keyboardType: 'email-address' }]
            .map(({ icon, placeholder, value, setter, keyboardType }) => (
              <View style={styles.inputContainer} key={placeholder}>
                <Ionicons name={icon} size={24} color="#5D6D7E" />
                <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="#5D6D7E"
                  value={value} onChangeText={setter} keyboardType={keyboardType} autoCapitalize="none" />
              </View>
          ))}

          {[{ value: password, setter: setPassword, show: showPassword, setShow: setShowPassword },
            { value: confirmPassword, setter: setConfirmPassword, show: showConfirmPassword, setShow: setShowConfirmPassword }]
            .map(({ value, setter, show, setShow }, index) => (
              <View style={styles.inputContainer} key={index}>
                <Ionicons name="lock-closed-outline" size={24} color="#5D6D7E" />
                <TextInput style={styles.input} placeholder={index === 0 ? 'Password' : 'Confirm Password'}
                  placeholderTextColor="#5D6D7E" secureTextEntry={!show} value={value} onChangeText={setter} />
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={24} color="#5D6D7E" />
                </TouchableOpacity>
              </View>
          ))}

          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgree(!agree)}>
            <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
              {agree && <Ionicons name="checkmark" size={24} color="white" />}
            </View>
            <Text style={styles.checkboxText}>I agree to the terms and conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 130, height: 130 },
  appName: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  signupBox: { backgroundColor: '#fff', width: '100%', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 5 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECF0F1', width: '100%', height: 50, borderRadius: 25, marginBottom: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: '#BDC3C7' },
  input: { flex: 1, height: 50, marginLeft: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkbox: { width: 28, height: 28, borderRadius: 5, borderWidth: 2, borderColor: '#0072FF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: '#0072FF', borderColor: '#005BBB' },
  checkboxText: { fontSize: 16, color: '#5D6D7E' },
  button: { backgroundColor: '#0072FF', width: '100%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default SignupScreen;
