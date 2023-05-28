import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src';
import MenuPage from './src/MenuPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from './src/Authentication/AdminAuth';
import AdminPanelNav from './src/Authentication/AdminPanelNav';
import Login from './src/Authentication/Login';
import { auth } from './config';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  />  
        <Stack.Screen name="Main" component={MenuPage} />
        <Stack.Screen name="AdminScreen" component={AdminPanelNav}/>
        <Stack.Screen name="LoginScreen" component={Login}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});