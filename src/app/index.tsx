import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {

  const router = useRouter()
  
  useEffect(() => {
    router.push('/(tabs)/home')
  })

  return (
    <SafeAreaView>
      <View className=" w-full h-full flex-column items-center justify-center">
        <Text>hello world</Text>
        {/* <Image 
          source={require("../../assets/mainlogo.png")} 
          className="w-[140px] h-[40px]" 
        />
        <Text className="text-[30px] mt-4">Welcome to RideHub!</Text>
        <View className="w-full h-[20%] justify-between mt-8 px-5">
          <TouchableOpacity className="w-full bg-[#1677FF] p-4 rounded-lg">
            <Link href="/(auth)/login" className="text-white text-center text-lg">
              Đăng nhập
            </Link>
          </TouchableOpacity>
          <TouchableOpacity className="w-full bg-[#1677FF] p-4 rounded-lg">
            <Link
              href={{ pathname: "/signup", params: { step: 1 } }}
              className="text-white text-center text-lg"
            >
              Đăng ký
            </Link>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
