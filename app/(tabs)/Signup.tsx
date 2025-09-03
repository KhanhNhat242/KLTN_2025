import Header from '@/components/app/signup/Header'
import Input from '@/components/app/signup/Input'
import Step from '@/components/app/signup/Step'
import { useRoute } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type RootStrackParamList = {
  Signup: {
    step: number,
  }
}

type Props = NativeStackScreenProps<RootStrackParamList, 'Signup'>

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [stepCount, setStepCount] = useState<number>(1)
  const navigation = useNavigation()

  const route = useRoute()
  const { step } = route.params as {step: number}

  useEffect(() => {
    if (stepCount > 0) {
      if (step === 1) {
        setStepCount(1)
      }
      setStepCount(stepCount)
    }
    else if (stepCount === 0) {
      navigation.navigate('Welcome')
    setStepCount(1)
    }
    console.log(stepCount)
  }, [stepCount])

  return (
    <View style={styles.wrapper}>  
        <View>
          <Step step={stepCount} />
          <Header step={stepCount} />
          <Input header='Email' placeholder='abcd@gmail.com' imgsrc={require('../../assets/images/emailIcon.png')} eyeIcon={false} value={email} onchange={setEmail}/>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btnLeft} onPress={() => setStepCount(stepCount - 1)}>
            <Text style={{textAlign: 'center', color: '#1677FF'}}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRight} onPress={() => setStepCount(stepCount + 1)}>
            <Text style={styles.btnTxt}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'space-between',
  },
  btnWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    }, 
  btn: {
    width: '48%',
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
  },
  btnLeft: {
    width: '49%',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    color: '#1677FF',
    backgroundColor: '#fff',
  },
  btnRight: {
    width: '49%',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#1677FF'
  },
  btnTxt: {
    color: '#fff',
    textAlign: 'center',
  },
})