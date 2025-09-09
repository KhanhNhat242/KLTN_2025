import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Content from '@/components/home/Content'

const data = [
  { id: 1, city: 'Đà Lạt', price: 240000 },
  { id: 2, city: 'Hồ Chí Minh', price: 240000 },
  { id: 3, city: 'Vũng Tàu', price: 240000 },
  { id: 4, city: 'Đà Nẵng', price: 240000 },
]

interface Props {
  city: string,
  price: number,
}

const Item = ({ city, price }: Props) => (
  <ImageBackground
    source={require('../../../assets/examplecityimg.png')}
    className="w-[45%] h-[100px] mt-[3%] ml-[3%] justify-end"
    imageStyle={{borderRadius: 10}}
  >
      <Text className="text-white font-bold ml-[5px]">{city}</Text>
      <Text className="text-white mb-[5px] ml-[5px]">{price.toLocaleString()} đ</Text>
  </ImageBackground>
)

const Home = () => {
  const [returndate, setReturnDate] = useState<boolean>(false)

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item city={item.city} price={item.price} />}
        numColumns={2}
        ListHeaderComponent={
          <>
            <View className='w-full bg-[#ccc] h-[90-vh]'>
              <ImageBackground
                source={require('../../../assets/homebg.png')}
                // className="h-[50vh]"
                imageStyle={{width: '100%', height: '25%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
              >
                <Text className="text-white text-[20px] p-[10px]">Bạn muốn đi đâu, Nguyên?</Text>
                <View className='p-[10px]'>
                  <View className="flex-row rounded-[10px] bg-white p-[3px]">
                    <TouchableOpacity style={{backgroundColor: `${returndate ? '#fff' : '#1677FF'}`}} className="w-[50%] rounded-[10px] p-[10px]" onPress={() => setReturnDate(false)}>
                      <Text style={{color: `${returndate ? '#000' : '#fff'}`}} className="text-center">Một chiều</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: `${returndate ? '#1677FF' : '#fff'}`}} className="w-[50%] rounded-[10px] p-[10px]" onPress={() => setReturnDate(true)}>
                      <Text style={{color: `${returndate ? '#fff' : '#000'}`}} className="text-center">Khứ hồi</Text>
                    </TouchableOpacity>
                  </View>
                  <Content returnDate={returndate} />
                  <TouchableOpacity className="w-full bg-[#1677FF] p-[15px] mt-[10px] rounded-[10px]">
                    <Text className="text-white text-center">Tìm kiếm</Text>
                  </TouchableOpacity>
                  <Text className="font-bold text-[20px] mt-[10px] mb-[10px]">Điểm đến phổ biến</Text>
                  <View className="w-full flex-row justify-start">
                    <TouchableOpacity className="p-[10px] rounded-[10px] bg-[#1677FF]">
                      <Text className="text-white">Miền Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-[10px] rounded-[10px] bg-white mx-[5px]">
                      <Text>Miền Bắc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-[10px] rounded-[10px] bg-white">
                      <Text>Miền Trung</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </>
        }
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})
