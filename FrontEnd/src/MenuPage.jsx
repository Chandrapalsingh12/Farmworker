import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import HomeMain from './HomeMain';
import RentItemScreen from '../Nevigator/screen/RentItemScreen';
import { createStackNavigator } from '@react-navigation/stack';



 

const MenuPage=()=> {
  const Stack = createStackNavigator()
  return (
    <>

      <HomeMain />
    {/* <NavigationContainer independent={true}>
    </NavigationContainer> */}
    
    </>
  )
}


export default MenuPage;
