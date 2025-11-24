import Content from "@/components/signup/Content";
import Header from "@/components/signup/Header";
import Step from "@/components/signup/Step";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const BASE_URL =
  "https://apigateway.microservices.appf4s.io.vn/services/msuser";

const SignupScreen = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [txnId, setTxnId] = useState<string>("");
  const [regToken, setRegToken] = useState<string>("");

  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const isFormValid = () => {
    if (step === 1) {
      // chỉ cần số điện thoại
      return formData.phoneNumber.trim() !== "";
    }
    if (step === 2) {
      // cần mã OTP
      return formData.otp.trim() !== "";
    }
    if (step === 3) {
      // cần đủ thông tin cá nhân
      const { email, firstName, lastName, password } = formData;
      const isEmailValid = email.includes("@");
      const isPasswordValid = password.length >= 8;
      return (
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        isEmailValid &&
        isPasswordValid
      );
    }
    return false;
  };

  const handleNext = async () => {
    try {
      if (step === 1) {
        // 👉 Gửi OTP
        const formattedPhone = formData.phoneNumber.startsWith("0")
          ? `+84${formData.phoneNumber.slice(1)}`
          : formData.phoneNumber;

        const res = await axios.post(`${BASE_URL}/api/auth/register/send-otp`, {
          phone: formattedPhone,
        });

        console.log("📞 Gửi OTP:", res.data);

        if (res.data?.txnId) {
          setTxnId(res.data.txnId);
          Alert.alert("Thành công", "Mã OTP đã được gửi đến điện thoại!");
          setStep(2);
        } else {
          Alert.alert("Lỗi", "Không nhận được txnId từ server!");
        }
      } else if (step === 2) {
        // 👉 Xác minh OTP
        const payload = {
          txnId,
          code: formData.otp,
        };

        const res = await axios.post(
          `${BASE_URL}/api/auth/register/verify-otp`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("📦 Verify OTP:", res.data);

        if (res.data?.token && res.data?.tokenType === "registration") {
          setRegToken(res.data.token);
          Alert.alert("Thành công", "Xác minh OTP thành công!");
          setStep(3);
        } else {
          Alert.alert("Lỗi", res.data?.message || "OTP không hợp lệ!");
        }
      } else if (step === 3) {
        // 👉 Hoàn tất đăng ký
        const res = await axios.post(`${BASE_URL}/api/auth/register/complete`, {
          regToken,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        });

        console.log("🎉 Đăng ký hoàn tất:", res.data);

        if (res.status === 200 || res.status === 201) {
          Alert.alert("Đăng ký thành công", "Bạn có thể đăng nhập ngay!");
          setStep(1);
          router.back();
        }
      }
    } catch (err: any) {
      console.log("❌ Lỗi:", err?.response?.data || err.message);
      Alert.alert("Lỗi", err?.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <Step step={step} />
          <Header step={step} />
          <Content step={step} formData={formData} setFormData={setFormData} />
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btnLeft} onPress={handlePrev}>
            <Text style={{ textAlign: "center", color: "#1677FF" }}>
              Quay lại
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnRight,
              { backgroundColor: isFormValid() ? "#1677FF" : "gray" },
            ]}
            onPress={handleNext}
            // style={[
            //   styles.btn,
            //   { backgroundColor: isFormValid() ? "#007bff" : "gray" },
            // ]}
            disabled={!isFormValid()}>
            <Text style={styles.btnTxt}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    padding: 5,
    justifyContent: "space-between",
  },
  contentWrapper: {
    width: "100%",
    height: "50%",
  },
  btnWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnLeft: {
    width: "49%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
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
