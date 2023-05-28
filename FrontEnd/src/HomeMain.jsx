import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  BackHandler,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../Nevigator/screen/HomeScreen";
import DetailsScreen from "../Nevigator/screen/DetailsScreen";
import ProfileScreen from "../Nevigator/screen/ProfileScreen";
import SettingsScreen from "../Nevigator/screen/SettingsScreen";
import RentItemScreen from "../Nevigator/screen/RentItemScreen";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationContainer from "@react-navigation/native";
import BookingDetails from "../Nevigator/screen/Booking/BookingDetails";
import CheckDetails from "../Nevigator/screen/Booking/CheckDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeMain({ navigation }) {
  // const navigation = useNavigation()
  const navigations = useNavigation()

  const handleSignOut = () => {
    // BackHandler.exitApp();

    auth
      .signOut()
      .then(() => {
        navigations.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Rent Item"
        options={{
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name="tools" size={20} color="black" />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#560CCE" : color, fontSize: 12 }}>
              Rent
            </Text>
          ),
          headerRight: () => (
            <Button onPress={handleSignOut} title="Signout" color="#000" />
          ),
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
            headerLeft: null,
          }} />
            <Stack.Screen name="RentItemScreen" component={RentItemScreen} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} />
            <Stack.Screen name="CheckDetails" component={CheckDetails} />
            {/* Add more screens to the Stack.Navigator if needed */}
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Prediction"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <AntDesign name="profile" size={24} color="black" />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#560CCE" : color, fontSize: 12 }}>
              Prediction
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name="weather-windy-variant"
              size={24}
              color="black"
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#560CCE" : color, fontSize: 12 }}>
              Weather
            </Text>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="SettingPage"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-multiple"
              size={24}
              color="black"
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#560CCE" : color, fontSize: 12 }}>
              News
            </Text>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
