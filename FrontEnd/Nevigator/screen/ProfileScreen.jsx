
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, Alert, RefreshControl, Dimensions } from 'react-native';

import * as Location from 'expo-location';
import Background from '../../components/Background';
import Header from '../../components/Header';

const openWeatherKey = '7cb0b29cf2cfb60e53d4aac71c420dc9'

export default function ProfileScreen() {


  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${openWeatherKey}`);
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
      console.log(data.message);
    } else {
      setForecast(data);
    }

    setRefreshing(false);
  }

  useEffect(() => {
    loadForecast();
  }, [])

  if (!forecast) {
    return <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
      </SafeAreaView>;
  }
  

  const current = forecast.weather[0];
  console.log(forecast);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {  loadForecast() }} 
            refreshing={refreshing}
          />}
      >
        <Header style={styles.title}>Current Weather</Header>
        <Text style={{alignItems:'center', textAlign:'center'}}>Your Location is {forecast.name}  </Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>{Math.round(forecast.main.temp-273.15)}°C</Text>
        </View>
        <Text style={styles.currentDescription}>{current.description}</Text>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{forecast.main.feels_like}°C</Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Feels Like</Text>
          </View>
          <View style={styles.info}>           
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{forecast.main.humidity}% </Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Humidity</Text>
          </View>
          <View style={styles.info}>           
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{Math.round(forecast.main.temp_min-273.15)}°C</Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Min Temp</Text>
          </View>
          <View style={styles.info}>           
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{Math.round(forecast.main.temp_max-273.15)}°C</Text>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Max Temp</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#560CCE',
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 12,
    marginLeft:7,
    color: '#e96e50',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBF6',
    
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight:-50
  },  
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    marginBottom: 5
  },
  hour: {
    padding: 6,
    alignItems: 'center',
  },
  largeIcon: {
    width: 300,
    height: 250,
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
  extraInfo: {
    flexDirection: 'row',
    flexWrap:"wrap",
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10
  },
  info: {
    width: Dimensions.get('screen').width/2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 5,
    borderRadius: 15,
    margin:10,
    justifyContent: 'center',
    alignItems:"center",
  },
});
