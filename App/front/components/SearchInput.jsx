import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery, onFocus, onBlur, onChangeText, onSearch }) => {
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if (query === "") {
      return Alert.alert(
        "Missing Query",
        "Please input something to search results across database"
      );
    }

    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a new course"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => {
          setQuery(e);
          if (onChangeText) {
            onChangeText(e);
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;