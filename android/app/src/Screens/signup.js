import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Color from '../constant/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [universityIdEye, setUniversityIdEye] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const phoneInput = useRef(null);

  let initialData = {
    fullName: '',
    universityId: '',
    email: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
  };
  const [signupFields, setSignupFields] = useState(initialData);

  console.log(signupFields, 'signup');

  const registerUser = async () => {
    let values = Object.values(signupFields);

    let flag = values && values.length > 0 && values.some((e, i) => e == '');
    console.log(flag, 'falg');
    console.log(values, 'values');
    if (flag) {
      ToastAndroid.show('Required Fields are missing', ToastAndroid.SHORT);
    } else if (signupFields.phoneNumber.length !== 10) {
      ToastAndroid.show(
        'Phone number should have 10 numbers',
        ToastAndroid.SHORT,
      );
    } else if (signupFields.confirmPassword !== signupFields.password) {
      ToastAndroid.show("confirm password doesn't match", ToastAndroid.SHORT);
    } else if (!rememberMe) {
      ToastAndroid.show('Accept terms and conditions', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(
          signupFields.email,
          signupFields.password,
        )
        .then(credential => {
          const {user} = credential;

          signupFields.id = user.uid;

          if (user) {
            firestore()
              .collection('Users')
              .doc(user.uid)
              .set(signupFields)
              .then(() => {
                setLoading(false);
                ToastAndroid.show(
                  'You have been succesfuuly registered',
                  ToastAndroid.SHORT,
                );
                setSignupFields(initialData);
                navigation.navigate('login');
              })
              .catch(error => {
                setLoading(false);
                console.log(error);
              });
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('auth', error);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.backgroundColor,
        height: Dimensions.get('window').height,
        paddingHorizontal: 10,
        paddingBottom: 30,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center'}}>

<Image
  source={require('../Images/headerlogo.png')}
  resizeMode="cover"
  style={[styles.logo,{marginTop:30}]}
/>
</View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: Color.textColor,
              fontSize: 30,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            Sign
            <Text
              style={{
                color: Color.mainColor,
                fontSize: 30,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              {' '}
              up
            </Text>
          </Text>
        </View>
        {/* Name */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Full Name{' '}
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 5,
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Enter full name here..."
            placeholderTextColor={'black'}
            onChangeText={e => setSignupFields({...signupFields, fullName: e})}
            style={{
              width: Dimensions.get('window').width / 1.21,
              padding: 12,
              color: Color.black,
            }}
          />
        </View>

        {/*  university id */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            University ID
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
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Enter university id here..."
            placeholderTextColor={'black'}
            onChangeText={e =>
              setSignupFields({...signupFields, universityId: e})
            }
            style={{
              width: Dimensions.get('window').width / 1.21,
              padding: 12,
              color: Color.black,
            }}
          />
        </View>
        {/* Phone Number */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Mobile Number
          </Text>
        </View>
        <View style={styles.container}>
          <PhoneInput
            ref={phoneInput}
            placeholder="3XXXXXXXXX"
            defaultValue={phoneNumber}
            length={10}
            defaultCode="PK"
            layout="first"
            // withShadow
            autoFocus
            textInputStyle={{color: Color.textColor, height: 50}}
            textInputProps={{placeholderTextColor: Color.textColor}}
            codeTextStyle={{marginLeft: -15, paddingLeft: -55, color: 'black'}}
            containerStyle={styles.phoneNumberView}
            onChangeText={e =>
              setSignupFields({...signupFields, phoneNumber: e})
            }
            textContainerStyle={{
              height: 60,
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: 'transparent',
              color: Color.black,
            }}
            onChangeFormattedText={text => {
              setPhoneNumber(text);
            }}
          />
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
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Enter email here"
            placeholderTextColor={'black'}
            onChangeText={e => setSignupFields({...signupFields, email: e})}
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
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Enter password here"
            placeholderTextColor={'black'}
            secureTextEntry={passwordEye ? true : false}
            onChangeText={e => setSignupFields({...signupFields, password: e})}
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
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Confirm Password
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
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Enter confirm password here..."
            placeholderTextColor={'black'}
            secureTextEntry={universityIdEye ? true : false}
            onChangeText={e =>
              setSignupFields({...signupFields, confirmPassword: e})
            }
            style={{
              width: Dimensions.get('window').width / 1.21,
              padding: 12,
              color: Color.black,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setUniversityIdEye(!universityIdEye)}
          >
            <Text>
              {universityIdEye ? (
                <Icon name="eye" size={25} color="black" />
              ) : (
                <Icon name="eye-off" size={25} color="black" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Term and conditions*/}
        <View style={{marginHorizontal: 10, marginVertical: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <TouchableOpacity
              style={{width: 14, height: 14, borderWidth: 1, borderRadius: 5}}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe ? (
                <Icon
                  name="md-checkmark-sharp"
                  size={11}
                  color="white"
                  style={{backgroundColor: Color.mainColor}}
                />
              ) : (
                ''
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: Color.textColor,
                fontSize: 15,
                fontFamily: 'Poppins-Regular',
              }}
            >
              {' '}
              By signing up, i agree with
              <Text
                style={{
                  color: Color.mainColor,
                  fontSize: 15,
                  fontFamily: 'Poppins-SemiBold',
                }}
              >
                {' '}
                Terms of use{' '}
              </Text>
              <Text
                style={{
                  color: Color.textColor,
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                and
              </Text>
              <Text
                style={{
                  color: Color.mainColor,
                  fontSize: 15,
                  fontFamily: 'Poppins-SemiBold',
                }}
              >
                {' '}
                Privacy policy{' '}
              </Text>
            </Text>
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
            activeOpacity={0.8}
            onPress={() => registerUser()}
            style={{
              alignItems: 'center',
              padding: 10,
              backgroundColor: Color.mainColor,
            }}
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
                Sign up
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Don't Have Account */}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('login')}
          >
            <Text
              style={{
                color: Color.textColor,
                fontSize: 15,
                fontFamily: 'Poppins-Regular',
              }}
            >
              Already have an Account?
              <Text
                style={{
                  color: Color.mainColor,
                  fontSize: 15,
                  fontFamily: 'Poppins-SemiBold',
                }}
              >
                {' '}
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  logo: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 1.4,
  },
  container: {
    paddingHorizontal: 10,
  },
  phoneNumberView: {
    // height: 70,
    width: '100%',
    backgroundColor: 'white',
    borderColor: Color.textColor,
    borderRadius: 10,
    borderWidth: 1,
    color: '#E5E5E5',
    flexShrink: 22,
  },
  logo: {
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width / 1.5,
  },
});
