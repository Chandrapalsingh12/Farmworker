import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import HomeMain from './HomeMain';
 

const MenuPage=()=> {
  return (
    <NavigationContainer independent={true}>
      <HomeMain />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default MenuPage;
