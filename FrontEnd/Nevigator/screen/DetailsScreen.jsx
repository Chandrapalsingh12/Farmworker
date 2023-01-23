import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity,Image,ScrollView,RefreshControl,ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Background from '../../components/Background';
import Header from '../../components/Header';


export default function DetailsScreen() {
  const[image,setImage] = useState(null)
  const[disease,setDisease] = useState('')
  const[cure,setCure] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const[loading,setLoading] = useState(false)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setRefreshing(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
    setRefreshing(false);
};
// console.log(image.uri);

const handelModel = async(e)=>{
  setLoading(true)
  var data = new FormData();
    data.append('images', {
      uri: image.uri, // your file path string
      name: image.uri,
      type: 'image/jpgeg'
    })  
  // let formData = new FormData()work
  //   formData.append('images', image.uri)

  //   console.log(formData);
    await fetch('ENTER_FLASK_SERVER_URL/image', {
      method: 'POST',
      body: data,
      mode:'cors',
  }).then (data => data.json()) 
    .then (data => {
      setDisease(data.Disease)
      setCure(data.Cure)
      setLoading(false)
    })
    .catch((error) => {
      alert("Somthing Went wrong please choose another image.")
      setLoading(false)       
      setImage(null)
    })
}



if (loading===true) {
  return <SafeAreaView style={styles.loading}>
    <ActivityIndicator size="large" />
    </SafeAreaView>;
}





return (
  <Background>
    <SafeAreaView style={styles.container}>
    <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {  setImage(null),setCure(null),setDisease(null) }} 
            refreshing={refreshing}
          />}
      >
     <Header>Model Prediction</Header>
     {image ?<Text></Text> :
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.caption}>Pick an image</Text>
      </TouchableOpacity>    
    }  


    <View style={styles.imageContainer}>
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}

      <TouchableOpacity style={styles.uploadButton} onPress={handelModel}>
        <Text style={styles.caption}>Predict</Text>
      </TouchableOpacity> 
    </View>

    <Text style={{fontSize:30,fontWeight:"bold"}}>{disease}</Text>
    <Text>{cure}</Text>
    </ScrollView>


    </SafeAreaView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  caption:{
    color: "#fff",
    fontSize: 14
  },
  uploadButton:{
    backgroundColor: "#212121",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop:15,
    height:30,
    width:150
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})