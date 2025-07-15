import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Snackbar from 'react-native-snackbar'
import AppwriteContext from '../appwrite/AppwriteContext'
import { NativeStackNavigatorProps, NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../routes/AuthStack'

type LoginSccreenrops = NativeStackScreenProps<AuthStackParamList, 'Login'>

const Login = ({ navigation }: LoginSccreenrops) => {

  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)

  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('Please fill all fields')
    } else {
      const user = {
        email,
        password,
      }

      appwrite
        .login(user)
        .then((response) => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Login successful!!',
              duration: Snackbar.LENGTH_SHORT,
            })
          }
        })
        .catch(e => {
          console.log(e);
          setError(e.message);
        })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Email */}
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Signup button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        {/* Login navigation */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.signUpLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
});

export default Login
