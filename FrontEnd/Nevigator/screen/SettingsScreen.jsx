import { StyleSheet, Text, View,ActivityIndicator,SafeAreaView,Image,FlatList,Linking,ScrollView,RefreshControl,VirtualizedList} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'

import Background from '../../components/Background'
import Header from '../../components/Header'
import { Button } from 'react-native-paper'

const NewsAPI_KEY= "90ef0ade272543528c6352c70c7e3787"




export default function SettingsScreen() {
  const[news,setNews] = useState(null)
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async()=>{
    setRefreshing(false)

    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NewsAPI_KEY}`)
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
      console.log(data.message);
    } else {
      setNews(data.articles);
    }
    // console.log(data);

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
       <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {  fetchData() }} 
            refreshing={refreshing}
          />}
      >
      
      <FlatList
      data={news}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.urlToImage }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            </View>
            <Button onPress={() => Linking.openURL(item.url)}>Read Full Artical</Button>
            </View>
      )}

    showsVerticalScrollIndicator={false} />  
   
    </ScrollView> 
    </SafeAreaView>
      
  
  
  )
}

// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     backgroundColor: '#FFFBF6',
//     alignItems:"center"

//   },
//   card: {
//     width: 320,
//     height: 406,
//     backgroundColor:"white",
//     borderRadius:10,
//     shadowColor: "#000",
//     margin:5,
// shadowOffset: {
// 	width: 0,
// 	height: 4,
// },
// shadowOpacity: 0.32,
// shadowRadius: 5.46,

// elevation: 9,
//     // alignItems:"center"
//   },
//   loading: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imgstyle:{
//     width:"100%",
//     height:200,
//     borderTopLeftRadius:10,
//     borderTopRightRadius:10  
//   },
//   heading:{
//     fontSize:20,
//     padding:4,
//     fontWeight:"600"
//   },
//   paragraph:{
//     fontSize:15,
//     padding:4  
//   },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   }
// })

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});


// <FlatList
//     data={news}
//     renderItem={({item})=>
//       <View style={styles.card} >
//         <Image
//         source={{uri: item.urlToImage}}
//           // resizeMode="contain"
//           style={styles.imgstyle}
//         ></Image>
//         <Text style={styles.heading}>Source: {item.author}</Text>
//         <Text style={styles.paragraph} numberOfLines={6}>{item.title}</Text>
//         <Button onPress={() => Linking.openURL(item.url)}>Read Full Artical</Button>
//       </View>
//     }
//     keyExtractor={item=>item.id}
//     showsVerticalScrollIndicator={false} />  
//     </ScrollView> 
//     </SafeAreaView>
      