import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [passsword, setPassword] = useState('')

  return (
    <View style={styles.wrapper}>
      <Image source={require('../../assets/images/mainlogo.png')} style={styles.mainlogoImg} />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTxt}>Đăng nhập vào tài khoản của bạn</Text>
        <Text style={styles.desTxt}>Vui lòng nhập email và mật khẩu để tiếp tục.</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <View style={styles.emailWrapper}>
          <Image style={[styles.icon, {position: 'absolute', top: 5, left: 5}]} source={require('../../assets/images/emailIcon.png')} />
          <TextInput style={styles.input} placeholder='abcd@gmail.com' value={email} onChangeText={setEmail} />
        </View>
        <Text>Mật khẩu</Text>
        <View style={styles.pwdWrapper}>
          <Image style={[styles.icon, {position: 'absolute', top: 5, left: 5}]} source={require('../../assets/images/pwdIcon.png')} />
          <TextInput style={styles.input} placeholder='Nhập mật khẩu' value={passsword} onChangeText={setPassword} />
          <Image style={[styles.icon, {position: 'absolute', top: 5, right: 5}]} source={require('../../assets/images/eyeIcon.png')} />
        </View>
        <Text style={styles.forgotpwdTxt}>Quên mật khẩu?</Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => alert('login successful')}>Đăng nhập</TouchableOpacity>
        <Text style={styles.orTxt}>Hoặc</Text>
        <TouchableOpacity style={styles.ggloginBtn} onPress={() => alert('login successful')}>
          <Image style={styles.icon} source={require('../../assets/images/googleIcon.png')} />
          <Text style={{marginLeft: 5}}>Đăng nhập với Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerWrapper}>
        <Text>Bạn chưa có tài khoản?</Text>
        <Text style={{fontWeight: 'bold', color: '#1677FF'}}> Tạo tài khoản ngay!</Text>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  mainlogoImg: {
    width: 130,
    height: 35,
  },
  headerWrapper: {
    height: '18%',
    justifyContent: 'space-between'
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
    height: '16%',
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
    color: '#fff',
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