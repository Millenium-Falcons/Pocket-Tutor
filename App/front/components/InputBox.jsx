import { Text, TextInput, View } from "react-native";
export function InputBox({ label, placeholder, value, onChange, width}){
    return(
        <View className="mx-1">
            <View className="text-sm font-medium text-left py-2">
                <Text className="mb-2">{label}</Text>
            </View>
                <TextInput placeholder={placeholder} value={value} onChangeText={onChange} className={`w-${width} px-2 py-1 border rounded border-slate-200 bg-zinc-300 border-solid border-1 border-neutral-500`}></TextInput>
            
        </View>
    )
}