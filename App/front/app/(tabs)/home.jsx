import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View, TouchableOpacity, Modal, StyleSheet, Animated, Dimensions } from "react-native";
import { HorizontalCard } from "../../components/HorizontalCard";
import { images } from "../../constants";
import { SearchInput } from "../../components";
import { useNavigation } from '@react-navigation/native';

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleLogoClick = () => {
    navigation.navigate('profile');
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  User
                </Text>
              </View>

              <TouchableOpacity className="mt-1.5" onPress={handleLogoClick}>
                <Image
                  source={images.logoSmall}
                  className="w-7 h-10"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <SearchInput />
            <View style={styles.welcomeBox}>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
            </View>
            <Text className="text-2xl font-psemibold text-white">
                  Continue with...
            </Text>
            <View style={styles.welcomeBox}>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
              <Text style={styles.welcomeText}>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </Text>
            </View>
            <HorizontalCard heading="Revision Time"></HorizontalCard>
          </View>
        )}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>NAME and stuffs</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  welcomeBox: {
    backgroundColor: '#1c1c2e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default home;