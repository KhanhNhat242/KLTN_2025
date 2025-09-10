import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RadioForm from 'react-native-simple-radio-button'

const radio_props = [
    {
        label: '',
        value: 0,
    },
    {
        label: '',
        value: 1,
    },
]

const editprofile = () => {
    const [name, setName] = useState<string>('Trần Văn Nguyên')
    const [email, setEmail] = useState<string>('tranvanngyen1940@gmail.com')
    const [gender, setGender] = useState<number>(0)

    return (
        <SafeAreaView>
            <View className='w-full h-[10vh] pt-[10%] bg-[#1677FF] flex-row justify-between items-center'>
                <TouchableOpacity>
                    <Text className='text-white pl-[10px]'>{'<'}</Text>
                </TouchableOpacity>
                <Text className='text-white font-bold text-[20px]'>Chỉnh sửa hồ sơ</Text>
                <Text className='text-[#1677FF]'>{'>'}</Text>
            </View>
            <View className='w-full h-[30vh] p-[10px] bg-white'>
                <View>
                    <Text className='mb-[5px]'>Họ và tên</Text>
                    <View style={{borderStyle: 'solid', borderColor: '#ccc', borderWidth: 1}} className='w-full mb-[10px] p-[10px] flex-row items-center rounded-[10px]'>
                        <Image source={require('../../../assets/personIcon.png')} />
                        <TextInput className='w-full pl-[5px]' placeholder={name} value={name} onChangeText={setName} />
                    </View>
                </View>
                <View>
                    <Text className='mb-[5px]'>Email</Text>
                    <View style={{borderStyle: 'solid', borderColor: '#ccc', borderWidth: 1}} className='w-full mb-[10px] p-[10px] flex-row items-center rounded-[10px]'>
                        <Image source={require('../../../assets/emailIcon.png')} />
                        <TextInput className='w-full pl-[5px]' placeholder={email} value={email} onChangeText={setEmail} />
                    </View>
                </View>
                <View>
                    <Text className='mb-[5px]'>Số điện thoại</Text>
                    <View style={{borderStyle: 'solid', borderColor: '#ccc', borderWidth: 1}} className='bg-[#ccc] w-full mb-[10px] p-[10px] flex-row items-center rounded-[10px]'>
                        <Image source={require('../../../assets/personIcon.png')} />
                        <Text className='w-full pl-[5px]'>+84 123456789</Text>
                    </View>
                </View>
            </View>   
            <View>
                <Text>Giới tính</Text>
                <RadioForm radio_props={radio_props} initial={0} formHorizontal={true} onPress={(value) => setGender(value)} />
                <Text>Ngày sinh</Text>
            </View>
        </SafeAreaView>
    )
}

export default editprofile

const styles = StyleSheet.create({})