import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {

  const router = useRouter()
  
  useEffect(() => {
    setTimeout(() => router.push('/(tabs)/account'), 3000)
  },[])

  return (
    <SafeAreaView>
      <View className=" w-full h-full flex-column items-center justify-center">
        <Text>hello world</Text>
      </View>
    </SafeAreaView>
  );
}
