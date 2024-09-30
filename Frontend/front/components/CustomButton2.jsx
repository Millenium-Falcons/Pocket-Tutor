import { Text, TouchableOpacity } from "react-native";

export function CustomButton2({label,onPress}){
    return(
        <TouchableOpacity className="bg-gray-700 p-4 my-5 rounded" onPress={onPress}>
        <Text className="text-2xl text-white font-psemibold">{label}</Text>
      </TouchableOpacity>
    )
}