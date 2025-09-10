import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
    imgsrc: ImageSourcePropType,
    txt: string,
}

const Button = ({ imgsrc, txt }: Props) => {
  return (
    <View className='w-full h-[50px] flex-row justify-between items-center mt-[5px] mb-[5px]'>
        <View className='w-[70%] flex-row items-center'>
            <Image source={imgsrc} className='size-[40x] mr-[5px]' />
            <Text>{txt}</Text>
        </View>
        <Text className='text-[#ccc]'>{'>'}</Text>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({})