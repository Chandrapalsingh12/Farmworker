import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../config';

const RentItemUser = () => {
  const [deals, setDeals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeals = async () => {
    try {
      const dealsSnapshot = await firestore().collection('Deals').get();
      const dealsData = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeals(dealsData);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDeals();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const confirmDeleteDeal = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this deal?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteDeal(id),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteDeal = async (id) => {
    try {
      await firestore().collection('Deals').doc(id).delete();
      fetchDeals();
    } catch (error) {
      console.error('Error deleting deal:', error);
    }
  };

  const renderDealItem = ({ item }) => (
    <View style={styles.dealItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.postImg }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone Number: {item.phoneNumber}</Text>
        <Text>Address: {item.address}</Text>
        <Text>Pincode: {item.pinCode}</Text>
        <Text>Hours: {item.hours}</Text>
        <View
          style={[
            styles.paymentStatus,
            { backgroundColor: item.paymentComplete ? '#28a745' : 'red' },
          ]}
        >
          <Text style={styles.paymentStatusText}>
            {item.paymentComplete ? 'Payment Complete' : 'Payment Pending'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => confirmDeleteDeal(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deals:</Text>
      <FlatList
        data={deals}
        renderItem={renderDealItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default RentItemUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dealItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  paymentStatus: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
  },
  paymentStatusText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
