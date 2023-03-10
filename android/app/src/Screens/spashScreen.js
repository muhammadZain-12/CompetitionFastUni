import { Image, StyleSheet, Text, View,Dimensions } from 'react-native'
import React,{useEffect} from 'react'

const SplashScreen = ({navigation}) => {
    const navigateToHomeScreen = () =>{
        setTimeout(()=>{
            navigation.navigate('login')
        },3000)
    }
    useEffect(()=>{
        navigateToHomeScreen()
    },[])
  return (
    <>
    <View style={styles.mainContainer}>
        <Image source={require('../Images/fusionknights.png')} resizeMode='contain' style={styles.logo} />
        </View>
     </>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        height: Dimensions.get('window').height/4,
        width: Dimensions.get('window').width,
      },
      mainContainer : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        display : 'flex',
        height : '100%'
      }
})