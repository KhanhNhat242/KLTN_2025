import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Link, useRouter } from 'expo-router'
import axios from 'axios'

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
    if (selectedDate && selectedDate > date) {
      setDate(selectedDate)
    }
    else {
      alert('fail!!!')
      setDate(date)
    }
    setShow(false)
  };

  return (
    <View className='w-full h-[60px] flex-row bg-white p-[10px] rounded-[10px] mt-[10px]'>
        <Image source={require('../../../assets/fromicon.png')} className="w-[40px] h-[40px]" />
        <View className="w-[50%] h-full ml-[6px]">
          <Text onPress={() => setShow(true)}>Ngày đi</Text>
          {show && <DateTimePicker value={date} mode={'date'} is24Hour={true} onChange={onChange} />}
          <Text className='font-bold'>{show ? '' : date.toLocaleDateString('vi-VN')}</Text>
        </View>
    </View>
  )
}


const FromtoDate = ({ fromDay, returnDay, setFromDay, setReturnDay }: FromtoDateProps) => {
    const [show, setShow] = useState<boolean>(false)

    const onChangeFrom = (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate && selectedDate > fromDay) {
        setFromDay(selectedDate)
      }
      else {
        alert('fail!!!')
        setFromDay(fromDay)
      }
      setShow(false)
    };

    const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate && selectedDate > fromDay) {
        setReturnDay(selectedDate)
      }
      else {
        alert('fail!!!')
        setReturnDay(returnDay)
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
            <Text className='font-bold'>{show ? '' : fromDay.toLocaleDateString('vi-VN')}</Text>
          </View>
          <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
          <View className="h-[38%] justify-between">
            <Text onPress={() => setShow(true)}>Ngày về</Text>
            {show && <DateTimePicker value={returnDay} mode={'date'} is24Hour={true} onChange={onChangeTo} />}
            <Text className='font-bold'>{show ? '' : returnDay.toLocaleDateString('vi-VN')}</Text>
          </View>
        </View>
      </View>
    )
}



type Trip = {
  id: number;
  route: {
    origin: { name: string };
    destination: { name: string };
  };
};

const Content = ({ returnDate }: Props) => {
  const [date, setDate] = useState<Date>(new Date())
  const [fromDay, setFromDay] = useState<Date>(new Date())
  const [returnDay, setReturnDay] = useState<Date>(new Date())
  const [numpeople, setNumpeople] = useState<number>(1)
  // const [typeLocation, setTypeLocation] = useState<number>(0)


  const [trips, setTrips] = useState<Trip[]>([]);
  const [pickup, setPickup] = useState<string>("Chọn điểm đi...");
  const [dropoff, setDropoff] = useState<string>("Chọn điểm đến...");
  const router = useRouter();

  useEffect(() => {
    // Gọi API trips
    axios
      .get(
        "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?page=0&size=20"
      )
      .then((res) => {
        setTrips(res.data.content || res.data); // tuỳ API trả về content hay mảng trực tiếp
        if (res.data.content?.length > 0 || res.data.length > 0) {
          const firstTrip = (res.data.content || res.data)[0];
          setPickup(firstTrip.route.origin.name);
          setDropoff(firstTrip.route.destination.name);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View>
      <View className="w-full h-[150px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
        <Image source={require('../../../assets/locationicon.png')} className="w-[40px] h-full" />
        <View className="w-[70%] h-full justify-between"> 
          <View className="h-[38%] justify-between">
            <Text>Từ</Text>
            <Link href={{pathname: '/(auth)/location', params: {typeLocation: 1}}}>Chọn điểm đi...</Link>
          </View>
          <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
          <View className="h-[38%] justify-between">
            <Text>Đến</Text>
            <Link href={{pathname: '/(auth)/location', params: {typeLocation: 2}}}>Chọn điểm đến...</Link>
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
        <View className="w-[25%] h-[70%] flex-row justify-between items-center">
          <TouchableOpacity style={{backgroundColor: `${numpeople >= 2 ? '#1677FF' : '#ccc'}`}} className=" h-full rounded-[5px] pl-[10px] pr-[10px] justify-center" onPress={() => numpeople >= 2 && setNumpeople(numpeople - 1)}>
            <Text className="text-white text-center">-</Text>
          </TouchableOpacity>
          <Text>{numpeople}</Text>
          <TouchableOpacity className="bg-[#1677FF] h-full rounded-[5px] pl-[10px] pr-[10px] justify-center" onPress={() => setNumpeople(numpeople + 1)}>
            <Text className="text-white text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({})
