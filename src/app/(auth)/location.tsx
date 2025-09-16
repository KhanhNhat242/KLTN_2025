import { Image, ImageSourcePropType, SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { useLocalSearchParams } from 'expo-router'

const DATA = [
    {
        title: 'Gần đây',
        imgsrc: require('../../../assets/searchedicon.png'),
        data: [
            'TP. Hồ Chí Minh - Vũng Tàu',
            'Bến Xe Miền Đông',
        ],
    },
    {
        title: 'Địa điểm phổ biến',
        imgsrc: require('../../../assets/stationicon.png'),
        data: [
            'Bến Xe An Sương',
            'Bến Xe Miền Đông',
            'Bến Xe Miền Tây',
            'Bến Xe Ngã Tư Ga',
        ],
    },
    {
        title: 'Thành phố',
        imgsrc: require('../../../assets/cityicon.png'),
        data: [
            'TP. Hồ Chí Minh',
            'Bà Rịa- Vũng Tàu',
            'Bạc Liêu',
        ],
    },
]

interface ItemProps {
    txt: string,
    imgsrc: ImageSourcePropType,
}

const Item = ({ txt, imgsrc }: ItemProps) => (
    <View style={{borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#ccc'}} className='w-full flex-row items-center bg-white p-[10px]'>
        <Image source={imgsrc} className='size-[40px] bg-white mr-[10px]' />
        <Text className='font-bold text-[15px]'>{txt}</Text>
    </View>
)

const startlocation = () => {
    const { typeLocation } = useLocalSearchParams()
    const type = Number(typeLocation)

    console.log(typeLocation)

    return (
        <SafeAreaView>
            <View className='h-full'>
                <Header headerTxt={`${type === 1 ? 'Vị trí xuất phát' : 'Bạn muốn đi đâu?'}`} />
                {/* <View className='w-full flex-row bg-white'>
                    <Image source={require('../../../assets/currentlocationicon.png')} className='size-[40px]' />
                    <View>
                        <Text className='font-bold text-[15px]'>Vị trí hiện tại</Text>
                        <Text>370/37 Hẻm 368, Tân Sơn Nhì, P.Tân Sơn Nhì, Q.Tân Phú, Hồ Chí Minh</Text>
                    </View>
                </View> */}
                <SectionList sections={DATA} keyExtractor={(item, index) => item + index} 
                    renderItem={
                        ({ item, section }) => (
                            <Item txt={item} imgsrc={section.imgsrc} />
                        )
                    }
                    renderSectionHeader={({ section: {title}}) => (
                        <Text style={title !== 'Gần đây' && {borderStyle: 'solid', borderTopWidth: 5, borderTopColor: '#ccc'}} className='font-bold bg-white pt-[10px] pl-[10px] color-[gray]'>{title}</Text>
                    )}    
                />
            </View>
        </SafeAreaView>
    )
}

export default startlocation

const styles = StyleSheet.create({})