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
  const { booking } = useLocalSearchParams();
  const bookingData = JSON.parse(booking as string);

  const bookingId = bookingData.bookingId;
  const tripId = bookingData.tripId;

  const [paymentUrl, setPaymentUrl] = useState(bookingData.paymentUrl);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);

  // Countdown giữ ghế
  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
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
            bookingId: bookingId,
            method: "SEPAY",
          }),
        }
      );

      const data = await res.json();

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

  // Khi đã có paymentUrl
  if (paymentUrl) {
    const handlePaymentSuccess = async () => {
      try {
        Alert.alert("✅ Thành công", "Thanh toán thành công!");

        const token = await AsyncStorage.getItem("token");

        const tripRes = await fetch(
          `https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${tripId}/detail`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tripData = await tripRes.json();

        await AsyncStorage.setItem(
          "last_trip_data",
          JSON.stringify(tripData.tripDTO)
        );

        router.replace({
          pathname: "/(tabs)/myticket",
          params: { id: bookingId },
        });
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi xử lý thanh toán");
      }
    };

    return (
      <WebView
        source={{ uri: paymentUrl }}
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url;

          if (url.includes("/payment/sepay/success")) {
            handlePaymentSuccess();
            return false;
          }

          if (url.includes("/payment/sepay/error")) {
            Alert.alert("❌ Thất bại", "Thanh toán thất bại!");
            router.replace("/(tabs)/home");
            return false;
          }

          return true;
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán booking</Text>
      <Text style={styles.timer}>Thời gian giữ ghế: {timeLeft}s</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Mã booking: {bookingData.bookingCode}</Text>
        <Text style={styles.label}>Số ghế: {bookingData.seats.join(", ")}</Text>
        <Text style={styles.label}>Số lượng: {bookingData.quantity}</Text>
        <Text style={styles.amount}>{bookingData.totalAmount} VND</Text>
        <Text style={styles.label}>Trạng thái: {bookingData.status}</Text>
      </View>

      {expired ? (
        <Text style={styles.expiredText}>⛔ Booking đã hết hạn</Text>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={handlePay}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Thanh toán bằng SEPAY</Text>
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
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: { marginBottom: 8, fontSize: 15 },
  amount: { marginTop: 10, fontWeight: "bold", fontSize: 18, color: "#007AFF" },
  btn: { backgroundColor: "#007AFF", padding: 16, borderRadius: 12 },
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
