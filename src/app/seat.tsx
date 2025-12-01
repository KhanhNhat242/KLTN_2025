import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
type Seat = {
  id: string;
  status: "empty" | "selected" | "sold";
};

type SeatGroup = "lowerLeft" | "lowerRight" | "upperLeft" | "upperRight";

export interface Promotion {
  id: number;
  code: string;
  description: string;
  startDate: [];
  endDate: [];
  buyNGetMS: BuyNGetM[];
  percentOffs: PercentOff[];
  usageLimit: number;
  usedCount: number;
  isDeleted: boolean;
}

export interface PercentOff {
  id: number;
  percent: number;
  maxOff: number;
  minPrice: number;
  isDeleted: boolean;
}

export interface BuyNGetM {
  id: number;
  buyN: number;
  getM: number;
  isDeleted: boolean;
}

export default function SeatPage() {
  const params = useLocalSearchParams();
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [promo, setPromo] = useState<string>("");

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [cPromotions, setCPromotions] = useState<Promotion[]>([]);
  const [applyPromotion, setApplyPromotion] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");

  const [price, setPrice] = useState<number>(1);
  const [finalPrice, setFinalPrice] = useState<number>(1);

  

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
      alert("Vui lòng chọn ghế trước!");
      setShowSeatModal(true);
      return;
    }

    // if (!promo) {
    //   alert("Vui lòng chọn khuyến mãi!");
    //   return;
    // }

    if (!customerId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    const body = {
      tripId: trip?.id, // lấy từ props hoặc route params
      seats: selectedSeats, // list ghế
      promoCode: promo, // cho đại
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

  const extractCode = (str: string) => {
    const match = str.match(/\((.*?)\)/);
    return match ? match[1] : null;
  };

  const getPromotion = async () => {
    try {
      const date = new Date();
      const cd = date.toISOString().split("T")[0];

      const response = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions?startDate.lessThan=${cd}&endDate.greaterThan=${cd}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": "41866a2d-cdc1-4547-9eef-f6d3464f7b6b",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.log("Filter fail!", error);
    }
  };


  useEffect(() => {
    const loadUser = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedProfileId = await AsyncStorage.getItem("profileId");

      if (storedToken) setToken(storedToken);
      if (storedProfileId) setCustomerId(storedProfileId);
    };

    loadUser();
  }, []);

  // Gọi lại API sau khi có token và trip.id
  useEffect(() => {
    if (token && trip?.id) {
      getTrip(trip.id);
    }
  }, [token, trip?.id]);


   useEffect(() => {
    //  getVehicle();
    //  getTrip();
     getPromotion();
   }, []);

  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value?: string;
  }) => {
    if (!value) return null;

    return (
      <View style={styles.infoRow}>
        <View style={{ marginRight: 6 }}>{icon}</View>

        <Text style={styles.infoLabel}>{label}:</Text>

        <Text style={styles.infoValue} numberOfLines={2} ellipsizeMode="tail">
          {value}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🚌 Thông tin chuyến xe</Text>

          <InfoRow
            icon={<MaterialIcons name="route" size={18} color="#333" />}
            label="Tuyến"
            value={`${trip.route?.origin?.name} → ${trip.route?.destination?.name}`}
          />

          <View style={styles.twoCol}>
            <View style={styles.col}>
              <InfoRow
                icon={<MaterialIcons name="schedule" size={10} color="#333" />}
                label="Giờ đi"
                value={new Date(trip.departureTime * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />

              <InfoRow
                icon={
                  <MaterialIcons
                    name="airport-shuttle"
                    size={10}
                    color="#333"
                  />
                }
                label="Loại xe"
                value={trip.vehicle?.type}
              />

              <InfoRow
                icon={
                  <MaterialIcons
                    name="confirmation-number"
                    size={10}
                    color="#333"
                  />
                }
                label="Biển số"
                value={trip.vehicle?.plateNumber}
              />
            </View>
          </View>

          <InfoRow
            icon={
              <MaterialIcons name="location-pin" size={18} color="#e74c3c" />
            }
            label="Điểm đón"
            value={trip.route?.origin?.name}
          />

          {tripAdress && (
            <InfoRow
              icon={
                <MaterialIcons name="my-location" size={18} color="#e67e22" />
              }
              label="Địa chỉ đón"
              value={tripAdress.route.origin.address.streetAddress}
            />
          )}

          <InfoRow
            icon={<MaterialIcons name="flag" size={18} color="#27ae60" />}
            label="Điểm đến"
            value={trip.route?.destination?.name}
          />

          {tripAdress && (
            <InfoRow
              icon={
                <MaterialIcons name="location-on" size={18} color="#27ae60" />
              }
              label="Địa chỉ đến"
              value={tripAdress.route.destination.address.streetAddress}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              if (getSelectedSeats().length === 0) {
                setShowSeatModal(true);
              }
            }}>
            <View style={styles.seatInfo}>
              <MaterialIcons name="event-seat" size={18} color="#007AFF" />
              <Text style={styles.seatText}>
                {getSelectedSeats().length > 0
                  ? getSelectedSeats().join(", ")
                  : "Bấm để chọn ghế"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal visible={showSeatModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Chọn ghế ngồi</Text>

              <ScrollView>
                {/* Dán nguyên khối sơ đồ ghế của bạn vào đây */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  {/* Tầng dưới */}
                  <View style={{ marginTop: 20 }}>
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
                  <View style={{ marginTop: 20 }}>
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
              </ScrollView>

              <TouchableOpacity
                onPress={() => setShowSeatModal(false)}
                style={styles.closeButton}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Xong</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ marginVertical: 15 }}>
          <Text style={{ marginBottom: 6, fontWeight: "600" }}>
            Chọn khuyến mãi
          </Text>

          <View style={styles.pickerBox}>
            <Picker
              selectedValue={promo}
              onValueChange={(value) => setPromo(value)}>
              {applyPromotion.map((a) => (
                <Picker.Item
                  key={extractCode(a)}
                  label={a} 
                  value={extractCode(a)} 
                />
              ))}
            </Picker>
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
    </SafeAreaView>
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
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  infoLabel: {
    width: 90,
    fontWeight: "600",
    color: "#555",
    fontSize: 13,
  },

  infoValue: {
    flex: 1,
    color: "#111",
    fontSize: 13,
  },

  twoCol: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  col: {
    flex: 1,
  },

  seatInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F1F7FF",
  },

  seatText: {
    marginLeft: 6,
    color: "#007AFF",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    maxHeight: "85%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});
