import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import Input from './Input'

interface Props {
    step?: number,
    fwstep?: number,
}

const Content = ({ step, fwstep }: Props) => {
    const [email, setEmail] = useState<string>('')
    const [otp, setOtp] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [retypePwd, setRetypePwd] = useState<string>('')

    if (step === 1 || fwstep === 1) {
        return (
            <View style={styles.contentWrapper}>
                <Input header='Email' placeholder='abcd@gmail.com' imgsrc={require('../../../assets/emailIcon.png')} eyeIcon={false} value={email} onchange={setEmail} type='email-address' /> 
            </View>
        )
    }
    else if (step === 2 || fwstep === 2) {
        return (
            <View style={styles.contentWrapper}>
                <Text style={styles.otpHeader}>Nhập OTP</Text>
                <OtpInput numberOfDigits={6} onTextChange={setOtp} blurOnFilled={true} />
                <Text style={styles.desTxt}>Mã xác nhận hết hạn trong 1p</Text>
                <Text style={styles.resendOtp}>Gửi lại mã</Text>
            </View>
        )
    }
    else if(step === 3) {
        return (
            <View style={styles.infoWrapper}>
                <Input header='Họ và tên' placeholder='Nhập họ và tên' imgsrc={require('../../../assets/personIcon.png')} eyeIcon={false} value={name} onchange={setName} type='default' />
                <Input header='Số điện thoại' placeholder='Nhập số điện thoại' imgsrc={require('../../../assets/phoneIcon.png')} eyeIcon={false} value={phone} onchange={setPhone} type='phone-pad' />
            </View>
        )        
    }
    else if(step === 4 || fwstep === 3) {
        return (
            <View style={styles.pwdWrapper}>
                <View style={styles.infoWrapper}>
                    <Input header='Mật khẩu' placeholder='Nhập mật khẩu' imgsrc={require('../../../assets/pwdIcon.png')} eyeIcon={true} value={pwd} onchange={setPwd} type='default' />
                    <Input header='Xác nhận mật khẩu' placeholder='Nhập lại mật khẩu' imgsrc={require('../../../assets/pwdIcon.png')} eyeIcon={true} value={retypePwd} onchange={setRetypePwd} type='default' />
                </View>
                <View>
                    <Text style={styles.noteHeader}>Ghi chú</Text>
                    <Text style={styles.noteTxt}>1. Tối thiểu 8 ký tự</Text>
                    <Text style={styles.noteTxt}>2. Ít nhất một chữ cái viết hoa</Text>
                    <Text style={styles.noteTxt}>3. Ít nhất một chữ cái viết thường</Text>
                    <Text style={styles.noteTxt}>4. Ít nhất một chữ số</Text>
                </View>
            </View>
        )
    }
}

export default Content

const styles = StyleSheet.create({
    contentWrapper: {
        width: '100%',
        height: '40%',
    },
    otpHeader: {
        marginBottom: 10,
    },
    desTxt: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 10,
    },
    resendOtp: {
        textDecorationLine: 'underline', 
        textDecorationStyle: 'solid',
        color: '#1677FF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    infoWrapper: {
        width: '100%',
        height: '35%',
        justifyContent: 'space-between',
    },
    pwdWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    noteHeader: {
        fontWeight: 'bold',
        color: 'red',
    },
    noteTxt: {
        color: 'red',
    },
})