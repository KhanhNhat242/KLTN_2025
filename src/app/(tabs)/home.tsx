import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {
  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/homebg.png')} className='w-full h-[50%] rounded-b-[10px]'>
        <View className='flex-1 p-[5px]'>
          <Text className='text-white text-[20px]'>Bạn muốn đi đâu, Nguyên?</Text>
          <View className='flex-row rounded-[10px] bg-white p-[3px] mt-[10px]' >
            <TouchableOpacity className='w-[50%] bg-[#1677FF] rounded-[10px] p-[5px]'>
              <Text className='text-center text-white'>Một chiều</Text>
            </TouchableOpacity>
            <TouchableOpacity className='w-[50%] rounded-[10px] p-[5px]'>
              <Text className='text-center'>Khứ hồi</Text>
            </TouchableOpacity>
          </View>
          <View className=' w-full h-[150px] bg-white p-[10px] flex-row justify-between items-center flex rounded-[10px] mt-[10px]'>
            <Image source={require('../../../assets/locationicon.png')} className='w-[40px] h-full' />
            <View className='w-[70%] h-full justify-between'>
              <View className='h-[38%] justify-between'>
                <Text>Từ</Text>
                <TextInput placeholder='Chọn điểm đi...' />
              </View>
                <Image source={require('../../../assets/line.png')} className='w-full h-[2px]' />
              <View className='h-[38%] justify-between'>
                <Text>Đến</Text>
                <TextInput placeholder='Chọn điểm đến...' />
              </View>
            </View>
            <Image source={require('../../../assets/swapicon.png')} className='size-[40px]' />
          </View>
          <View></View>
          <View></View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})