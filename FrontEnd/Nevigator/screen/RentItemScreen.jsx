import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";

export default function RentItemScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleBookNow = () => {
    navigation.navigate("BookingDetails", { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Details:</Text>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: item.postImg }}
      />
      <Text style={styles.details}>Post: {item.post}</Text>
      <Text style={styles.details}>Time per Hour: {item.timeperhr}</Text>
      <Text style={styles.details}>Contact No: {item.number}</Text>
      <Text style={styles.details}>Email: {item.email}</Text>
      <Text style={styles.details}>Name: {item.name}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign:"center"
  },
});
