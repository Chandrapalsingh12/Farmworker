import { View, Text, TouchableOpacity,StyleSheet, Alert,Image } from 'react-native'
import React, { useRef, useState,useEffect } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config'
import firebase from 'firebase/compat/app';

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { auth } from '../config';
// import { useNavigation } from '@react-navigation/native';


const Home = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber(`+91${phoneNumber}`, recaptchaVerifier.current)
          .then(setVerificationId);
          setPhoneNumber('');
          if(phoneNumber.length===10){
            alert(`OTP Send To Your +91${phoneNumber} Mobile Number `)
          }
          else{
            alert(`Please Check Your Mobile Number `)
          }
    };

    const confirmCode = () => {
      navigation.navigate('Main')
     auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('Main')
        }
      })
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          code
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => {
            setCode('');                     
        })
        .catch((error) => {
          alert("Please Enter Mobile Number and Conformation Code");
          // navigation.navigate('Main')
        })       
    };
    

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('Main')
          Alert.alert(
            'Login Successful. Welcome to Dashboard.',
            );
        }
      })
      return unsubscribe
    }, [])
  

    return (
      
      <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
      />
      <TextInput
        label="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="number-pad" 
        autoCompleteType="tel"       
      />
      <Button mode="contained" onPress={sendVerification}>
      Send Verification
      </Button>
      <TextInput
        label="Confirmation Code"
        onChangeText={setCode}
        keyboardType="number-pad"
      />

      <Button mode="contained" onPress={confirmCode}>
      Confirm Verification
      </Button>
      
      <Button mode="contained" title="Admin Login" onPress={() =>
        navigation.navigate('LoginScreen')
      }>Admin Login</Button>     
    </Background>
    )
}

export default Home

const styles = StyleSheet.create({});



// 