import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const home = () => {

  const router = useRouter()

  useEffect(() => { 
    router.push('/home')
  })

  return (
    <Text>hello world</Text>
  )
}

export default home

const styles = StyleSheet.create({})