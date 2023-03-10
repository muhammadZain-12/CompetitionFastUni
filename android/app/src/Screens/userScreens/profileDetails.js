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
} from 'react-native';
import React, {useState, useRef} from 'react';
import Color from '../../constant/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../constant/Colors';
import {ActivityIndicator} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Header from '../../components/header';

const Profile = ({navigation, route}) => {
  let initialData = {
    interest: '',
    subject: '',
    address: '',
    imageUri: '',
  };
  const [profileDetail, setProfileDetail] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    {label: 'BSCS', value: 'BSCS'},
    {label: 'MCS', value: 'MCS'},
  ]);
  const [imageLoading, setImageLoading] = useState(false);
  const createUserProfile = async () => {
    profileDetail.subject = value;

    let values = Object.values(profileDetail);
    let flag = values.some((e, i) => e == '');

    if (flag) {
      ToastAndroid.show('Kindly Enter Required Fields', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      firestore()
        .collection('Users')
        .doc(route.params.id)
        .update({
          profileDetail: profileDetail,
        })
        .then(() => {
          setLoading(false);
          ToastAndroid.show('Profile Successfully Created', ToastAndroid.SHORT);
          navigation.navigate('userHome', {
            data: {
              userData: route.params,
              profileData: profileDetail,
            },
          });
        })
        .catch(error => {
          setLoading(false);
          ToastAndroid.show('Internal Error Profile not created');
        });
    }
  };
  const addProfileImage = () => {
    launchImageLibrary('photo', res => {
      setImageLoading(true);
      const Image = res.assets[0];
      if (Image) {
        storage()
          .ref(`ProfilePic/${route.params.id}`)
          .putFile(Image.uri)
          .then(e => {
            storage()
              .ref(`ProfilePic/${route.params.id}`)
              .getDownloadURL()
              .then(URL => {
                setProfileDetail({...profileDetail, imageUri: URL});
                setImageLoading(false);
              });
          });
      }
    });
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
        <Header logo />
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: Color.textColor,
              fontSize: 30,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            PROFILE
            <Text
              style={{
                color: Color.mainColor,
                fontSize: 30,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              {' '}
              CREATION
            </Text>
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          {imageLoading ? (
            <ActivityIndicator size={'large'} color={Color.black} />
          ) : (
            <Image
              source={
                profileDetail.imageUri
                  ? {uri: profileDetail.imageUri}
                  : require('../../Images/Asset34.png')
              }
              resizeMode="cover"
              style={[
                styles.pofileImage,
                {borderRadius: 10, borderColor: 'white', borderWidth: 2},
              ]}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => addProfileImage()}
          style={{alignItems: 'center', top: -17, left: 80}}
        >
          <View
            style={{
              backgroundColor: Colors.mainColor,
              alignItems: 'center',
              width: '10%',
              borderRadius: 100,
            }}
          >
            <Text style={{color: 'white', fontSize: 20}}>+</Text>
          </View>
        </TouchableOpacity>
        {/* Interest */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Interest
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
            placeholder="Enter Interest Here..."
            placeholderTextColor={'black'}
            onChangeText={e =>
              setProfileDetail({...profileDetail, interest: e})
            }
            style={{
              width: Dimensions.get('window').width / 1.21,
              padding: 12,
              color: Color.black,
            }}
          />
        </View>
        {/* Adress */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Address
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
            placeholder="Enter Address here"
            placeholderTextColor={'black'}
            onChangeText={e => setProfileDetail({...profileDetail, address: e})}
            style={{
              width: Dimensions.get('window').width / 1.21,
              padding: 12,
              color: Color.black,
            }}
          />
        </View>

        {/*  Subject */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Major Subject
          </Text>
        </View>
        <View style={{zIndex: 1}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        {/* Login Button */}
        <View
          style={{
            width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderRadius: 5,
            marginHorizontal: 5,
            marginVertical: 40,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: 'center',
              padding: 10,
              backgroundColor: Color.mainColor,
            }}
            onPress={() => createUserProfile()}
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
                Create Profile
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  coverImage: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
  },
  pofileImage: {
    height: Dimensions.get('window').height / 4.5,
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
  },
  HeaderStyle: {
    top: -60,
  },
});
