import { StyleSheet,ScrollView, Text, View } from "react-native";

export function HorizontalCard({heading}){
    const styles=StyleSheet.create({
        headingText:{
            fontSize:24,
            fontWeight: 'bold',
            paddingHorizontal:8
        },
        container:{
            padding:8,
        },
        card:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            width:300,
            height:200,
            borderRadius:4,
            margin:8
        },
        cardHorizontal:{
            backgroundColor: '#1c1c2e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
        }
    })
    return(
        <View>
            <Text className="text-2xl pt-5 font-psemibold text-white">{heading}</Text>
            <ScrollView horizontal={true} style={styles.container}>
                <View style={[styles.card,styles.cardHorizontal]}>
                    <Text>Topic 1</Text>
                </View>
                <View style={[styles.card,styles.cardHorizontal]}>
                    <Text>Topic 2</Text>
                </View>
                <View style={[styles.card,styles.cardHorizontal]}>
                    <Text>Topic 3</Text>
                </View>
                <View style={[styles.card,styles.cardHorizontal]}>
                    <Text>Topic 4</Text>
                </View>
            </ScrollView>
        </View>
    )

}