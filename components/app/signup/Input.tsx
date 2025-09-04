import React, { useEffect, useState } from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native'

interface Props {
    header: string,
    placeholder: string,
    imgsrc: ImageSourcePropType,
    eyeIcon: boolean,
    value: string,
    onchange: React.Dispatch<React.SetStateAction<string>>,
}

const Input = ({header , placeholder, imgsrc, value, onchange, eyeIcon}: Props) => {
  const [eye, setEye] = useState<'none'| 'flex'>('none')

  useEffect(() => {
    setEye(eyeIcon ? 'flex' : 'none')
  }, [eyeIcon])

  return (
    <View style={styles.inputWrapper}>
        <Text>{header}</Text>
        <View style={styles.pwdWrapper}>
            <Image style={[styles.icon, {position: 'absolute', top: 9, left: 5}]} source={imgsrc} />
            <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onchange} placeholderTextColor='#ccc'/>
            <Image style={[styles.icon, {position: 'absolute', top: 9, right: 5, display: eye}]} source={require('../../../assets/images/eyeIcon.png')} />
        </View>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    height: '16%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 16,
    height: 20,
  },
  pwdWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,   
    height: 40,
    marginTop: 3,
    position: 'relative',
  },
  input: {
    width: '100%',
    paddingLeft: 25,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
})