import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Admin from "./AdminAuth";
import RentItemUser from "./RentItemUser";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator(); 
const AdminPanelNav = () => {

  return (
    <Tab.Navigator>

    <Tab.Screen
      name="Prediction"
      component={Admin}
      options={{
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="home" size={24} color="black" />
        ),
        tabBarLabel: ({ focused, color, size }) => (
          <Text style={{ color: focused ? "#560CCE" : color, fontSize: 12 }}>
            Upload Post
          </Text>
        ),
      }}
    /> 
    <Tab.Screen
      name="Rent Items"
      component={RentItemUser}
      options={{
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="agriculture" size={24} color="black" />
        ),
        tabBarLabel: ({ focused, color, size }) => (
          <Text style={{ color: focused ? "#560CCE" : color, fontSize: 12 }}>
            User Rent Item
          </Text>
        ),
      }}
    />
    </Tab.Navigator>
  );
};

export default AdminPanelNav;

const styles = StyleSheet.create({});
