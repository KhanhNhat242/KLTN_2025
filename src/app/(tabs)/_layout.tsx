import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='home' />
      <Tabs.Screen name='bookticket' />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})