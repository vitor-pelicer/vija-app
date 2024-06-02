import * as React from 'react'
import { Image, Text, View } from 'react-native'


export default function TypeProductCarousel({data}){

  return (
    <View className={"flex flex-col align-middle justify-center items-center bg-white  rounded-2xl mt-7 mx-3"}>
      <Image className={"h-[120px] w-[140px] rounded-xl m-2"} source={{uri: data.image}}/>
      <Text className={"font-InterSemiBold"}>
        {data.title}
      </Text>
    </View>
  )

}