import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from 'expo-document-picker';
import icons from "../../constants/icons";

const AI = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "AI response will appear here.", sender: "ai" }
  ]);

  const flatListRef = useRef(null);

  const handleQuerySubmit = () => {
    if (query.trim() === "") return;

    const newMessage = { id: Date.now().toString(), text: query, sender: "user" };
    const aiResponse = { id: (Date.now() + 1).toString(), text: "I will skibidi your toilet.", sender: "ai" };

    setMessages(prevMessages => [...prevMessages, newMessage, aiResponse]);
    setQuery("");
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newMessage = { 
          id: Date.now().toString(), 
          text: asset.name, 
          uri: asset.uri, 
          sender: "user", 
          isDocument: true 
        };
        const aiResponse = { id: (Date.now() + 1).toString(), text: "Document received.", sender: "ai" };

        setMessages(prevMessages => [...prevMessages, newMessage, aiResponse]);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.aiBubble]}>
      {item.isDocument ? (
        <TouchableOpacity onPress={() => Linking.openURL(item.uri)}>
          <Text style={[styles.messageText, styles.linkText]}>{item.text}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>AI</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={handleDocumentPick}>
          <Image source={icons.camera} style={styles.cameraButtonIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type your query here..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleQuerySubmit}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleQuerySubmit}>
          <Image source={icons.send} style={styles.sendButtonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10101c",
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 16,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: "#FFA001",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  cameraButton: {
    backgroundColor: "#FFA001",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButtonIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#FFA001",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#444",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#fff',
  },
});

export default AI;