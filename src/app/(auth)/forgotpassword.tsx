import ContentForgotPass, {
  ContentForgotPassRef,
} from "@/components/signup/ContenForgotPass";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const [fwstep, setFwstep] = useState(1);
  const router = useRouter();
  const contentRef = useRef<ContentForgotPassRef>(null);

  const handleNext = (data?: any) => {
    if (data?.nextStep) {
      setFwstep(data.nextStep);
    } else if (fwstep < 3) {
      setFwstep(fwstep + 1);
    } else {
      Alert.alert("Thành công", "Đặt lại mật khẩu thành công!");
      router.back();
      setFwstep(1);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View>
          {/* ✅ QUAN TRỌNG: Truyền ref vào đây */}
          <ContentForgotPass
            ref={contentRef}
            fwstep={fwstep}
            onSuccess={handleNext}
          />
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btnLeft}
            onPress={() => setFwstep(fwstep - 1)}>
            <Text style={{ textAlign: "center", color: "#1677FF" }}>
              Quay lại
            </Text>
          </TouchableOpacity>

          {/* ✅ Gọi hàm handleAction trong component con */}
          <TouchableOpacity
            style={styles.btnRight}
            onPress={() => contentRef.current?.handleAction()}>
            <Text style={styles.btnTxt}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    padding: 5,
    justifyContent: "space-between",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnLeft: {
    width: "49%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  btnRight: {
    width: "49%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#1677FF",
  },
  btnTxt: {
    color: "#fff",
    textAlign: "center",
  },
});
