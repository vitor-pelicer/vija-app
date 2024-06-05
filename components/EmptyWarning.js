import * as React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function EmptyWarning(){

  return (
    <View className={" items-center justify-center flex flex-col space-y-3 mt-10"}>
      <Image source={require("../assets/sad.png")} className={"w-[48px] h-[48px]"}/>
      <Text className={"font-InterRegular text-base text-[#F6B200]"}>Onde foi todo mundo?</Text>
      <Text className={"font-InterRegular text-base text-[#F6B200]"}>Parece que não tem nenhum anúncio ainda</Text>
    </View>
  )
}