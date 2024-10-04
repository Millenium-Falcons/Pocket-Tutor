import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { SubHeading } from "../../components/SubHeading";
import { CustomButton2 } from "../../components/CustomButton2";

const profile = () => {
  const time="24hr"
  return (
    <SafeAreaView className=" px-4 my-6 bg-primary h-full">
      
      <View className="flex justify-center items-center">
      <View className="flex items-center justify-center">
      <Heading label="My Profile" color="white"></Heading>
      <Image
        className="w-48 h-48 my-4 rounded-full"
        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcbdtMbkhrGRrYbhcTszvQzHUfnu15PUCE6HwEt67shI6D358m42GHwqltL-INRM35II&usqp=CAU'}}
      />
      <View className="flex item-center justify-center"><Text className="text-2xl font-psemibold text-white">Cristiano Ronaldo</Text></View>
      
      </View>
      </View>
      <View className="my-4">
        <SubHeading label={`Time in app:  ${time}`}></SubHeading>
        <CustomButton2 label="Course Suggestions"></CustomButton2>
        <CustomButton2 label="Enrolled Courses"></CustomButton2>
        </View>
    </SafeAreaView>
  );
};

export default profile;