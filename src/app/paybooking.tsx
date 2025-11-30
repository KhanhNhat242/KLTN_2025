import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PayBooking() {
  const params = useLocalSearchParams();

  const booking = JSON.parse(
    Array.isArray(params.booking) ? params.booking[0] : params.booking!
  );

  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60s giữ ghế
  const [expired, setExpired] = useState(false);
  const bookingId = booking.bookingId;
  // Countdown giữ ghế
  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Gọi API thanh toán
  const handlePay = async () => {
    if (expired) {
      Alert.alert("Hết thời gian giữ ghế", "Vui lòng đặt lại!");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/${bookingId}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId: booking.bookingId,
            method: "SEPAY",
          }),
        }
      );

      const data = await res.json();

      console.log("PAYMENT DATA:", data);

      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
      } else {
        Alert.alert("Lỗi", "Không nhận được paymentUrl từ hệ thống");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ");
    } finally {
      setLoading(false);
    }
  };

  // Đã có paymentUrl => mở WebView thanh toán
  if (paymentUrl) {
    return (
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={(navState) => {
          const url = navState.url;

          // ✅ Bắt callback VNPAY
          if (url.includes("vnpay/callback")) {
            if (url.includes("vnp_ResponseCode=00")) {
              Alert.alert("✅ Thành công", "Thanh toán thành công!");

              router.replace({
                pathname: "/success",
                params: { code: booking.bookingCode },
              });
            } else {
              Alert.alert("❌ Thất bại", "Thanh toán không thành công");

              router.replace({
                pathname: "/failed",
                params: { code: booking.bookingCode },
              });
            }
          }
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán booking</Text>

      {/* Countdown */}
      <Text style={styles.timer}>Thời gian giữ ghế: {timeLeft}s</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Mã booking: {booking.bookingCode}</Text>
        <Text style={styles.label}>Số ghế: {booking.seats.join(", ")}</Text>
        <Text style={styles.label}>Số lượng: {booking.quantity}</Text>
        <Text style={styles.amount}>Tổng tiền: {booking.totalAmount} VND</Text>
        <Text style={styles.label}>Trạng thái: {booking.status}</Text>
      </View>

      {expired ? (
        <Text style={styles.expiredText}>
          ⛔ Booking đã hết hạn, vui lòng đặt lại
        </Text>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={handlePay}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Thanh toán bằng VNPAY</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  timer: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "#FF3B30",
    fontWeight: "600",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
  },
  amount: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#007AFF",
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  expiredText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "600",
  },
});
