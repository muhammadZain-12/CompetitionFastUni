import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../constant/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const initialData = {
    email: '',
    password: '',
  };
  const [loginFields, setLoginFields] = useState(initialData);
  const [loading, setLoading] = useState(false);
  

  const authenticateUser = () => {
    let values = Object.values(loginFields);
    let flag = values && values.length > 0 && values.some((e, i) => e == '');
    console.log(flag, 'flag');
    if (flag) {
      ToastAndroid.show('Required Fields are missing', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(loginFields.email, loginFields.password)
        .then(success => {
          console.log(success);
          const {user} = success;
          console.log(user, 'userr');
          if (user) {
            firestore()
              .collection('Users')
              .doc(user.uid)
              .get()
              .then(doc => {
                let data = doc.data();
                if (data && data.profileDetail) {
                  setLoading(false);
                  setLoginFields(initialData);
                  navigation.navigate('userHome', data);
                } else {
                  setLoading(false);
                  setLoginFields(initialData);
                  navigation.navigate('profileDetail', data);
                }
              });
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error, 'errro');
          ToastAndroid.show(
            'Email and password doesnot match',
            ToastAndroid.SHORT,
          );
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.backgroundColor,
        height: Dimensions.get('window').height,
        paddingHorizontal: 10,
      }}
    >
      <View style={{alignItems: 'center'}}>

        <Image
          source={require('../Images/headerlogo.png')}
          resizeMode="cover"
          style={[styles.logo,{marginTop:30}]}
        />
      </View>
      <View style={{alignItems: 'center',marginTop:40}}>
        <Text
          style={{
            color: Color.textColor,
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
          }}
        >
          Log
          <Text
            style={{
              color: Color.mainColor,
              fontSize: 30,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            in
          </Text>
        </Text>
      </View>
      {/* Email */}
      <View style={{marginHorizontal: 5, marginVertical: 5}}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: Color.textColor,
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Email
        </Text>
      </View>
      <View
        style={{
          width: Dimensions.get('window').width / 1.1,
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 5,
        }}
      >
        <TextInput
          placeholder="Enter email here..."
          placeholderTextColor={Color.black}
          onChangeText={e => setLoginFields({...loginFields, email: e})}
          style={{
            width: Dimensions.get('window').width / 1.21,
            padding: 12,
            color: Color.black,
          }}
        />
      </View>
      {/* Password */}
      <View style={{marginHorizontal: 5, marginVertical: 5}}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: Color.textColor,
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Password
        </Text>
      </View>
      <View
        style={{
          width: Dimensions.get('window').width / 1.1,
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          placeholder="Enter password here..."
          placeholderTextColor={Color.black}
          secureTextEntry={passwordEye ? true : false}
          onChangeText={e => setLoginFields({...loginFields, password: e})}
          style={{
            width: Dimensions.get('window').width / 1.21,
            padding: 12,
            color: Color.black,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setPasswordEye(!passwordEye)}
        >
          <Text>
            {passwordEye ? (
              <Icon name="eye" size={25} color="black" />
            ) : (
              <Icon name="eye-off" size={25} color="black" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {/* remember me and forgot */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text
              style={{color: Color.mainColor, fontFamily: 'Poppins-SemiBold'}}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Login Button */}
      <View
        style={{
          width: Dimensions.get('window').width / 1.1,
          borderWidth: 1,
          borderRadius: 5,
          marginHorizontal: 5,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            backgroundColor: Color.mainColor,
          }}
          onPress={() => authenticateUser()}
        >
          {loading ? (
            <ActivityIndicator size={'large'} color={Color.black} />
          ) : (
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
              }}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Don't Have Account */}
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('signUp')}
        >
          <Text
            style={{
              color: Color.textColor,
              fontSize: 15,
              fontFamily: 'Poppins-Regular',
            }}
          >
            Don’t have an Account?
            <Text
              style={{
                color: Color.mainColor,
                fontSize: 15,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              {' '}
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width / 1.5,
  },
});
