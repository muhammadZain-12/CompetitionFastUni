import { StyleSheet, Text, View ,Image,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Color from '../constant/Colors';
import Colors from '../constant/Colors';


const Header = (Props) => {
  let {navigation, user, Drawer, backBtn ,Notification,title,noSignUp,logo, data} = Props
  
  return (
    <View style={{
      backgroundColor: 'rgba(52, 52, 52, 0.0)',
      flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',
  }}>
      
      <>
      {Drawer?
      <TouchableOpacity activeOpacity={0.8}  onPress={()=>navigation.navigate('login')}>
        <AntIcon name="logout" size={25} color={Colors.mainColor} />
      </TouchableOpacity>
      :<View></View>}
      {title ?
      <Text style={{fontFamily:'Poppins-Regular', fontSize:18, color:Color.mainColor, marginVertical:15}}>{title}</Text>
      :
      logo ?<Image source={require('../Images/headerlogo.png')} resizeMode='contain' style={styles.logo} />
       :<View></View>}
        <View style={{flexDirection:"row"}} >
       {Notification? 
      <TouchableOpacity style={{marginRight:20}}  activeOpacity={0.8}  onPress={()=>navigation.navigate('Notification')}>
      <Icon name="notifications" size={25} color={Colors.mainColor} />
      </TouchableOpacity>
       :""}
       {user? 
      <TouchableOpacity activeOpacity={0.8}  onPress={()=>navigation.navigate('userprofile',data)}>
      <AntIcon name="user" size={25} color={Colors.mainColor} />
      </TouchableOpacity>
       :<View></View>}
       </View>
      </>
    
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  button:{
      height: Dimensions.get('window').height/12,
      width: Dimensions.get('window').width/5,
  },
  icon:{
      height: Dimensions.get('window').height/16,
      width: Dimensions.get('window').width/16,
  },
  logo:{
      height: Dimensions.get('window').height/12,
      width: Dimensions.get('window').width/2,
  }
})