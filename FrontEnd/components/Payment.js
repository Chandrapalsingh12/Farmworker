import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../config";
import { PaymentApiURL } from "../utilities/ApiAuth";
import { useNavigation } from "@react-navigation/native";

const Payment = ({ route }) => {
  const stripe = useStripe();
  const {
    name,
    email,
    phoneNumber,
    address,
    pinCode,
    hours,
    totalPayment,
    postName,
    postId,
    postImg
  } = route.params;

  const navigation = useNavigation()

  const deletePost = () => {
    // Get a reference to the Firestore collection
    const postRef = firebase.firestore().collection('posts');
    
  
    // Use the post ID to delete the post
    postRef.doc(postId).delete()
      .then(() => {
        console.log('Post successfully deleted!');
        navigation.navigate("HomeScreen")
        // sendEmail()
      })
      .catch((error) => {
        console.error('Error removing post: ', error);
      });
  };

  const subscribe = async () => {
    try {
      // sending request
      const response = await fetch(`${PaymentApiURL}/pay`, {
        method: "POST",
        body: JSON.stringify({ name, totalPayment }), // Include the 'amount' variable
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Luci",
      });
      if (initSheet.error)
        return Alert.alert("Something went wrong", initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error)
        return Alert.alert("Something went wrong", presentSheet.error.message);

      Alert.alert("Payment complete, thank you!");

      const firestore = firebase.firestore();
      await firestore.collection("Deals").add({
        name,
        email,
        phoneNumber,
        address,
        pinCode,
        hours,
        totalPayment,
        postName,
        postId,
        postImg,
        paymentComplete: true,
      });

      deletePost()
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details:</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
      <Text style={styles.text}>Address: {address}</Text>
      <Text style={styles.text}>Pin Code: {pinCode}</Text>
      <Text style={styles.text}>Hours: {hours}</Text>
      <Text style={styles.text}>Total Payment: {totalPayment}</Text>
      <Text style={styles.text}>Post Name: {postName}</Text>
      <Text style={styles.text}>Post ID: {postId}</Text>

      <TouchableOpacity style={styles.calculateButton} onPress={subscribe}>
        <Text style={styles.calculateButtonText}>Make Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  calculateButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  calculateButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  paymentText: {
    fontSize: 16,
    marginTop: 20,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
