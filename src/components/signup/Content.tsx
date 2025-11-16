import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Input from "./Input";

interface Props {
  step?: number;
  formData: any;
  setFormData: (data: any) => void;
}

const Content = ({ step, formData, setFormData }: Props) => {
  
  if (step === 1) {
    return (
      <View style={styles.contentWrapper}>
        <Input
          header="Số điện thoại"
          placeholder="Nhập số điện thoại"
          imgsrc={require("../../../assets/phoneIcon.png")}
          eyeIcon={false}
          value={formData.phoneNumber}
          onchange={(val) => setFormData({ ...formData, phoneNumber: val })}
          type="phone-pad"
        />
      </View>
    );
  }

  if (step === 2) {
    return (
      <View style={styles.centered}>
        <Text style={styles.otpHeader}>Nhập mã OTP</Text>
        <OtpInput
          numberOfDigits={6}
          onTextChange={(val) => setFormData({ ...formData, otp: val })}
          blurOnFilled={true}
        />
        <Text style={styles.desTxt}>Mã xác nhận hết hạn trong 1 phút</Text>
      </View>
    );
  }

  if (step === 3) {
    return (
      <View style={styles.contentWrapper}>
        <Input
          header="Email"
          placeholder="abcd@gmail.com"
          imgsrc={require("../../../assets/emailIcon.png")}
          eyeIcon={false}
          value={formData.email}
          onchange={(val) => setFormData({ ...formData, email: val })}
          type="email-address"
        />
        <Input
          header="Họ"
          placeholder="Nhập họ"
          imgsrc={require("../../../assets/personIcon.png")}
          eyeIcon={false}
          value={formData.lastName}
          onchange={(val) => setFormData({ ...formData, lastName: val })}
          type="default"
        />
        <Input
          header="Tên"
          placeholder="Nhập tên"
          imgsrc={require("../../../assets/personIcon.png")}
          eyeIcon={false}
          value={formData.firstName}
          onchange={(val) => setFormData({ ...formData, firstName: val })}
          type="default"
        />
        <Input
          header="Mật khẩu"
          placeholder="Nhập mật khẩu"
          imgsrc={require("../../../assets/pwdIcon.png")}
          eyeIcon={true}
          value={formData.password}
          onchange={(val) => setFormData({ ...formData, password: val })}
          type="default"
        />
      </View>
    );
  }

  return null;
};

export default Content;

const styles = StyleSheet.create({
  contentWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  centered: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  otpHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  desTxt: {
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
});
