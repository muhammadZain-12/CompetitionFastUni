import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {cloneElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BaseUrl from '../config/BaseUrl';

function Login({navigation}) {
  const initialData = {
    email: '',
    password: '',
  };

  const [loginData, setLoginData] = React.useState(initialData);
  const [password, setPassword] = React.useState({
    inputPasswordActive: false,
    showPassword: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(BaseUrl);

  const checkUserToLogin = () => {
    if (!loginData.email) {
      ToastAndroid.show('Email is required', ToastAndroid.SHORT);
      return;
    }
    if (!loginData.password) {
      ToastAndroid.show('Password is required', ToastAndroid.SHORT);
      return;
    }
    setIsLoading(true);
    axios
      .post(`${BaseUrl}/login`, loginData)
      .then(({data}) => {
        setIsLoading(false);
        console.log(data);
        console.log(data.message);

        if (!data.status) {
          Alert.alert('Error Alert', data.message);
        } else {
          ToastAndroid.show('Successfully Login', ToastAndroid.SHORT);
          if (data.data.category == 'police') {
            RouteToAdmin(data, 'police');
            return;
          }
          if (data.data.category == 'ambulance') {
            RouteToAdmin(data, 'ambulance');
            return;
          }
          if (data.data.category == 'fireBrigade') {
            RouteToAdmin(data, 'fireBrigade');
            return;
          } else {
            RouteToUser(data);
          }
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const passwordShowHideIcon = () => {
    if (!password.showPassword) {
      setPassword({...password, showPassword: true});
    } else {
      setPassword({...password, showPassword: false});
    }
  };

  return (
    <View>
      <KeyboardAvoidingView enabled>
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome,</Text>
          <Text style={styles.text}>Sign in to continue!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="gray"
              onChangeText={e => setLoginData({...loginData, email: e})}
              value={loginData.email}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '97%',
                borderWidth: 1,
                borderColor: 'gray',
                marginTop: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <TextInput
                style={[
                  styles.input,
                  {marginTop: 0, borderWidth: 0, width: '90%'},
                ]}
                placeholder="password"
                placeholderTextColor="gray"
                secureTextEntry={password.showPassword ? false : true}
                onChangeText={e => setLoginData({...loginData, password: e})}
                value={loginData.password}
                onPressIn={() =>
                  setPassword({...password, inputPasswordActive: true})
                }
                onBlur={() =>
                  setPassword({...password, inputPasswordActive: false})
                }
              />
              {password.inputPasswordActive && (
                <TouchableOpacity onPress={passwordShowHideIcon}>
                  <Icon
                    name={!password.showPassword ? 'eye' : 'eye-off'}
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={{width: '100%', marginTop: 5}}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 14,
                    textAlign: 'right',
                    width: '97%',
                    color: 'black',
                  },
                ]}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={checkUserToLogin}
              style={styles.touchableOpacity}
            >
              {isLoading ? (
                <ActivityIndicator color="black" size="large" />
              ) : (
                <Text
                  style={[styles.text, {textAlign: 'center', color: 'black'}]}
                >
                  Login
                </Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Text style={styles.text}> Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                <Text style={[styles.text, {color: '#a8aada'}]}> SignUp </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
    marginTop: 80,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'gray',
    fontWeight: '500',
  },
  input: {
    width: '97%',
    color: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  touchableOpacity: {
    width: '97%',
    backgroundColor: '#a8aada',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});
