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
      </Stack.Navigator>
    </NavigationContainer>
    )


}

export default AppNavigation