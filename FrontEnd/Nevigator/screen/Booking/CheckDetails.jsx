
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase, auth } from "../../../config";
import { StripeProvider,useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/core";
import Payment from "../../../components/Payment";

const CheckDetails = ({ route }) => {
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
  } = route.params;
  const stripe = useStripe();

  const Navigation = useNavigation()


  const sendEmail = () => {
    // API endpoint to send the email
    const endpoint = 'http://192.168.1.4:5000/sendmail';

    // Request payload
    const payload = {
      email: "rajphut1699@gmail.com",
    };

    // Send a POST request to the API
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Email sent successfully');
        } else {
          Alert.alert('Failed to send email');
        }
      })
      .catch((error) => {
        console.error('Error sending email: ', error);
        Alert.alert('Failed to send email');
      });
  };


  const deletePost = () => {
    // Get a reference to the Firestore collection
    const postRef = firebase.firestore().collection('posts');
    
  
    // Use the post ID to delete the post
    postRef.doc(postId).delete()
      .then(() => {
        console.log('Post successfully deleted!');
        // sendEmail()
      })
      .catch((error) => {
        console.error('Error removing post: ', error);
      });
  };

  const handelPayment = async () => {
    try {
      const finalAmount = parseInt(totalPayment);
      if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
      const response = await fetch("http://192.168.1.4:5000/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: finalAmount, name }),
      });
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName:name
      });
      // if (initSheet.error) {
      //   console.error(initSheet.error);
      //   return Alert.alert(initSheet.error.message);
      // }
      // const presentSheet = await stripe.presentPaymentSheet({
      //   clientSecret: data.clientSecret,
      // });
      // if (presentSheet.error) {
      //   console.error(presentSheet.error);
      //   return Alert.alert(presentSheet.error.message);
      // }
      Alert.alert("Payment Successful .");
      deletePost()
      Navigation.navigate("HomeScreen")
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };



  return (
    <StripeProvider publishableKey="pk_test_51NBWeoSGaf7IYU0qxHRH66MCEK28rfi6aHpyGKkW5rooqJdSUGv3Oh5O2vbjlTqYs8WtYpou37JdsT9j4PBNdQh600umj1LVE6">
      {/* <View style={styles.container}>
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


        <TouchableOpacity style={styles.calculateButton} onPress={handelPayment} >
          <Text style={styles.calculateButtonText}>Make Payment</Text>
        </TouchableOpacity>
      </View> */}
      <Payment route={route} />
    </StripeProvider>
  );
};

export default CheckDetails;

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
