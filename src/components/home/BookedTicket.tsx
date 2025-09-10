import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookedTicket = () => {
  return (
    <View className='w-full mt-[10px] mb-[10px]'>
      <Text className='w-full text-[20px] font-bold mb-[10px]'>Vé đã đặt</Text>
      <View className='bg-white p-[10px] rounded-[10px]'>
        <View className='w-full flex-row justify-between items-center pb-[10px] border-b-[2px] border-solid border-[#ccc]'>
            <View>
                <Text className='font-bold text-[18px]'>Futa Bus Lines</Text>
                <Text className='mt-[5px]'>Ngày: 14/11/2024</Text>
                <Text>Biển số: 51B - 29143</Text>
            </View>
            <View className='flex-row items-center p-[5px] rounded-[10px] border-[1px] border-solid border-[red]'>
                <Image source={require('../../../assets/clockicon.png')} className='w-[20px] h-[20px]' />
                <Text className='font-bold color-[red] ml-[2px]'>Sắp khởi hành</Text>
            </View>
        </View>
        <View className='w-full pt-[10px]'>
            <View className='w-full flex-row justify-between items-center'>
                <Text className='text-[20px] font-bold'>8:30</Text>
                <View className='flex-row items-center'>
                    <Image source={require('../../../assets/clockleftline.png')}/>
                    <Text className='p-[5px] rounded-[10px] border-[1px] border-solid border-[gray] color-[gray]'>120km, 3 giờ 25 phút</Text>
                    <Image source={require('../../../assets/clockrightline.png')}/>
                </View>
                <Text className='text-[20px] font-bold'>11:00</Text>
            </View>
            <View className='flex-row justify-between mt-[5px]'>
                <Text className='font-bold color-[gray]'>Bến xe Miền Tây</Text>
                <Text className='font-bold color-[gray]'>Bến xe Vũng Tàu</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default BookedTicket

const styles = StyleSheet.create({})