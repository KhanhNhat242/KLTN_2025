import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'


const editprofile = () => {
    const [name, setName] = useState<string>('Trần Văn Nguyên')
    const [email, setEmail] = useState<string>('tranvanngyen1940@gmail.com')
    const [selected, setSelected] = useState<number>(1)
    const [show, setShow] = useState<boolean>(false)
    const [dob, setDob] = useState<Date>(new Date())
    const [dobtxt, setDobtxt] = useState<string>('Chọn ngày sinh')

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDob(selectedDate)
            setDobtxt(selectedDate.toLocaleDateString('vi-VN'))
        }
        else {
            alert('fail!!!')
            setDob(dob)
            setDobtxt('Chọn ngày sinh')
        }
        setShow(false)
    };

    const router = useRouter()

    return (
        <SafeAreaView>
            <View className='w-full h-[10vh] pt-[10%] bg-[#1677FF] flex-row justify-between items-center'>
                <TouchableOpacity>
                    <Text className='text-white pl-[10px]' onPress={() => router.back()}>{'<'}</Text>
                </TouchableOpacity>
                <Text className='text-white font-bold text-[20px]'>Chỉnh sửa hồ sơ</Text>
                <Text className='text-[#1677FF] pr-[10px]'>{'>'}</Text>
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
                    <View style={{borderStyle: 'solid', borderColor: '#ccc', borderWidth: 1}} className='bg-[#D9D9D9] w-full mb-[10px] p-[10px] flex-row items-center rounded-[10px]'>
                        <Image source={require('../../../assets/personIcon.png')} />
                        <Text className='w-full pl-[5px] text-[gray]'>+84 123456789</Text>
                    </View>
                </View>
            </View>   
            <View className='w-full mt-[10px] p-[10px] bg-white'>
                <Text>Giới tính</Text>
                <View className=' w-full mt-[5px] flex-row justify-between'>
                    <TouchableOpacity style={selected === 1 && {borderWidth: 2, borderStyle: 'solid', borderColor: '#1677FF', backgroundColor: '#E6F4FF'}} className='w-[48%] flex-row justify-between items-center rounded-[10px] p-[10px]' onPress={() => setSelected(1)}>
                        <Text className='font-bold text-[16px]'>Nam</Text>
                        <Image source={selected === 1 ? require('../../../assets/radioselected.png') : require('../../../assets/radiobtn.png')} className='size-[20px]' />
                    </TouchableOpacity>
                    <TouchableOpacity style={selected === 2 && {borderWidth: 2, borderStyle: 'solid', borderColor: '#1677FF', backgroundColor: '#E6F4FF'}} className='w-[48%] flex-row justify-between items-center rounded-[10px] p-[10px]' onPress={() => setSelected(2)}>
                        <Text className='font-bold text-[16px]'>Nữ</Text>
                        <Image source={selected === 2 ? require('../../../assets/radioselected.png') : require('../../../assets/radiobtn.png')} className='size-[20px]' />
                    </TouchableOpacity>
                </View>
                <Text className='mt-[10px] mb-[5px]'>Ngày sinh</Text>
                <TouchableOpacity style={{borderWidth: 2, borderStyle: 'solid', borderColor: '#ccc'}} className='w-full bg-[#E6F4FF] flex-row justify-between items-center rounded-[10px] p-[10px]' onPress={() => setShow(true)}>
                    {show ? <DateTimePicker value={dob} mode={'date'} is24Hour={true} onChange={onChange} display='spinner' maximumDate={new Date()} /> : 
                        (
                            <>
                                <Text className='text-[gray]'>{dobtxt}</Text>
                                <Image source={require('../../../assets/calendaricon.png')} className='size-[25px]' />
                            </>
                        )
                    }
                </TouchableOpacity>
            </View>
            <View className='p-[10px]'>
                <TouchableOpacity className='w-full mt-[10px] bg-[#1677FF] rounded-[10px] p-[15px]'>
                    <Text className='text-white text-center'>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default editprofile

const styles = StyleSheet.create({})