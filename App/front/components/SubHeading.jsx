import { View,Text } from "react-native";
export function SubHeading({label}){
    return(
        <View>
            <Text className={`text-xl text-white`}>{label}</Text>
        </View>
    )
}