import React from "react";
import { Image, Text, View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { SubHeading } from "../../components/SubHeading";
import { CustomButton2 } from "../../components/CustomButton2";
const Profile = () => {
  const time = "24hr";
  
  // Mock login data - replace this with actual data from your backend
  const loginData = [
    "2023-04-01", "2024-09-11", "2023-04-05", "2023-04-06", "2023-04-09",
    "2023-04-10", "2023-04-12", "2023-04-15", "2023-04-17", "2023-04-20",
    "2023-04-22", "2023-04-24", "2023-04-26", "2024-09-20", "2024-09-30"
  ];
  const ActivityGraph = ({ loginDates }) => {
    const screenWidth = Dimensions.get('window').width - 32; // Full width minus padding
    const cellSize = screenWidth / 20; // Smaller cells for a more compact graph
    const weeks = 7; // Show 7 weeks of data for a more concise view
    const cells = Array.from({ length: 7 * weeks }, (_, index) => {
      const cellDate = new Date();
      cellDate.setDate(cellDate.getDate() - (7 * weeks - index - 1));
      const dateString = cellDate.toISOString().split('T')[0];
      const hasLoggedIn = loginDates.includes(dateString);
      return (
        <View
          key={index}
          style={{
            width: cellSize - 1,
            height: cellSize - 1,
            backgroundColor: hasLoggedIn ? '#FFA001' : 'rgba(255, 255, 255, 0.1)', // Green for logged in, transparent for not
            margin: 0.5,
            borderRadius: 2,
          }}
        />
      );
    });
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: screenWidth, justifyContent: 'center' }}>
        {cells}
      </View>
       );
      };
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#10101c' }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Heading label="My Profile" color="white" />
              <Image
                style={{ width: 192, height: 192, marginVertical: 16, borderRadius: 96 }}
                source={{ uri: 'https://example.com/placeholder-image.jpg' }}
              />
              <View>
                <Text style={{ fontSize: 24, fontWeight: '600', color: 'white' }}>FirstName LastName</Text>
              </View>
            </View>
            <View style={{ marginVertical: 16 }}>
              <SubHeading label={`Time in app: ${time}`} />
              <CustomButton2 label="Course Suggestions" />
              <CustomButton2 label="Enrolled Courses" />
            </View>
            <View style={{ marginVertical: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', marginBottom: 8 }}>Login Activity</Text>
              <ActivityGraph loginDates={loginData} />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    };
    export default Profile;