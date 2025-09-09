import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Input from '../../components/signup/Input'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

type RootStackParamList = {
  Signup: {
    step: number,
  }
}

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white px-2">
      <View className="flex-1 justify-between pb-5">
        <Image 
          source={require('../../../assets/mainlogo.png')} 
          className="w-[130px] h-[35px]" 
          resizeMode="contain"
        />
        <View className="h-[18%] justify-between">
          <Text className="text-[40px] font-bold leading-[42px]">
            Đăng nhập vào tài khoản của bạn
          </Text>
          <Text className="text-gray-500">
            Vui lòng nhập email và mật khẩu để tiếp tục.
          </Text>
        </View>
        <View className="h-[15%] justify-between">
          <Input 
            header="Email" 
            placeholder="abcd@gmail.com" 
            imgsrc={require('../../../assets/emailIcon.png')} 
            eyeIcon={false} 
            value={email} 
            onchange={setEmail} 
            type="email-address" 
          />
          <Input 
            header="Mật khẩu" 
            placeholder="Nhập mật khẩu" 
            imgsrc={require('../../../assets/pwdIcon.png')} 
            eyeIcon={true} 
            value={password} 
            onchange={setPassword} 
            type="default" 
          />
        </View>
        <Link
          href={{
            pathname: '/forgotpassword',
            params: { step: 1 },
          }}
          className="text-right font-bold text-[#1677FF]"
        >
          Quên mật khẩu?
        </Link>
        <View className="h-[20%] justify-between">
          <TouchableOpacity 
            className="rounded-lg bg-[#1677FF] p-3"
            onPress={() => {
              alert('login successful')
              router.push('/(tabs)/home')
            } 
          }>
            <Text className="text-center text-white">Đăng nhập</Text>
          </TouchableOpacity>

          <Text className="text-center">Hoặc</Text>

          <TouchableOpacity 
            className="w-full flex-row items-center justify-center rounded-lg border border-gray-300 p-3"
            onPress={() =>alert('login successful')}>
            <Image 
              source={require('../../../assets/googleIcon.png')} 
              className="w-4 h-5"
              resizeMode="contain"
            />
            <Text className="ml-2">Đăng nhập với Google</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Text>Bạn chưa có tài khoản?</Text>
          <Link
            href={{
              pathname: '/signup',
              params: { step: 1 },
            }}
            className="font-bold text-[#1677FF]"
          >
            {' '}Tạo tài khoản ngay!
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
