import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from '../Screens/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../Screens/signup';
import UserHome from '../Screens/userScreens/Home';
import AdminHome from '../Screens/AdminScreens/Home';
import Profile from '../Screens/userScreens/profileDetails';
import Header from '../components/header';
import Userprofile from '../Screens/userScreens/userprofile';
import AllStudentsData from '../Screens/userScreens/allStudentsDataScreen';
import SplashScreen from '../Screens/spashScreen';


const Stack = createNativeStackNavigator();


function AppNavigation  () {
    return (
        <NavigationContainer  >
      <Stack.Navigator initialRouteName='SplashScreen' >
      <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        /> 
        <Stack.Screen
          options={{headerShown: false}}
          name="signUp"
          component={SignUp}
        /> 
         <Stack.Screen
          options={{headerShown: false}}
          name="login"
          component={Login}
        />
         <Stack.Screen
          options={{headerShown: false}}
          name="userprofile"
          component={Userprofile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="userHome"
          component={UserHome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="adminHome"
          component={AdminHome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="profileDetail"
          component={Profile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="allStudentsData"
          component={AllStudentsData}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    )


}

export default AppNavigation