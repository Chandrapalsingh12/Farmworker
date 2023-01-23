import { StyleSheet, Text, View, FlatList,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../config'

import Background from '../../components/Background';

export default function HomeScreen({navigation}) {
  const[posts,setPosts] = useState(null);
  const[loading,setLoading] = useState(true)
  

useEffect(()=>{
    const fetchPost = async()=>{
      try{
        const list = []
         await firebase.firestore()
        .collection('posts')
        .get()
        .then((querySnapshot)=>{
          // console.log('Total Posts',querySnapshot.size);
          querySnapshot.forEach(doc=>{
            const {post,postImg,postTime,timeperhr,name,number,email} = doc.data()
            list.push({
              id:doc.id,
              post:post,
              postImg:postImg,
              postTime:postTime,
              timeperhr:timeperhr,
              name:name,
              number:number,
              email:email

            })
          })
        })
        console.log('Posts',list.length);
        setPosts(list)

        if(loading){
          setLoading(false)
        }

      }
      catch(e){
        console.log(e);
      
      }
    }
    fetchPost()

  },[])


  return (
    
    <View style={styles.container}>
      <Text style={{textAlign:"center",fontSize:25,padding:10}}>Tools</Text>
      <FlatList
      data={posts}
      renderItem={({item})=>
      <Background>
      <View style={styles.androidLarge1}>
        <View style={styles.cardView}>
          <View style={styles.rectangleView} />
          <Image
            style={styles.rocksWaterPlanets157183384Icon}
            resizeMode="cover"
            source={{uri:item.postImg}}
          />
          <Text style={styles.tractorText}>{item.post}</Text>
          <Text style={styles.hourText}>{item.timeperhr} / Hour</Text>
          <Text style={styles.contactNo918392942424}>
            Contact No: {item.number}
          </Text>
          <Text style={styles.emailBsjefgmailcomText}>
            Email: {item.email}
          </Text>
          <Text style={styles.nameLucusText}>Name: {item.name}</Text>
        </View>
      </View>
      </Background>
    }
    keyExtractor={item=>item.id}
    showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rectangleView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
  },
  rocksWaterPlanets157183384Icon: {
    position: "absolute",
    height: "52.11%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "47.89%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  tractorText: {
    position: "absolute",
    top: "53.8%",
    left: "39.45%",
    fontSize: 20,
    color: "#000",
    textAlign: "left",
  },
  hourText: {
    position: "absolute",
    top: "62.25%",
    left: "34.56%",
    fontSize: 20,
    color: "#000",
    textAlign: "left",
  },
  contactNo918392942424: {
    position: "absolute",
    top: "76.06%",
    left: "2.75%",
    fontSize: 15,
    color: "#000",
    textAlign: "left",
  },
  emailBsjefgmailcomText: {
    position: "absolute",
    top: "88.45%",
    left: "2.75%",
    fontSize: 15,
    color: "#000",
    textAlign: "left",
  },
  nameLucusText: {
    position: "absolute",
    top: "82.25%",
    left: "2.75%",
    fontSize: 15,
    color: "#000",
    textAlign: "left",
  },
  cardView: {
    width: 327,
    height: 355,
  },
  androidLarge1: {
    alignItems:"center",
    backgroundColor: "#fff",
    flex: 1,
    height: 450,
    overflow: "hidden",
  },
});






