import { StyleSheet, Text, View,ActivityIndicator,SafeAreaView,Image,FlatList,Linking,ScrollView,RefreshControl,VirtualizedList} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'

import Background from '../../components/Background'
import Header from '../../components/Header'
import { Button } from 'react-native-paper'


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8',
		'X-RapidAPI-Host': 'indian-news-live.p.rapidapi.com'
	}
};



export default function SettingsScreen() {
  const[news,setNews] = useState(null)
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async()=>{
    setRefreshing(true)

    const response = await fetch('https://indian-news-live.p.rapidapi.com/news/india-news', options)
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
      console.log(data.message);
    } else {
      setNews(data);
    }
    console.log(data);

    setRefreshing(false);

  }


  useEffect(() => {
    fetchData();
  }, [])

  if (!news) {
    return <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
      </SafeAreaView>;
  }




  return (
       <SafeAreaView style={styles.container}>
      <FlatList
    data={news}
    renderItem={({item})=>
      <View style={styles.card} >
        <Image
        source={{uri:item.img}}
          // resizeMode="contain"
          style={styles.imgstyle}
        ></Image>
        <Text style={styles.heading}>Source: {item.source}</Text>
        <Text style={styles.paragraph} numberOfLines={6}>{item.title}</Text>
        <Button onPress={() => Linking.openURL(item.url)}>Read Full Artical</Button>
      </View>
    }
    keyExtractor={item=>item.id}
    showsVerticalScrollIndicator={false} />   
    </SafeAreaView>
      
  
  
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFBF6',
    alignItems:"center"

  },
  card: {
    width: 320,
    height: 406,
    backgroundColor:"white",
    borderRadius:10,
    shadowColor: "#000",
    margin:5,
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 9,
    // alignItems:"center"
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgstyle:{
    width:"100%",
    height:200,
    borderTopLeftRadius:10,
    borderTopRightRadius:10  
  },
  heading:{
    fontSize:20,
    padding:4,
    fontWeight:"600"
  },
  paragraph:{
    fontSize:15,
    padding:4  
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
})