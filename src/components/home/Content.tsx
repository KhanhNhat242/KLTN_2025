// import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { useEffect, useState } from 'react'
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
// import { Link, useRouter } from 'expo-router'
// import axios from 'axios'
// import ProvincePicker from '../provincepicker/ProvincePicker'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// interface Props {
//   returnDate: boolean,
// }
// interface FromDateProps {
//   date: Date,
//   setDate: React.Dispatch<React.SetStateAction<Date>>,
// }

// interface FromtoDateProps {
//   fromDay: Date, 
//   returnDay: Date, 
//   setFromDay: React.Dispatch<React.SetStateAction<Date>>,
//   setReturnDay: React.Dispatch<React.SetStateAction<Date>>,
// }

// const FromDate = ({ date, setDate }: FromDateProps) => {
//   const [show, setShow] = useState<boolean>(false)

//   const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
//     if (selectedDate && selectedDate > date) {
//       setDate(selectedDate)
//     }
//     else {
//       alert('fail!!!')
//       setDate(date)
//     }
//     setShow(false)
//   };

//   return (
//     <View className='w-full h-[60px] flex-row bg-white p-[10px] rounded-[10px] mt-[10px]'>
//         <Image source={require('../../../assets/fromicon.png')} className="w-[40px] h-[40px]" />
//         <View className="w-[50%] h-full ml-[6px]">
//           <Text onPress={() => setShow(true)}>Ngày đi</Text>
//           {show && <DateTimePicker value={date} mode={'date'} is24Hour={true} onChange={onChange} />}
//           <Text className='font-bold'>{show ? '' : date.toLocaleDateString('vi-VN')}</Text>
//         </View>
//     </View>
//   )
// }


// const FromtoDate = ({ fromDay, returnDay, setFromDay, setReturnDay }: FromtoDateProps) => {
//     const [show, setShow] = useState<boolean>(false)

//     const onChangeFrom = (event: DateTimePickerEvent, selectedDate?: Date) => {
//       if (selectedDate && selectedDate > fromDay) {
//         setFromDay(selectedDate)
//       }
//       else {
//         alert('fail!!!')
//         setFromDay(fromDay)
//       }
//       setShow(false)
//     };

//     const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
//       if (selectedDate && selectedDate > fromDay) {
//         setReturnDay(selectedDate)
//       }
//       else {
//         alert('fail!!!')
//         setReturnDay(returnDay)
//       }
//       setShow(false)
//     };

//     return (
//       <View className="w-full h-[150px] bg-white p-[10px] flex-row items-center rounded-[10px] mt-[10px]">
//         <Image source={require('../../../assets/fromtoicon.png')} className="w-[40px] h-full mr-[10px]" />
//         <View className="w-[85%] h-full justify-between">
//           <View className="h-[38%] justify-between">
//             <Text onPress={() => setShow(true)}>Ngày đi</Text>
//             {show && <DateTimePicker value={fromDay} mode={'date'} is24Hour={true} onChange={onChangeFrom} />}
//             <Text className='font-bold'>{show ? '' : fromDay.toLocaleDateString('vi-VN')}</Text>
//           </View>
//           <Image source={require('../../../assets/line.png')} className="w-full h-[2px]" />
//           <View className="h-[38%] justify-between">
//             <Text onPress={() => setShow(true)}>Ngày về</Text>
//             {show && <DateTimePicker value={returnDay} mode={'date'} is24Hour={true} onChange={onChangeTo} />}
//             <Text className='font-bold'>{show ? '' : returnDay.toLocaleDateString('vi-VN')}</Text>
//           </View>
//         </View>
//       </View>
//     )
// }



// type Trip = {
//   id: number;
//   route: {
//     origin: { name: string };
//     destination: { name: string };
//   };
// };

// type Province = {
//   id: number;
//   name: string;
//   provinceCode: number;
// };

// interface Props {
//   label: string;
//   value: Province | null;
//   provinces: Province[];
//   onSelect: (p: Province) => void;
// }

// const Content = ({ returnDate }: Props) => {
//   const [date, setDate] = useState<Date>(new Date());
//   const [fromDay, setFromDay] = useState<Date>(new Date());
//   const [returnDay, setReturnDay] = useState<Date>(new Date());
//   const [numpeople, setNumpeople] = useState<number>(1);

//   const [provinces, setProvinces] = useState<Province[]>([]);
//   const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
//   const [fromProvince, setFromProvince] = useState<Province | null>(null);
//   const [toProvince, setToProvince] = useState<Province | null>(null);

//   const [showPicker, setShowPicker] = useState<"from" | "to" | null>(null);

// const fetchProvinces = async (token: string) => {
//   setLoadingProvinces(true);
//   try {
//     const res = await axios.get(
//       "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     console.log("📦 Provinces API response:", res.data);

//     // Nếu API trả về object với content, dùng res.data.content
//     if (Array.isArray(res.data)) {
//       setProvinces(res.data);
//     } else if (res.data.content && Array.isArray(res.data.content)) {
//       setProvinces(res.data.content);
//     } else {
//       console.warn("⚠️ Unexpected provinces format", res.data);
//       setProvinces([]);
//     }
//   } catch (err: any) {
//     console.log("❌ Lỗi fetchProvinces:", err.response?.data || err.message);
//     Alert.alert("Lỗi", "Không thể tải danh sách tỉnh/thành phố.");
//   } finally {
//     setLoadingProvinces(false);
//   }
// };

// useEffect(() => {
//   const loadProvinces = async () => {
//     const token = await AsyncStorage.getItem("token");
//     console.log("🔑 Token:", token);
//     if (!token) {
//       Alert.alert("Thông báo", "Bạn chưa đăng nhập.");
//       return;
//     }
//     fetchProvinces(token);
//   };
//   loadProvinces();
// }, []);

//   return (
//     <View>
//       <View className="w-full h-[150px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
//         <Image
//           source={require("../../../assets/locationicon.png")}
//           className="w-[40px] h-full"
//         />
//         <View className="w-[70%] h-full justify-between">
//           <View className="h-[44%] justify-between">
//             <TouchableOpacity onPress={() => setShowPicker("from")}>
//               <Text>Chọn điểm đi: {fromProvince?.name || "..."}</Text>
//             </TouchableOpacity>
//           </View>
//           <Image
//             source={require("../../../assets/line.png")}
//             className="w-full h-[2px]"
//           />
//           <View className="h-[42%] justify-between">
//             <TouchableOpacity onPress={() => setShowPicker("to")}>
//               <Text>Chọn điểm đến: {toProvince?.name || "..."}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <Image
//           source={require("../../../assets/swapicon.png")}
//           className="size-[40px]"
//         />
//       </View>
//       {returnDate ? (
//         <FromtoDate
//           fromDay={fromDay}
//           setFromDay={setFromDay}
//           returnDay={returnDay}
//           setReturnDay={setReturnDay}
//         />
//       ) : (
//         <FromDate date={date} setDate={setDate} />
//       )}
//       <View className="w-full h-[60px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
//         <Image
//           source={require("../../../assets/numpeople.png")}
//           className="w-[40px] h-full"
//         />
//         <View className="flex-1 ml-[6px]">
//           <Text>Số hành khách</Text>
//           <Text className="font-bold">Chọn số người </Text>
//         </View>
//         <View className="w-[25%] h-[70%] flex-row justify-between items-center">
//           <TouchableOpacity
//             style={{
//               backgroundColor: `${numpeople >= 2 ? "#1677FF" : "#ccc"}`,
//             }}
//             className=" h-full rounded-[5px] pl-[10px] pr-[10px] justify-center"
//             onPress={() => numpeople >= 2 && setNumpeople(numpeople - 1)}>
//             <Text className="text-white text-center">-</Text>
//           </TouchableOpacity>
//           <Text>{numpeople}</Text>
//           <TouchableOpacity
//             className="bg-[#1677FF] h-full rounded-[5px] pl-[10px] pr-[10px] justify-center"
//             onPress={() => setNumpeople(numpeople + 1)}>
//             <Text className="text-white text-center">+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {showPicker && (
//         <ProvincePicker
//           provinces={provinces}
//           onSelect={(p) => {
//             if (showPicker === "from") setFromProvince(p);
//             else setToProvince(p);
//             setShowPicker(null);
//           }}
//           onClose={() => setShowPicker(null)}
//         />
//       )}
//     </View>
//   );
// }

// export default Content

// const styles = StyleSheet.create({})
