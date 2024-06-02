import * as React from "react"
import { View, ScrollView, Text, Image } from "react-native"
import Header from "../components/Header"

export default function PostItem({ navigation, route }){

  const { data } = route.params

  return (
    <View>
      <Header navigation={navigation}/>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.images.map((image) => <Image key={image} source={{uri: image}} className={"m-2 rounded-xl w-[300px] h-[300px]"}/>)}
      </ScrollView>
      <Text className={"font-InterSemiBold text-2xl mx-4"}>
        {data.title}
      </Text>
      <Text className={"font-InterSemiBold text-2xl ml-6"}>
        R$ {data.price}
      </Text>
      <Text className={"font-InterRegular text-base ml-6"}>
        Descrição:
        {data.description}
      </Text>
    </View>
  )
}