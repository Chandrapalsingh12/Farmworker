import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View,SafeAreaView,Image,Alert,ScrollView,RefreshControl, ActivityIndicator} from 'react-native'
import { auth,firebase } from '../../config'
import * as ImagePicker from 'expo-image-picker';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import AuthInp from '../../components/AuthInp';



export default function Admin({navigation}) {
  // const navigation = useNavigation()
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [post,setPost] = useState()
  const[time,setTime] = useState()
  const[name,setName] = useState()
  const[number,setNumber] = useState()
  const[email,setEmail] = useState(auth.currentUser?.email)
  const [refreshing, setRefreshing] = useState(false);
  const[loading,setLoading] = useState(false)

  

 

    const pickImage = async () => {
      setRefreshing(true)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        const source = { uri: result.uri };
        setImage(source);
        setRefreshing(false)

    };

    const submitPost = async()=>{
      if(image===null || post===null || name===null || number==null || email===null){
        alert("Please Upload Image or Enter the Input Values")
      }
      else{
      setLoading(true)
      const imgUrl = await uploadImage()

      firebase.firestore()
      .collection('posts')
      .add({userId: auth.currentUser.uid,
        email:email,
        post:post,
        postImg:imgUrl,
        timeperhr:time,
        name:name,
        number:number,
        postTime: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(()=>{
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
        setPost(null)
        setName(null)
        setNumber(null)
        setTime(null)
        setEmail(auth.currentUser?.email)
        setLoading(false)

      })
      .catch((error)=>{
        console.log('Something went wrong with added post to firestore.', error);
      })
    }

    }


    const uploadImage = async () => {
    


      setUploading(true);

      // const uploadUri = image;
      // let filename = uploadUri.uri.substring(image.uri.lastIndexOf('/') + 1);
      // const extension = filename.split('.').pop(); 
      // const name = filename.split('.').slice(0, -1).join('.');
      // filename = name + Date.now() + '.' + extension;
      

      // const storageRef = firebase.storage().ref(`photos/${filename}`)
      // const task = storageRef.put(uploadUri);
      const response = await fetch(image.uri)
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
      const storageRef = firebase.storage().ref().child(filename)
      var task = storageRef.put(blob);

      try {
        await task;
        const url = await  storageRef.getDownloadURL()
        console.log(url);

        setUploading(false);
        setImage(null);

        return url

      } catch (e) {
        console.error(e);
      }
      
     
    };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }


  if (loading===true) {
    return <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
      </SafeAreaView>;
  }
  
  

  return (
    <ScrollView  refreshControl={
      <RefreshControl 
        onRefresh={() => { setImage(null) }} 
        refreshing={refreshing}
      />}> 
    <SafeAreaView style={styles.container}>
    <Background>
    <Header>Upload Tools Details </Header>
    <Button onPress={pickImage}>Pick Image</Button>
    {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />}
    <AuthInp
      label="Enter Product Name"
      value={post}       
      onChangeText={(content)=>setPost(content)}
    />
    <AuthInp
      label="Enter Time Per Hour"
      value={time}
      onChangeText = {(content)=>setTime(content)} 
      keyboardType="numeric"       
    />
    <AuthInp
      label="Enter Your Name"
      value={name}
      onChangeText = {(content)=>setName(content)}
    />
    <AuthInp
    placeholder='Enter Your Contact Number'
    value={number}
    onChangeText = {(content)=>setNumber(content)}
    />

    {setEmail=="null"?
    <AuthInp
    placeholder='Email'
    value={email}
    onChangeText = {(content)=>setEmail(content)}
    />:
    <AuthInp
    placeholder='Email'
    value={email}
    />  
  }
    

  
    <Button onPress={submitPost} >Upload Post</Button>
  
    <Button mode="outlined" onPress={handleSignOut} >Sign out</Button>  
    
  </Background>
    </SafeAreaView>
    </ScrollView>  
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})