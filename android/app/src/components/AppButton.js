import React from "react"
import { View,Text,TouchableOpacity } from "react-native"




function AppButton (Prop) {

   const {title,buttonStyle,textStyle,onPress} = Prop

    return (
        <TouchableOpacity onPress={onPress} style={{borderWidth:1,borderColor:"black",width:"90%",borderRadius:10,padding:10,backgroundColor:"#a8aada",...buttonStyle}} >
                <Text style={{textAlign:"center",fontSize:20,color:"black",fontWeight:"500",...textStyle}} >{title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton