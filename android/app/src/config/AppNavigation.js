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


const Stack = createNativeStackNavigator();


function AppNavigation  () {
    return (
        <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          options={{headerShown: false}}
          name="login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="signUp"
          component={SignUp}
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
      </Stack.Navigator>
    </NavigationContainer>
    )


}

export default AppNavigation