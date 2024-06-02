import * as React from "react"
import { Image, View, ScrollView, Text, TouchableWithoutFeedback } from "react-native"

export default function PostCard({ navigation, data }){
  
  const handlePress = ()=>{
    navigation.push("PostItem", {data: data})
  }


  return (
    
      <View className={"flex flex-col bg-white rounded-2xl overflow-hidden m-3"}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.images.map((image) => 
            (<TouchableWithoutFeedback key={image} onPress={handlePress}>
              <Image source={{uri: image}} className={"m-2 rounded-xl w-[300px] h-[300px]"}/>
            </TouchableWithoutFeedback>)
          )}
        </ScrollView>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View>
            <Text className={"font-InterSemiBold text-lg mx-4"}>
              {data.title}
            </Text>
            <Text className={"font-InterSemiBold text-base ml-6 mb-4"}>
              R$ {data.price}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
  )
}