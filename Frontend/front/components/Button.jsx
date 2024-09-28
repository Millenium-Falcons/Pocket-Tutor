import { TouchableOpacity,Text } from "react-native";

export function Button({label,onPress}){
    return(
        
        <TouchableOpacity onPress={onPress} className="bg-cyan-400 items-center justify-center p-4 w-96"><Text className="font-bold">{label}</Text></TouchableOpacity>
        
    )
}