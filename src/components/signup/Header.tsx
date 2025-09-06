import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    step?: number
    fwstep?: number
}

const Header = ({ step, fwstep }: Props) => {
  const [headerTxt, setHeaderTxt] = useState<string>('')
  const [desTxt, setDesTxt] = useState<string>('')

  useEffect(() => {
    if(step === 1) {
      setHeaderTxt('Email của bạn là gì?')
      setDesTxt('Điền email để tiếp tục quá trình đăng ký.')
    }
    else if(step === 2) {
      setHeaderTxt('Xác nhận OTP')
      setDesTxt('Chúng tôi đã gửi mã xác nhận gồm 6 ô chữ số vào email m*****lk@gmail.com của bạn.')
    }
    else if(step === 3) {
      setHeaderTxt('Thông tin cá nhân')
      setDesTxt('Vui lòng cung cấp thông tin để chúng tôi hỗ trợ bạn tốt hơn.')
    }
    else if(step === 4) {
      setHeaderTxt('Tạo mật khẩu')
      setDesTxt('Vui lòng tạo mật khẩu để đảm bảo an toàn cho tài khoản của bạn.')
    }

    if(fwstep === 1) {
      setHeaderTxt('Quên mật khẩu')
      setDesTxt('Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.”')
    }
    else if(fwstep === 2) {
      setHeaderTxt('Xác nhận OTP')
      setDesTxt('Chúng tôi đã gửi mã xác nhận gồm 6 ô chữ số vào email m*****lk@gmail.com của bạn.')
    }
    else if(fwstep === 3) {
      setHeaderTxt('Tạo mật khẩu mới')
      setDesTxt('Vui lòng tạo mật khẩu mới để đảm bảo an toàn cho tài khoản của bạn.')
    }
  }, [step, fwstep])

  return (
    <View style={styles.headerWrapper}>
        <Text style={styles.headerTxt}>{headerTxt}</Text>
        <Text style={styles.desTxt}>{desTxt}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerWrapper: {
    height: '55%',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 42,
  },
  desTxt: {
    color: 'gray',
  },
})