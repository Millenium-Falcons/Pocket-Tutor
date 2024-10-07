import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View, TouchableOpacity, Modal, StyleSheet, Animated, Dimensions, BackHandler } from "react-native";
import { HorizontalCard } from "../../components/HorizontalCard";
import { images } from "../../constants";
import { SearchInput } from "../../components";
import { useNavigation } from '@react-navigation/native';

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearchPageVisible, setIsSearchPageVisible] = useState(false);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([
    "Search Result 1",
    "Search Result 2",
    "Search Result 3",
    "Search Result 4",
    "Search Result 5"
  ]); // This should be fetched from the backend
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (isSearchPageVisible) {
        setIsSearchPageVisible(false);
        return true; // Prevent default behavior (exit app)
      }
      return false; // Allow default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isSearchPageVisible]);

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

  const handleSearchFocus = () => {
    setIsSearchPageVisible(true);
  };

  const handleSearchBlur = () => {
    // Do not set isSearchResultsVisible to false here
  };

  const handleSearchResultClick = () => {
    navigation.navigate('/course');
  };

  const handleSearchInputChange = (text) => {
    if (text.length > 0) {
      setIsSearchResultsVisible(false);
    }
  };

  const handleSearch = (query) => {
    // Fetch search results from the backend using the query
    setIsSearchResultsVisible(true);
  };

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      {isSearchPageVisible ? (
        <View style={styles.searchPage}>
          <SearchInput onFocus={handleSearchFocus} onBlur={handleSearchBlur} onChangeText={handleSearchInputChange} onSearch={handleSearch} />
          {/* Dynamic search page content */}
          {isSearchResultsVisible && (
            <View style={styles.searchResults}>
              {searchResults.map((result, index) => (
                <TouchableOpacity key={index} onPress={handleSearchResultClick} style={styles.searchResultBox}>
                  <Text style={styles.searchResultText}>{result}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ) : (
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
              <SearchInput onFocus={handleSearchFocus} onBlur={handleSearchBlur} onChangeText={handleSearchInputChange} onSearch={handleSearch} />
              <View style={styles.welcomeBox}>
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
              </View>
              <HorizontalCard heading="Revision Time"></HorizontalCard>
            </View>
          )}
        />
      )}
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
  searchPage: {
    flex: 1,
    backgroundColor: '#10101c', // Changed background color
    padding: 20,
  },
  searchResults: {
    marginTop: 20,
    backgroundColor: '#1c1c2e', // Changed background color
    padding: 10,
    borderRadius: 10,
  },
  searchResultBox: {
    backgroundColor: '#2c2c3e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchResultText: {
    fontSize: 18,
    color: '#fff', // Changed text color to white
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    color: '#007BFF',
  },
});

export default home;