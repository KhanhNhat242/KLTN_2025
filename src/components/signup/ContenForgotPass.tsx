import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import axios from "axios";

const BASE_URL =
  "https://apigateway.microservices.appf4s.io.vn/services/msuser/api/auth/password-reset";

export interface ContentForgotPassRef {
  handleAction: () => Promise<void>;
}

interface Props {
  fwstep: number;
  onSuccess: (data?: any) => void; 
}

const ContentForgotPass = forwardRef<ContentForgotPassRef, Props>(
  ({ fwstep, onSuccess }, ref) => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [txnId, setTxnId] = useState("");
    const [resetToken, setResetToken] = useState("");

    const formatPhone = (phone: string) => {
      if (phone.startsWith("0")) {
        return `+84${phone.slice(1)}`;
      }
      return phone;
    };

    const handleAction = async () => {
      try {
        if (fwstep === 1) {
          const formattedPhone = formatPhone(phone);
          const res = await axios.post(`${BASE_URL}/request`, { phone: formattedPhone });
          setTxnId(res.data.txnId);
          Alert.alert("Thành công", "Đã gửi mã OTP!");
          onSuccess({ nextStep: 2, txnId: res.data.txnId });
        } else if (fwstep === 2) {
          const res = await axios.post(`${BASE_URL}/verify-otp`, {
            txnId,
            code: otp,
          });
          setResetToken(res.data.resetToken);
          Alert.alert("Thành công", "Xác nhận OTP thành công!");
          onSuccess({ nextStep: 3, resetToken: res.data.resetToken });
        } else if (fwstep === 3) {
          await axios.post(`${BASE_URL}/complete`, {
            resetToken,
            newPassword,
          });
          Alert.alert("Hoàn tất", "Mật khẩu mới đã được đặt!");
          onSuccess({ nextStep: 4 });
        }
      } catch (err: any) {
        console.log(err.response?.data);
        Alert.alert("Lỗi", err.response?.data?.message || "Đã xảy ra lỗi");
      }
    };

    // Expose function ra ngoài để cha gọi được
    useImperativeHandle(ref, () => ({
      handleAction,
    }));

    if (fwstep === 1)
      return (
        <View>
          <Text>Nhập số điện thoại</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
          />
        </View>
      );

    if (fwstep === 2)
      return (
        <View>
          <Text>Nhập mã OTP</Text>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="OTP"
            keyboardType="number-pad"
            style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
          />
        </View>
      );

    if (fwstep === 3)
      return (
        <View>
          <Text>Nhập mật khẩu mới</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Mật khẩu mới"
            secureTextEntry
            style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
          />
        </View>
      );

    return null;
  }
);

export default ContentForgotPass;
