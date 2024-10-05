import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Text className="text-3xl text-white font-bold text-center">
            <Text className="text-secondary-200">Pocket Tutor</Text>
          </Text>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              When learning meets{"\n"}
              AI{" "}
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Embark on a Journey of Limitless Exploration with Pocket Tutor
          </Text>
          <CustomButton
            title="Sign In"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
