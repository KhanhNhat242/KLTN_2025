import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/account/Button";
import { useRouter } from "expo-router";
import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const account = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
 useEffect(() => {
   const fetchProfile = async () => {
     try {
       const id = await AsyncStorage.getItem("profileId");
       if (!id) return;

       const res = await api.get(`/profiles/${id}`);
       setFullName(res.data.fullName);
     } catch (err) {
       console.log("Lỗi lấy profile:", err);
       setFullName("Không lấy được tên");
     }
   };

   fetchProfile();
 }, []);

  return (
    <SafeAreaView>
      <View className="w-full height-full">
        <ImageBackground
          source={require("../../../assets/homebg.png")}
          imageStyle={{
            width: "100%",
            height: "25%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View className="w-full p-[10px] mt-[15%] flex-row justify-between items-end">
            <View className="pl-[10px]">
              <Text className="text-white">Xin chào</Text>
              <Text className="text-white text-[20px] font-bold">
                {fullName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/editprofile")}>
              <Image
                source={require("../../../assets/editicon.png")}
                className="size-[40px]"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full p-[10px]">
            <View className="w-full p-[10px] rounded-[10px] bg-white">
              <Text className="text-[20px] font-bold mb-[5px]">Cá nhân</Text>
              <Button
                imgsrc={require("../../../assets/ticketicon.png")}
                txt="Quản lý vé & giao dịch"
              />
              <Button
                imgsrc={require("../../../assets/paymenticon.png")}
                txt="Thanh toán & khuyến mãi"
              />
              <Button
                imgsrc={require("../../../assets/locationinfoicon.png")}
                txt="Địa chỉ đón / điểm trả "
              />
            </View>
            <View className="w-full p-[10px] rounded-[10px] bg-white mt-[10px]">
              <Text className="text-[20px] font-bold mb-[5px]">
                Cài đặt & hỗ trợ
              </Text>
              <Button
                imgsrc={require("../../../assets/supporticon.png")}
                txt="Gửi yêu cầu hỗ trợ"
              />
              <Button
                imgsrc={require("../../../assets/settingicon.png")}
                txt="Cài đặt"
              />
              <Button
                imgsrc={require("../../../assets/infoicon.png")}
                txt="Thông tin về RideHub"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default account;

const styles = StyleSheet.create({});
