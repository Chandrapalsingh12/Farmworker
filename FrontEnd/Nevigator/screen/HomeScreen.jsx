import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";

export default function HomeScreen() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchPosts = async () => {
    try {
      const list = [];
      await firebase
        .firestore()
        .collection("posts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              post,
              postImg,
              postTime,
              timeperhr,
              name,
              number,
              email,
            } = doc.data();
            list.push({
              id: doc.id,
              post: post,
              postImg: postImg,
              postTime: postTime,
              timeperhr: timeperhr,
              name: name,
              number: number,
              email: email,
            });
          });
        });
      setPosts(list);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

  const onAddToCart = (product) => {
    console.log(product.id);
    if (product.status === "sold out") {
      Alert.alert("Product is already sold out");
      return;
    }
    // update the product status to 'sold out'
    firebase.firestore().collection("Posts").doc(product.id).update({});
    Alert.alert(`Success! ${product.post} has been purchased`);
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 25, padding: 10 }}>
        Tools
      </Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Background>
            <View style={styles.androidLarge1}>
              <View style={styles.cardView}>
                <View style={styles.rectangleView} />
                <Image
                  style={styles.rocksWaterPlanets157183384Icon}
                  resizeMode="cover"
                  source={{ uri: item.postImg }}
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
              <TouchableOpacity
                style={styles.rentNowButton}
                onPress={() => navigation.navigate("RentItemScreen", { item })}
              >
                <Text style={styles.rentNowButtonText}>Rent Now</Text>
              </TouchableOpacity>
            </View>
          </Background>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
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
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    height: 450,
    overflow: "hidden",
  },
  rentNowButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  rentNowButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
