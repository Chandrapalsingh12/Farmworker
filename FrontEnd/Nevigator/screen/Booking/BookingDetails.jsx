import React, { useState,useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { auth,firebase } from "../../../config";
import { useNavigation } from "@react-navigation/native";


export default function BookingDetails({ route }) {
  const { item } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [hours, setHours] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const [errors, setErrors] = useState([]);  // <-- Add state for errors

  const navigation = useNavigation()

  const handleCalculatePayment = () => {
    const ratePerHour = item.timeperhr;
    const parsedHours = parseFloat(hours);
    const payment = ratePerHour * parsedHours;
    setTotalPayment(payment);
  };

  const validateForm = () => {  // <-- Add validation function
    let errs = [];

    if (!name || !name.trim()) {
      errs.push("Name is required");
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      errs.push("Phone number is required");
    } else if (isNaN(phoneNumber.trim())) {
      errs.push("Phone number should be a number");
    }

    if (!email || !email.trim()) {
      errs.push("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.push("Email is invalid");
    }

    if (!address || !address.trim()) {
      errs.push("Address is required");
    }

    if (!pinCode || !pinCode.trim()) {
      errs.push("Pin code is required");
    } else if (isNaN(pinCode.trim())) {
      errs.push("Pin code should be a number");
    }

    if (!hours || !hours.trim()) {
      errs.push("Number of hours is required");
    } else if (isNaN(hours.trim())) {
      errs.push("Number of hours should be a number");
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.navigate('CheckDetails',{
        name,
        email,
        phoneNumber,
        address,
        pinCode,
        hours,
        totalPayment: totalPayment,
        "postName":item.post,
        "postId": item.id,
        "postImg":item.postImg
      });

    }
  };
  

  useEffect(() => {
    handleCalculatePayment();
  }, [hours]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Booking Details:</Text>
      {errors.map((error, i) => (  // <-- Display errors if any
        <Text key={i} style={{ color: "red" }}>
          {error}
        </Text>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Pin Code"
        value={pinCode}
        onChangeText={setPinCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Hours"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
      />
      <Text style={styles.paymentText}>Total Payment: {totalPayment} INR</Text>
      <TouchableOpacity style={styles.calculateButton} onPress={handleSubmit}>
        <Text style={styles.calculateButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  },
  paymentText: {
    fontSize: 16,
    marginTop: 20,
  },
});
