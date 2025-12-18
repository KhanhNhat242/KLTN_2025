import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ================== CONSTANT ================== */

const STATUS_VI: Record<string, string> = {
  CONFIRMED: "Đã xác nhận",
  AWAITING_PAYMENT: "Chờ thanh toán",
  CANCELED: "Đã hủy",
  COMPLETED: "Đã hoàn thành",
  EXPIRED: "Đã hết hạn",
  PENDING: "Đang xử lý",
};

const STATUS_COLOR: Record<string, string> = {
  CONFIRMED: "#16a34a",
  AWAITING_PAYMENT: "#f59e0b",
  CANCELED: "#dc2626",
  COMPLETED: "#2563eb",
  EXPIRED: "#6b7280",
  PENDING: "#0ea5e9",
};

/* ================== HELPERS ================== */

const formatHourMinute = (ts?: number) => {
  if (!ts) return "--:--";
  return new Date(ts * 1000).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMoney = (amount?: number) => {
  if (amount == null) return "---";
  return amount.toLocaleString("vi-VN") + " VND";
};

const getLocationName = (loc?: any) => {
  if (!loc) return "---";
  return loc.name || loc.city || loc.province || "---";
};

/* ================== COMPONENT ================== */

export default function BookTicket() {
  const { id } = useLocalSearchParams();
  const [booking, setBooking] = useState<any>(null);
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async (tripId: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${tripId}/detail`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setTrip(data);
    } catch (err) {
      console.log("❌ Lỗi fetch trip:", err);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(
          `https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBooking(data);

        if (data?.tripId) {
          fetchTrip(data.tripId);
        }
      } catch (err) {
        console.log("❌ Lỗi booking:", err);
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

  const tripDTO = trip?.tripDTO;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎫 Vé của tui</Text>

      {/* ===== STATUS BADGE ===== */}
      <View style={styles.badgeWrap}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: STATUS_COLOR[booking.status] || "#6b7280",
            },
          ]}>
          <Text style={styles.badgeText}>
            {STATUS_VI[booking.status] || booking.status}
          </Text>
        </View>
      </View>

      {/* ===== HEADER TUYẾN ===== */}
      {tripDTO && (
        <View style={styles.ticketHeader}>
          <Text style={styles.cityText}>
            {getLocationName(tripDTO.route.origin)}
          </Text>

          <Text style={styles.arrow}>→</Text>

          <Text style={styles.cityText}>
            {getLocationName(tripDTO.route.destination)}
          </Text>

          <Text style={styles.timeRange}>
            {formatHourMinute(tripDTO.departureTime)} –{" "}
            {formatHourMinute(tripDTO.arrivalTime)}
          </Text>
        </View>
      )}

      {/* ===== CARD THÔNG TIN XE ===== */}
      {tripDTO && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚌 Thông tin xe</Text>
          <Field
            label="Loại xe"
            value={`${tripDTO.vehicle.brand} ${tripDTO.vehicle.type}`}
          />
          <Field label="Biển số" value={tripDTO.vehicle.plateNumber} />
          <Field label="Mã tuyến" value={tripDTO.route.routeCode} />
        </View>
      )}

      {/* ===== CARD BOOKING ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📄 Thông tin đặt vé</Text>
        <Field label="Booking Code" value={booking.bookingCode} />
        <Field label="Số lượng vé" value={booking.quantity} />
        <Field label="Tổng tiền" value={formatMoney(booking.totalAmount)} />
      </View>
    </View>
  );
}

/* ================== SUB COMPONENT ================== */

const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  badgeWrap: {
    alignItems: "center",
    marginBottom: 16,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
  },

  ticketHeader: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },

  cityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  arrow: {
    color: "#e0e7ff",
    fontSize: 22,
    marginVertical: 4,
  },

  timeRange: {
    color: "#e0e7ff",
    marginTop: 8,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
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
