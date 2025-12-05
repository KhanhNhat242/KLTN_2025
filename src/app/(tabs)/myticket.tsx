import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookTicket() {
  const { id } = useLocalSearchParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const STATUS_VI: Record<string, string> = {
    CONFIRMED: "Đã xác nhận",
    AWAITING_PAYMENT: "Chờ thanh toán",
    CANCELED: "Đã hủy",
    COMPLETED: "Đã hoàn thành",
    EXPIRED: "Đã hết hạn",
    PENDING: "Đang xử lý",
  };


 useEffect(() => {
   if (!id) return;

   const fetchBooking = async () => {
     try {
       const token = await AsyncStorage.getItem("token"); // có thể thiếu dòng này

       const res = await fetch(
         `https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/${id}`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`, // 👈 rất quan trọng
           },
         }
       );

       const text = await res.text(); // 👈 lấy raw text để kiểm tra

       console.log("RAW RESPONSE:", text);

       // thử parse lại
       const data = JSON.parse(text);

       setBooking(data);
     } catch (error) {
       console.log("❌ Lỗi:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchBooking();
 }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy booking</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎫 Thông tin vé của tui</Text>

      <View style={styles.card}>
        <Field label="Booking Code" value={booking.bookingCode} />
        <Field
          label="Trạng thái"
          value={STATUS_VI[booking?.status] || booking?.status}
        />
        <Field label="Số lượng" value={booking.quantity} />
        <Field label="Tổng tiền" value={`${booking.totalAmount} VND`} />
        <Field label="Trip ID" value={booking.tripId} />
      </View>
    </View>
  );
}
type FieldProps = {
  label: string;
  value: string | number | null | undefined;
};
const Field = ({ label, value }: FieldProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb", padding: 20,marginTop:20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#6b7280",
  },
  value: {
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
});
