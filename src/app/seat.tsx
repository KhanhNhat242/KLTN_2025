import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

type Seat = {
  id: string;
  status: "empty" | "selected" | "sold" | "locked";
};

type SeatGroup = "lowerLeft" | "lowerRight" | "upperLeft" | "upperRight";

export interface BuyNGetM {
  id: number;
  buyN: number;
  getM: number;
  isDeleted: boolean;
}

export interface PercentOff {
  id: number;
  minPrice: number;
  percent: number;
  maxOff: number;
  isDeleted: boolean;
}


export default function SeatPage() {
  const params = useLocalSearchParams();
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [token, setToken] = useState<string | null>(null);

  const [promotions, setPromotions] = useState<any[]>([]);
  const [cPromotions, setCPromotions] = useState<any[]>([]);
  const [applyPromotion, setApplyPromotion] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");

  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const [tripAdress, setTripAdress] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const renderSeat = (seat: Seat, group: SeatGroup) => {
    let bgColor = "#fff";
    if (seat.status === "selected") bgColor = "#007AFF";
    if (seat.status === "sold") bgColor = "#FF3B30";
    const isDisabled = seat.status === "sold" || seat.status === "locked";
    return (
      <TouchableOpacity
        key={seat.id}
        onPress={() => toggleSeat(seat, group)}
        disabled={isDisabled}
        style={[
          styles.seat,
          {
            backgroundColor:
              seat.status === "selected"
                ? "#007AFF"
                : seat.status === "sold"
                ? "#FF3B30"
                : seat.status === "locked"
                ? "#8E8E93"
                : "#fff",
          },
        ]}>
        <Text style={{ color: seat.status === "selected" ? "#fff" : "#000" }}>
          {seat.id}
        </Text>
      </TouchableOpacity>
    );
  };

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

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      console.log("TOKEN LẤY ĐƯỢC:", value);
      if (value) setToken(value);
    });
  }, []);

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

  const getPromotion = async () => {
    if (!token) return;

    const today = new Date().toISOString().split("T")[0];

    try {
      const res = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions?startDate.lessThan=${today}&endDate.greaterThan=${today}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setPromotions(data);
    } catch (e) {
      console.log("Lỗi lấy promotions:", e);
    }
  };

  const getCPromotion = async (id: number) => {
    try {
      const res = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${id}/detail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setCPromotions((prev) => [...prev, data]);
    } catch (e) {
      console.log("Lỗi lấy chi tiết KM:", e);
    }
  };

  const calcPrice = () => {
    if (!trip) return;
    const base = trip.route.baseFare;
    const typeFactor = trip.vehicle.typeFactor;

    const result = base * typeFactor * selectedSeats.length * 1000;
    setPrice(result);
    setFinalPrice(result);
  };

  const applyPromo = async () => {
    if (!promoCode) return setFinalPrice(price);

    try {
      const res = await fetch(
        "https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/draft",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tripId: trip.id,
            seats: selectedSeats,
            promoCode,
            customerId: 6,
            idemKey: "ABC123456",
            holdTtlSec: 300000,
          }),
        }
      );

      const data = await res.json();
      setFinalPrice(data.totalAmount * 1000);
    } catch (err) {
      console.log("Lỗi apply promo:", err);
    }
  };

  const toggleSeat = (seat: Seat, group: SeatGroup) => {
    if (seat.status === "sold" || seat.status === "locked") return;

    const updateGroup = (setter: any, list: Seat[]) => {
      setter(
        list.map((s) =>
          s.id === seat.id
            ? {
                ...s,
                status: s.status === "selected" ? "empty" : "selected",
              }
            : s
        )
      );
    };

    if (group === "lowerLeft") updateGroup(setLowerLeft, lowerLeft);
    if (group === "lowerRight") updateGroup(setLowerRight, lowerRight);
    if (group === "upperLeft") updateGroup(setUpperLeft, upperLeft);
    if (group === "upperRight") updateGroup(setUpperRight, upperRight);

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const generateIdemKey = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };

  // Cập nhật trạng thái local ghế: những ghế nằm trong array -> set 'sold'
  const markSeatsSoldLocal = (seatIds: string[]) => {
    const mark = (list: Seat[], setter: any) =>
      setter(
        list.map((s) => (seatIds.includes(s.id) ? { ...s, status: "sold" } : s))
      );

    mark(lowerLeft, setLowerLeft);
    mark(lowerRight, setLowerRight);
    mark(upperLeft, setUpperLeft);
    mark(upperRight, setUpperRight);

    // clear selected nếu cần
    setSelectedSeats((prev) => prev.filter((id) => !seatIds.includes(id)));
  };

  // Lấy chi tiết booking và khoá ghế tương ứng (gọi khi quay về sau payment)
  const fetchBookingAndLockSeats = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(
        `https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        // giả sử response có field seats: string[]
        const seatsFromBooking: string[] =
          data?.seats || data?.seatNumbers || [];
        if (seatsFromBooking.length > 0) {
          markSeatsSoldLocal(seatsFromBooking);
        }
      } else {
        console.log("Lấy booking thất bại:", data);
      }
    } catch (e) {
      console.log("Lỗi fetchBookingAndLockSeats:", e);
    }
  };

  const handleBook = async () => {
    setErrorMsg(null);

    if (!token) {
      Alert.alert("Lỗi", "Bạn chưa đăng nhập");
      return;
    }
    if (!selectedSeats || selectedSeats.length === 0) {
      Alert.alert("Chọn ghế", "Vui lòng chọn ít nhất 1 ghế để đặt.");
      return;
    }

    setLoading(true);
    const idemKey = generateIdemKey();
    // cố gắng lấy userId từ AsyncStorage (nếu bạn lưu), fallback 6
    const userIdStr = (await AsyncStorage.getItem("userId")) || "6";
    const customerId = Number(userIdStr) || 6;

    const body = {
      tripId: trip.id,
      seats: selectedSeats,
      promoCode: promoCode || undefined,
      customerId,
      idemKey,
      holdTtlSec: 300, // seconds - bạn có thể đổi theo yêu cầu; trong code cũ bạn dùng 300000 (ms) -> kiểm tra API yêu cầu đơn vị
    };

    try {
      const res = await fetch(
        "https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings/real-booking",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      console.log("real-booking response:", data);

      if (res.ok) {
        // giả sử API trả về bookingId và payment link, tuỳ API thật sự có thể khác tên trường
        const id = data?.id || data?.bookingId || data?.booking?.id;
        const paymentUrl =
          data?.paymentLink?.checkoutUrl ||
          data?.paymentUrl ||
          data?.payment?.url ||
          data?.paymentUrlCheckout;

        setBookingId(id?.toString() || null);

        // Sau khi tạo booking thành công, điều hướng sang màn thanh toán
        // Mình gửi bookingId và paymentUrl trong params để màn PayBooking biết
        // Nếu màn PayBooking của bạn nhận param khác, sửa lại
        const booking = {
          bookingId: id,
          seats: selectedSeats,
          totalAmount: finalPrice,
          quantity: selectedSeats.length,
          tripId: trip.id,
          status: "PENDING",
          paymentUrl: paymentUrl || null,
        };

        router.push(
          `/paybooking?booking=${encodeURIComponent(JSON.stringify(booking))}`
        );
      } else {
        // lỗi từ server
        const msg = data?.message || "Đặt xe thất bại";
        setErrorMsg(msg);
        Alert.alert("Đặt xe thất bại", msg);
      }
    } catch (err) {
      console.log("Lỗi gọi real-booking:", err);
      setErrorMsg("Lỗi mạng, thử lại sau");
      Alert.alert("Lỗi", "Lỗi mạng, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calcPrice();
  }, [selectedSeats]);

  useEffect(() => {
    if (token) getPromotion();
  }, [token]);

  useEffect(() => {
    promotions.forEach((p) => getCPromotion(p.id));
  }, [promotions]);

  useEffect(() => {
    const list: string[] = [];

    cPromotions.forEach((c) => {
      // Buy N get M
      c.buyNGetMS?.forEach((b: BuyNGetM) => {
        if (selectedSeats.length === b.buyN) {
          list.push(`Mua ${b.buyN} tặng ${b.getM} (${c.code})`);
        }
      });

      // Percent off
      c.percentOffs?.forEach((p: PercentOff) => {
        if (price >= p.minPrice) {
          list.push(`Giảm ${p.percent}% tối thiểu ${p.minPrice} (${c.code})`);
        }
      });
    });

    setApplyPromotion([...new Set(list)]);
  }, [selectedSeats, price]);

  useEffect(() => {
    applyPromo();
  }, [promoCode]);

  useEffect(() => {
    if (promoCode) applyPromo();
  }, [selectedSeats]);

  useEffect(() => {
    if (token) {
      console.log("ĐÃ CÓ TOKEN → GỌI API getTrip");
      console.log("TripID:", trip.id);
      getTrip(trip.id);
    }
  }, [token]);

  // Khi quay trở lại SeatPage → khóa ghế đã mua
  useFocusEffect(
    useCallback(() => {
      if (bookingId) {
        console.log("Quay lại SeatPage → khóa ghế");
        fetchBookingAndLockSeats(bookingId);
      }
    }, [bookingId])
  );

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
              console.log("MỞ MODAL");
              setModalKey((prev) => prev + 1);
              setShowSeatModal(true);
            }}>
            <View style={styles.seatInfo}>
              <MaterialIcons name="event-seat" size={18} color="#007AFF" />
              <Text style={styles.seatText}>Chọn ghế ngồi</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          key={modalKey}
          visible={showSeatModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowSeatModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Chọn ghế ngồi</Text>

              <ScrollView>
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

          {/* ==== DROPDOWN KHUYẾN MÃI ==== */}
          <View
            style={{ backgroundColor: "#fff", padding: 14, borderRadius: 12 }}>
            <TouchableOpacity
              onPress={() => setShowPromoModal(true)}
              style={{ paddingVertical: 10 }}>
              <Text style={{ fontWeight: "600", color: "#007AFF" }}>
                {promoCode ? `Mã: ${promoCode}` : "Chọn khuyến mãi "}
              </Text>
            </TouchableOpacity>

            {/* Danh sách gợi ý KM */}
            {/* {applyPromotion.length > 0 && (
              <View style={{ marginTop: 10 }}>
                {applyPromotion.map((p, i) => (
                  <Text key={i} style={{ fontSize: 13, color: "#555" }}>
                    • {p}
                  </Text>
                ))}
              </View>
            )} */}
          </View>

          <Modal
            visible={showPromoModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowPromoModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  maxHeight: "70%",
                }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginBottom: 10,
                  }}>
                  Danh sách khuyến mãi
                </Text>

                <ScrollView style={{ maxHeight: 300 }}>
                  {applyPromotion.map((p, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        setPromoCode(p); // Lưu nguyên description
                        setShowPromoModal(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                      }}>
                      <Text style={{ fontWeight: "600" }}>{p}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setShowPromoModal(false)}
                  style={{
                    marginTop: 15,
                    backgroundColor: "#007AFF",
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "600",
                    }}>
                    Đóng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* ====== TÍNH TIỀN ====== */}
          <View
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 12,
              marginTop: 20,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 5,
              elevation: 3,
            }}>
            <Text
              style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>
              💵 Thanh toán
            </Text>

            {/* Tạm tính */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}>
              <Text style={{ fontSize: 14, color: "#555" }}>Tạm tính</Text>
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                {price.toLocaleString()} đ
              </Text>
            </View>

            {/* Giảm giá */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}>
              <Text style={{ fontSize: 14, color: "#555" }}>Khuyến mãi</Text>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#e74c3c" }}>
                - {(price - finalPrice).toLocaleString()} đ
              </Text>
            </View>

            {/* Gạch chia */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#ddd",
                marginVertical: 10,
              }}
            />

            {/* Tổng tiền */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                Tổng tiền:
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#007AFF" }}>
                {finalPrice.toLocaleString("vi-VN")} đ
              </Text>
            </View>
          </View>
        </View>

        {errorMsg ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>
            {errorMsg}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={handleBook}
          disabled={loading || selectedSeats.length === 0}
          style={{
            marginTop: 10,
            backgroundColor: selectedSeats.length === 0 ? "#9ec9ff" : "#007AFF",
            paddingVertical: 10,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {loading ? (
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
          ) : null}
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
