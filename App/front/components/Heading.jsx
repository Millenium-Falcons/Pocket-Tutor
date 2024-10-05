import { Text, View } from "react-native";
export function Heading({label,color}){
return(
    <View>
        <Text className={`text-2xl text-${color} font-psemibold`}>{label}</Text>
    </View>
)
}