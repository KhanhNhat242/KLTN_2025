import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Button from "@/components/account/Button";
import { useRouter } from "expo-router";

const account = () => {
  const router = useRouter();

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
                Nguyễn Nhật Khanh
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
