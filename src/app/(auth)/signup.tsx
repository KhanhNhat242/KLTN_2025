import Content from '@/components/signup/Content'
import Header from '@/components/signup/Header'
import Step from '@/components/signup/Step'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SignupScreen = () => {
    const { stepParam } = useLocalSearchParams()
    const step = Number(stepParam)

    const [stepCount, setStepCount] = useState<number>(1)
    const navigation = useNavigation()

    const router = useRouter()

    useEffect(() => {
        if (stepCount > 0 && stepCount !== 5) {
            if (step === 1) {
            setStepCount(1)
            }
            setStepCount(stepCount)
        }
        else if (stepCount === 5) {
          alert('sign up success')
          router.back()
          setStepCount(1)
        }
        else if (stepCount === 0) {
        router.back()
        setStepCount(1)
        }
        console.log(stepCount)
    }, [stepCount])

    return (
        <View style={styles.wrapper}>  
            <View>
            <Step step={stepCount} />
            <Header step={stepCount} />
            <Content step={stepCount} />
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