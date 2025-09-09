import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface Props {
  returnDate: boolean,
}

const FromDate = (
  <View className='w-full h-[60px] flex-row bg-white p-[10px] rounded-[10px] mt-[10px]'>
      <Image source={require('../../../assets/fromicon.png')} className="w-[40px] h-[40px]" />
      <View className="w-[50%] h-full ml-[6px]">
        <Text>Ngày đi</Text>
        <Text className='font-bold'>12/12/2025</Text>
      </View>
  </View>
)

const FromtoDate = (
  <View className="w-full h-[150px] bg-white p-[10px] flex-row items-center rounded-[10px] mt-[10px]">
    <Image source={require('../../../assets/fromtoicon.png')} className="w-[40px] h-full mr-[10px]" />
    <View className="w-[85%] h-full justify-between">
      <View className="h-[38%] justify-between">
        <Text>Ngày đi</Text>
        <Text className='font-bold'>12/11/2025</Text>
      </View>
      <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
      <View className="h-[38%] justify-between">
        <Text>Ngày về</Text>
        <Text className='font-bold'>12/12/2025</Text>
      </View>
    </View>
  </View>
)

const Content = ({ returnDate }: Props) => {
  return (
    <View>
      <View className="w-full h-[150px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
        <Image source={require('../../../assets/locationicon.png')} className="w-[40px] h-full" />
        <View className="w-[70%] h-full justify-between">
          <View className="h-[38%] justify-between">
            <Text>Từ</Text>
            <TextInput placeholder="Chọn điểm đi..." />
          </View>
          <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
          <View className="h-[38%] justify-between">
            <Text>Đến</Text>
            <TextInput placeholder="Chọn điểm đến..." />
          </View>
        </View>
        <Image source={require('../../../assets/swapicon.png')} className="size-[40px]" />
      </View>
      {returnDate ? FromtoDate : FromDate}
      <View className="w-full h-[60px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
        <Image source={require('../../../assets/numpeople.png')} className="w-[40px] h-full" />
        <View className="flex-1 ml-[6px]">
          <Text>Số hành khách</Text>
          <Text className="font-bold">Chọn số người đi</Text>
        </View>
        <View className="w-[20%] h-[50%] flex-row justify-between">
          <TouchableOpacity className="bg-[#ccc] rounded-[5px] px-[5px]">
            <Text className="text-white text-center">-</Text>
          </TouchableOpacity>
          <Text>10</Text>
          <TouchableOpacity className="bg-[#1677FF] rounded-[5px] px-[5px]">
            <Text className="text-white text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({})