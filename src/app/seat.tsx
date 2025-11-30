import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
type Seat = {
  id: string;
  status: "empty" | "selected" | "sold";
};

type SeatGroup = "lowerLeft" | "lowerRight" | "upperLeft" | "upperRight";

export default function SeatPage() {
  const params = useLocalSearchParams();
  const [lowerLeft, setLowerLeft] = useState<Seat[]>([
    { id: "1A01", status: "empty" },
    { id: "1A02", status: "empty" },
    { id: "1A03", status: "empty" },
    { id: "1A04", status: "empty" },
    { id: "1D01", status: "empty" },
  ]);

  const [lowerRight, setLowerRight] = useState<Seat[]>([
    { id: "1B01", status: "empty" },
    { id: "1B02", status: "empty" },
    { id: "1B03", status: "empty" },
    { id: "1B04", status: "empty" },
    { id: "1D02", status: "empty" },
    { id: "1E04", status: "empty" },
  ]);

  const [upperLeft, setUpperLeft] = useState<Seat[]>([
    { id: "2A01", status: "empty" },
    { id: "2A02", status: "empty" },
    { id: "2A03", status: "empty" },
    { id: "2A04", status: "empty" },
    { id: "2D01", status: "empty" },
    { id: "2E01", status: "empty" },
  ]);

  const [upperRight, setUpperRight] = useState<Seat[]>([
    { id: "2B01", status: "empty" },
    { id: "2B02", status: "empty" },
    { id: "2B03", status: "empty" },
    { id: "2B04", status: "empty" },
    { id: "2D02", status: "empty" },
    { id: "2E02", status: "empty" },
  ]);

  const trip = JSON.parse(
    Array.isArray(params.trip) ? params.trip[0] : params.trip!
  );

  const toggleSeat = (seat: Seat, group: SeatGroup) => {
    if (seat.status === "sold") return;

    const updatedSeat = {
      ...seat,
      status: seat.status === "selected" ? "empty" : "selected",
    };

    const setterMap: Record<SeatGroup, any> = {
      lowerLeft: setLowerLeft,
      lowerRight: setLowerRight,
      upperLeft: setUpperLeft,
      upperRight: setUpperRight,
    };

    setterMap[group]((prev: Seat[]) =>
      prev.map((s) => (s.id === seat.id ? updatedSeat : s))
    );
  };

  const renderSeat = (seat: Seat, group: SeatGroup) => {
    let bgColor = "#fff";
    if (seat.status === "selected") bgColor = "#007AFF";
    if (seat.status === "sold") bgColor = "#FF3B30";

    return (
      <TouchableOpacity
        key={seat.id}
        onPress={() => toggleSeat(seat, group)}
        style={[styles.seat, { backgroundColor: bgColor }]}>
        <Text style={{ color: seat.status === "selected" ? "#fff" : "#000" }}>
          {seat.id}
        </Text>
      </TouchableOpacity>
    );
  };

  const [token, setToken] = useState("");
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedProfileId = await AsyncStorage.getItem("profileId");

      if (storedToken) setToken(storedToken);
      if (storedProfileId) setCustomerId(storedProfileId);
    };

    loadUser();
  }, []);

  const randomKey = () => Math.random().toString(36).slice(2, 12);

  const getSelectedSeats = () => {
    return [
      ...lowerLeft.filter((s) => s.status === "selected"),
      ...lowerRight.filter((s) => s.status === "selected"),
      ...upperLeft.filter((s) => s.status === "selected"),
      ...upperRight.filter((s) => s.status === "selected"),
    ].map((s) => s.id);
  };

  const handleBooking = async () => {
    const selectedSeats = getSelectedSeats();

    if (selectedSeats.length === 0) {
      alert("Bạn chưa chọn ghế nào");
      return;
    }

    if (!customerId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    const body = {
      tripId: trip?.id, // lấy từ props hoặc route params
      seats: selectedSeats, // list ghế
      promoCode: "DEMO123", // cho đại
      customerId: 1500, // lấy từ login
      idemKey: randomKey(), // random mỗi lần click
      holdTtlSec: 300000,
    };

    try {
      const response = await fetch(
        "https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/real-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // TOKEN LOGIN
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log("Booking result: ", data);

      if (response.ok) {
        alert("Đặt xe thành công!");
      } else {
        alert("Đặt xe thất bại: " + (data.message || "Unknown error"));
      }
      router.push({
        pathname: "/paybooking",
        params: { booking: JSON.stringify(data) },
      });
    } catch (err) {
      console.log(err);
      alert("Lỗi kết nối server!");
    }
  };

  // Thêm state trip (nếu chưa có)
  const [tripAdress, setTripAdress] = useState<any>(null);

  // Hàm getTrip
  const getTrip = async (tripId: string) => {
    if (!token) {
      console.log("Token chưa có, chưa thể gọi API");
      return;
    }

    try {
      const response = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${tripId}/detail`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Trip detail:", JSON.stringify(data, null, 2));

      if (response.ok) {
        setTripAdress(data.tripDTO); // set dữ liệu về state
      } else {
        console.log("Lấy trip thất bại:", data.message || "Unknown error");
      }
    } catch (err) {
      console.log("Lỗi khi gọi API getTrip:", err);
    }
  };

  // Gọi lại API sau khi có token và trip.id
  useEffect(() => {
    if (token && trip?.id) {
      getTrip(trip.id);
    }
  }, [token, trip?.id]);

  return (
    <ScrollView style={{ flex: 1, padding: 15, backgroundColor: "#f9f9f9" }}>
      {/* Thông tin tuyến */}
      <View style={styles.infoBox}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Thông tin tuyến
        </Text>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Tuyến</Text>
        <Text style={{ marginBottom: 10 }}>
          {trip.route?.origin?.name} → {trip.route?.destination?.name}
        </Text>
        <Text>Mã: {trip.id}</Text>
        <Text>Mã chuyến: {trip.tripCode}</Text>
        <Text>Loại xe: {trip.vehicle?.type}</Text>
        <Text>Biển số: {trip.vehicle?.plateNumber}</Text>
        <Text>Điểm đón {trip.route?.origin?.name}</Text>
        <Text> Địa chỉ {tripAdress.tripDTO.route?.origin?.address?.streetAddress}</Text>
        <Text>Điểm đón {trip.route?.destination?.name}</Text>
        {/* <Text>
          Địa chỉ{tripAdress.route?.destination?.address?.streetAddress}
        </Text> */}

        <Text>
          Giờ đi:{" "}
          {new Date(trip.departureTime * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Ghế chọn:
          {getSelectedSeats().length > 0
            ? getSelectedSeats().join(", ")
            : "Chưa chọn ghế nào"}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Tầng dưới */}
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <MaterialIcons name="event-seat" size={24} color="#111" />
            <Text style={{ fontSize: 16 }}>Ghế tài xế</Text>
          </View>
          <Text style={styles.levelTitle}>Tầng dưới</Text>
          <View style={styles.seatRow}>
            <View style={styles.column}>
              {lowerLeft.map((s) => renderSeat(s, "lowerLeft"))}
            </View>
            <View style={styles.column}>
              {lowerRight.map((s) => renderSeat(s, "lowerRight"))}
            </View>
          </View>
        </View>

        {/* Tầng trên */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.levelTitle}>Tầng trên</Text>
          <View style={styles.seatRow}>
            <View style={styles.column}>
              {upperLeft.map((s) => renderSeat(s, "upperLeft"))}
            </View>
            <View style={styles.column}>
              {upperRight.map((s) => renderSeat(s, "upperRight"))}
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleBooking}
        style={{
          marginTop: 10,
          backgroundColor: "#007AFF",
          paddingVertical: 10,
          borderRadius: 8,
        }}>
        <Text
          style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>
          Đặt xe
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  seatRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  levelTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  legendTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendBox: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: 10,
  },
});
