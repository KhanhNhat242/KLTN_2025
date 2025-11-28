import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import Content from "@/components/home/Content";
// import BookedTicket from "@/components/home/BookedTicket";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProvincePicker from "@/components/provincepicker/ProvincePicker";
import { useRouter } from "expo-router";

type Province = {
  id: number;
  name: string;
  provinceCode: number;
};

interface Props {
  label: string;
  value: Province | null;
  provinces: Province[];
  onSelect: (p: Province) => void;
}

const Home = () => {

  const router = useRouter();
  const [returndate, setReturnDate] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
  const [fromProvince, setFromProvince] = useState<Province | null>(null);
  const [toProvince, setToProvince] = useState<Province | null>(null);
  const [showPicker, setShowPicker] = useState<"from" | "to" | null>(null);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [numPeople, setNumPeople] = useState(1);

  
  const fetchProvinces = async (token: string) => {
    setLoadingProvinces(true);
    try {
      const res = await axios.get(
        "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces",
        { headers: { Authorization: `Bearer ${token}` } }
      );


      if (Array.isArray(res.data)) {
        setProvinces(res.data);
      } else if (res.data.content && Array.isArray(res.data.content)) {
        setProvinces(res.data.content);
      } else {
        console.warn("⚠️ Unexpected provinces format", res.data);
        setProvinces([]);
      }
    } catch (err: any) {
      console.log("❌ Lỗi fetchProvinces:", err.response?.data || err.message);
      Alert.alert("Lỗi", "Không thể tải danh sách tỉnh/thành phố.");
    } finally {
      setLoadingProvinces(false);
    }
  };

  useEffect(() => {
    const loadProvinces = async () => {
      const token = await AsyncStorage.getItem("token");
      // console.log("🔑 Token:", token);
      if (!token) {
        Alert.alert("Thông báo", "Bạn chưa đăng nhập.");
        return;
      }
      fetchProvinces(token);
    };
    loadProvinces();
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

 const handleSearch = async () => {
   if (!fromProvince || !toProvince) {
     Alert.alert("Thông báo", "Vui lòng chọn điểm đi và điểm đến.");
     return;
   }

   const token = await AsyncStorage.getItem("token");
   if (!token) {
     Alert.alert("Lỗi", "Bạn chưa đăng nhập.");
     return;
   }

   const day = date.toISOString().split("T")[0]; // yyyy-mm-dd
   const startTime = `${day}T00:00:00.000Z`;
   const endTime = `${day}T23:59:59.000Z`;

   try {
     const res = await axios.get(
       "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips",
       {
         params: {
           page: 0,
           size: 200,
           "departureTime.greaterThan": startTime,
           "departureTime.lessThan": endTime,
           "originProvinceCode.equals": fromProvince.provinceCode,
           "destinationProvinceCode.equals": toProvince.provinceCode,
         },
         headers: {
           Authorization: `Bearer ${token}`,
           Accept: "*/*",
           "Content-Type": "application/json",
         },
       }
     );

     const trips = res.data;

     if (!trips || trips.length === 0) {
       Alert.alert("Không có chuyến", "Không tìm thấy chuyến xe nào.");
       return;
     }

     // 👉 CHUYỂN TRANG SAU KHI TÌM THẤY KẾT QUẢ
     router.push({
       pathname: "/trip-list",
       params: {
         from: JSON.stringify(fromProvince),
         to: JSON.stringify(toProvince),
         trips: JSON.stringify(trips),
       },
     });
   } catch (error: any) {
     Alert.alert("Lỗi", "Không tìm thấy chuyến xe nào.");
     console.log("Error search trip:", error.response?.data || error.message);
   }
 };

  return (
    <SafeAreaView>
      <View className="">
        <ImageBackground
          source={require("../../../assets/homebg.png")}
          style={{ width: "100%", height: 100 }}
          imageStyle={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text className="text-white mt-6 text-[20px] p-[10px]">
            Bạn muốn đi đâu, Nguyên?
          </Text>
        </ImageBackground>

        <View className="p-[10px]">
          <View className="flex-row rounded-[10px] bg-white p-[3px]">
            <TouchableOpacity
              style={{
                backgroundColor: `${returndate ? "#fff" : "#1677FF"}`,
              }}
              className="w-[50%] rounded-[10px] p-[10px]"
              onPress={() => setReturnDate(false)}>
              <Text
                style={{ color: `${returndate ? "#000" : "#fff"}` }}
                className="text-center">
                Một chiều
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: `${returndate ? "#1677FF" : "#fff"}`,
              }}
              className="w-[50%] rounded-[10px] p-[10px]"
              onPress={() => setReturnDate(true)}>
              <Text
                style={{ color: `${returndate ? "#fff" : "#000"}` }}
                className="text-center">
                Khứ hồi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full h-[150px] bg-white p-[10px] flex-row justify-between items-center rounded-[10px] mt-[10px]">
          <Image
            source={require("../../../assets/locationicon.png")}
            className="w-[40px] h-full"
          />
          <View className="w-[70%] h-full justify-between">
            <View className="h-[44%] justify-center">
              <TouchableOpacity onPress={() => setShowPicker("from")}>
                <Text>Chọn điểm đi: {fromProvince?.name || "..."}</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../../assets/line.png")}
              className="w-full h-[2px]"
            />
            <View className="h-[42%] justify-center">
              <TouchableOpacity onPress={() => setShowPicker("to")}>
                <Text>Chọn điểm đến: {toProvince?.name || "..."}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require("../../../assets/swapicon.png")}
            className="size-[40px]"
          />
        </View>
        <View className="px-[10px]">
          {/* Ngày đi */}
          <View className="bg-white p-4 rounded-[10px] mt-2 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text>Ngày đi: {date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <Image
              source={require("../../../assets/calendaricon.png")}
              style={{ width: 28, height: 28 }}
            />
          </View>
          <View className="px-[10px] mt-4">
            <TouchableOpacity
              className="bg-blue-600 p-4 rounded-[10px]"
              onPress={handleSearch}>
              <Text className="text-center text-white text-[16px] font-bold">
                TÌM CHUYẾN XE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showPicker && (
          <ProvincePicker
            visible={!!showPicker}
            label={showPicker === "from" ? "Điểm đi" : "Điểm đến"}
            value={showPicker === "from" ? fromProvince : toProvince}
            provinces={provinces}
            onSelect={(p) => {
              if (showPicker === "from") setFromProvince(p);
              else setToProvince(p);
              setShowPicker(null);
            }}
            onClose={() => setShowPicker(null)}
          />
        )}

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()} // chặn chọn ngày trước hôm nay
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({});
