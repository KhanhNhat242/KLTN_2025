import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Input from '../../components/app/signup/Input'

type RootStackParamList = {
  Signup: {
    step: number,
  }
}

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [passsword, setPassword] = useState('')

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.wrapper}>
      <Image source={require('../../assets/images/mainlogo.png')} style={styles.mainlogoImg} />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTxt}>Đăng nhập vào tài khoản của bạn</Text>
        <Text style={styles.desTxt}>Vui lòng nhập email và mật khẩu để tiếp tục.</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input header='Email' placeholder='abcd@gmail.com' imgsrc={require('../../assets/images/emailIcon.png')} eyeIcon={false} value={email} onchange={setEmail}/>
        <Input header='Mật khẩu' placeholder='Nhập mật khẩu' imgsrc={require('../../assets/images/pwdIcon.png')} eyeIcon={true} value={passsword} onchange={setPassword} />
      </View>
      <Text style={styles.forgotpwdTxt} onPress={() => navigation.navigate('ForgotPassword', { step: 1 })}>Quên mật khẩu?</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => alert('login successful')}>
          <Text style={{textAlign: 'center', color: '#fff'}}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.orTxt}>Hoặc</Text>
        <TouchableOpacity style={styles.ggloginBtn} onPress={() => alert('login successful')}>
          <Image style={styles.icon} source={require('../../assets/images/googleIcon.png')} />
          <Text style={{marginLeft: 5}}>Đăng nhập với Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerWrapper}>
        <Text>Bạn chưa có tài khoản?</Text>
        <Text style={{fontWeight: 'bold', color: '#1677FF'}} onPress={() => navigation.navigate('Signup', {step: 1})}> Tạo tài khoản ngay!</Text>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 5,
  },
  mainlogoImg: {
    width: 130,
    height: 35,
  },
  headerWrapper: {
    height: '18%',
    justifyContent: 'space-between',
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 42,
  },
  desTxt: {
    color: 'gray',
  },
  inputWrapper: {
    width: '100%',
    height: '25%',
    justifyContent: 'space-between',
  },
  icon: {
    width: 16,
    height: 20,
  },
  emailWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    marginTop: 3,
    position: 'relative',
  },
  pwdWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,   
    height: 30,
    marginTop: 3,
    position: 'relative',
  },
  input: {
    width: '100%',
    paddingLeft: 25,
  },
  forgotpwdTxt: {
    textAlign: 'right',
    color: '#1677FF',
    fontWeight: 'bold',
  },
  btnWrapper: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
  },
  loginBtn: {
    borderRadius: 10,
    backgroundColor: '#1677FF',
    textAlign: 'center',
    padding: 10,
  },
  orTxt: {
    textAlign: 'center',
  },
  ggloginBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
  },
  footerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  }
})