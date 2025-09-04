import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

type RootStrackParamList = {
  Signup: {
    step: number,
  }
}

export default function HomeScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.navigate('Welcome')
  })

  return (
    <View>
      <Text>Hello world</Text>
    </View>
  )
}

const styles = StyleSheet.create({
});
