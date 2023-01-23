import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View,Image,Button, BackHandler } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../Nevigator/screen/HomeScreen';
import DetailsScreen from '../Nevigator/screen/DetailsScreen';
import ProfileScreen from '../Nevigator/screen/ProfileScreen';
import SettingsScreen from '../Nevigator/screen/SettingsScreen';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config';

 
const Tab = createBottomTabNavigator();

export default function HomeMain({navigation}) {
  // const navigation = useNavigation()

  const handleSignOut = () => {
    BackHandler.exitApp();  

    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }


  return (
    <Tab.Navigator>
    <Tab.Screen name='Rent Item' component={HomeScreen} options={{
      tabBarIcon:({tintColor})=>(
        <FontAwesome5 name="tools" size={20} color="black" />),        
        tabBarLabel: ({focused, color, size}) => (
        <Text style={{color: focused ? '#560CCE' : color,fontSize:12}}>Rent</Text>
        ),
        headerRight: () => (
          <Button
          onPress={handleSignOut}
          title="Signout"
          color="#000"
          />
      ),    
      }}
    
      />
    <Tab.Screen name='Prediction' component={DetailsScreen} options={{
      tabBarIcon:({tintColor})=>(
        <AntDesign name="profile" size={24} color="black" />),
        tabBarLabel: ({focused, color, size}) => (
          <Text style={{color: focused ? '#560CCE' : color,fontSize:12}}>Prediction</Text>
        )      
      }}
      
      />
    <Tab.Screen name='Weather' component={ProfileScreen} options={{
      tabBarIcon:({tintColor})=>(
        <MaterialCommunityIcons name="weather-windy-variant" size={24} color="black" />),        
        tabBarLabel: ({focused, color, size}) => (
        <Text style={{color: focused ? '#560CCE' : color,fontSize:12}}>Weather</Text>
        )     
      }}>
      </Tab.Screen>

    <Tab.Screen name='News' component={SettingsScreen} options={{
      tabBarIcon:({tintColor})=>(
        <MaterialCommunityIcons name="newspaper-variant-multiple" size={24} color="black" />),        
        tabBarLabel: ({focused, color, size}) => (
        <Text style={{color: focused ? '#560CCE' : color,fontSize:12}}>News</Text>
        )     
      }}></Tab.Screen>
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})