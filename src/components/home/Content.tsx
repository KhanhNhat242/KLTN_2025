import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface Props {
  returnDate: boolean,
}
interface FromDateProps {
  date: Date,
  setDate: React.Dispatch<React.SetStateAction<Date>>,
}

interface FromtoDateProps {
  fromDay: Date, 
  returnDay: Date, 
  setFromDay: React.Dispatch<React.SetStateAction<Date>>,
  setReturnDay: React.Dispatch<React.SetStateAction<Date>>,
}

const FromDate = ({ date, setDate }: FromDateProps) => {
  const [show, setShow] = useState<boolean>(false)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
    setShow(false)
  };

  return (
    <View className='w-full h-[60px] flex-row bg-white p-[10px] rounded-[10px] mt-[10px]'>
        <Image source={require('../../../assets/fromicon.png')} className="w-[40px] h-[40px]" />
        <View className="w-[50%] h-full ml-[6px]">
          <Text onPress={() => setShow(true)}>Ngày đi</Text>
          {show && <DateTimePicker value={date} mode={'date'} is24Hour={true} onChange={onChange} />}
          <Text className='font-bold'>{date.toLocaleDateString('vi-VN')}</Text>
        </View>
    </View>
  )
}


const FromtoDate = ({ fromDay, returnDay, setFromDay, setReturnDay }: FromtoDateProps) => {
    const [show, setShow] = useState<boolean>(false)

    const onChangeFrom = (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setFromDay(selectedDate)
      }
      setShow(false)
    };

    const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setReturnDay(selectedDate)
      }
      setShow(false)
    };

    return (
      <View className="w-full h-[150px] bg-white p-[10px] flex-row items-center rounded-[10px] mt-[10px]">
        <Image source={require('../../../assets/fromtoicon.png')} className="w-[40px] h-full mr-[10px]" />
        <View className="w-[85%] h-full justify-between">
          <View className="h-[38%] justify-between">
            <Text onPress={() => setShow(true)}>Ngày đi</Text>
            {show && <DateTimePicker value={fromDay} mode={'date'} is24Hour={true} onChange={onChangeFrom} />}
            <Text className='font-bold'>{fromDay.toLocaleDateString('vi-VN')}</Text>
          </View>
          <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
          <View className="h-[38%] justify-between">
            <Text onPress={() => setShow(true)}>Ngày về</Text>
            {show && <DateTimePicker value={returnDay} mode={'date'} is24Hour={true} onChange={onChangeTo} />}
            <Text className='font-bold'>{returnDay.toLocaleDateString('vi-VN')}</Text>
          </View>
        </View>
      </View>
    )
}


const Content = ({ returnDate }: Props) => {
  const [date, setDate] = useState<Date>(new Date())
  const [fromDay, setFromDay] = useState<Date>(new Date())
  const [returnDay, setReturnDay] = useState<Date>(new Date())

  return (
    <View>
      <View className="w-full h-[150px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
        <Image source={require('../../../assets/locationicon.png')} className="w-[40px] h-full" />
        <View className="w-[70%] h-full justify-between">
          <View className="h-[38%] justify-between">
            <Text>Từ</Text>
            <TextInput placeholder="Chọn điểm đi..." />
          </View>
          <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
          <View className="h-[38%] justify-between">
            <Text>Đến</Text>
            <TextInput placeholder="Chọn điểm đến..." />
          </View>
        </View>
        <Image source={require('../../../assets/swapicon.png')} className="size-[40px]" />
      </View>
      {returnDate ? <FromtoDate fromDay={fromDay} setFromDay={setFromDay} returnDay={returnDay} setReturnDay={setReturnDay} /> 
                : <FromDate date={date} setDate={setDate} />}
      <View className="w-full h-[60px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
        <Image source={require('../../../assets/numpeople.png')} className="w-[40px] h-full" />
        <View className="flex-1 ml-[6px]">
          <Text>Số hành khách</Text>
          <Text className="font-bold">Chọn số người đi</Text>
        </View>
        <View className="w-[20%] h-[50%] flex-row justify-between">
          <TouchableOpacity className="bg-[#ccc] rounded-[5px] px-[5px]">
            <Text className="text-white text-center">-</Text>
          </TouchableOpacity>
          <Text>10</Text>
          <TouchableOpacity className="bg-[#1677FF] rounded-[5px] px-[5px]">
            <Text className="text-white text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({})