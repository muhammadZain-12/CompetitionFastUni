import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';
  import Color from '../../constant/Colors';
  import Header from '../../components/header';
  import Icon from 'react-native-vector-icons/Ionicons';
  import DropDownPicker from 'react-native-dropdown-picker';
  
  const Userprofile = ({navigation, route}) => {
    const data = route.params;
    const [user, setUser] = useState(true);
    console.log('data===>', data);  
    return (
      <View
        style={{
          backgroundColor: Color.backgroundColor,
          height: Dimensions.get('window').height,
        }}>
        <View>
          <Image
            source={require('../../Images/ICONTiktok.png')}
            resizeMode="cover"
            style={[
              styles.coverImage,
              {borderBottomLeftRadius: 50, borderBottomRightRadius: 50},
            ]}
          />
          <View style={{position: 'absolute', left: 10, top: 10}}>
            <Header
              navigation={navigation}
              user={user}
              backBtn
              noLogo
              style={styles.HeaderStyle}
            />
          </View>
          <View style={{alignItems: 'center', top: -140}}>
            <Image
              source={{uri : data?.profileDetail?.imageUri}}
              resizeMode="cover"
              style={[
                styles.pofileImage,
                {borderRadius: 10, borderColor: 'white', borderWidth: 2},
              ]}
            />
          </View>
              <View style={{top:-140}}>
              <View style={{alignItems:"center"}}>
                <Text style={{color:Color.black, fontSize:22,fontWeight:'bold'}}>{data.fullName}</Text>
              </View>
              <View style={{alignItems:"center"}}>
                <Text style={{color:Color.black, fontSize:15}}>{data.email}</Text>
              </View>
              <View>
              <Text numberOfLines={1} style={{color : 'black'}}>               
    ______________________________________________________________
</Text>
</View>
          <View style={{flexDirection:"row", alignItems:"center", marginTop:20}}>
          <View style={{marginHorizontal: 5,marginVertical:5}}>
          <Text style={{fontFamily:'Poppins-Regular', color:Color.mainColor, fontSize:22,fontWeight:'bold'}}>Intrest: </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Color.textColor,fontSize:22,fontWeight:'bold',
              }}>
             {data.profileDetail.interest}
                         </Text>
          </View>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <View style={{marginHorizontal: 5,marginVertical:5}}>
          <Text style={{fontFamily:'Poppins-Regular', color:Color.mainColor, fontSize:22,fontWeight:'bold'}}>Subject:</Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Color.textColor,fontSize:22,fontWeight:'bold',
              }}>
              {data.profileDetail.subject}
            </Text>
          </View>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <View style={{marginHorizontal: 5,marginVertical:5}}>
          <Text style={{fontFamily:'Poppins-Regular', color:Color.mainColor, fontSize:22,fontWeight:'bold'}}>Address:</Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Color.textColor,fontSize:22,fontWeight:'bold',
              }}>
             {data.profileDetail.address}
            </Text>
          </View>
          </View>
          </View>
  
          
        </View>
  
        
  
        
  
  
      </View>
    );
  };
  
  export default Userprofile;
  
  const styles = StyleSheet.create({
    coverImage: {
      height: Dimensions.get('window').height / 3,
      width: Dimensions.get('window').width,
    },
    pofileImage: {
      height: Dimensions.get('window').height / 3.1,
      width: Dimensions.get('window').width / 2,
      alignItems: 'center',
    },
    HeaderStyle: {
      top: -60,
    },
  });