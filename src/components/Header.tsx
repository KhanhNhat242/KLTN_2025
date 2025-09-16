import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

interface Props {
  headerTxt: string
}

const Header = ({ headerTxt }: Props) => {
  const router = useRouter()

  return (
    <View className='w-full h-[10vh] pt-[10%] bg-[#1677FF] flex-row justify-between items-center'>
        <TouchableOpacity>
            <Text className='text-white pl-[10px]' onPress={() => router.back()}>{'<'}</Text>
        </TouchableOpacity>
        <Text className='text-white font-bold text-[20px]'>{headerTxt}</Text>
        <Text className='text-[#1677FF] pr-[10px]'>{'>'}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})