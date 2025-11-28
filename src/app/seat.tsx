import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function SeatScreen() {
  const { trip } = useLocalSearchParams();
  const tripData = JSON.parse(Array.isArray(trip) ? trip[0] : trip!);

  // Ví dụ dữ liệu ghế
  const lowerSeats = [
    { code: "A01", status: "sold" },
    { code: "A02", status: "empty" },
    { code: "A03", status: "sold" },
    { code: "A04", status: "empty" },
    { code: "A05", status: "empty" },
  ];

  const upperSeats = [
    { code: "B01", status: "empty" },
    { code: "B02", status: "sold" },
    { code: "B03", status: "empty" },
    { code: "B04", status: "selected" },
    { code: "B05", status: "selected" },
  ];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seat: any) => {
    if (seat.status === "sold") return; // không chọn ghế đã bán

    setSelectedSeats((prev) =>
      prev.includes(seat.code)
        ? prev.filter((s) => s !== seat.code)
        : [...prev, seat.code]
    );
  };

  const renderSeat = (seat: any) => {
    const isSelected = selectedSeats.includes(seat.code);

    let bgColor = "#eee";
    if (seat.status === "sold") bgColor = "#c62828";
    else if (isSelected) bgColor = "#007AFF";

    return (
      <TouchableOpacity
        key={seat.code}
        onPress={() => toggleSeat(seat)}
        style={{
          width: 55,
          height: 80,
          backgroundColor: bgColor,
          margin: 8,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{seat.code}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Chọn chỗ</Text>

      {/* Tầng dưới */}
      <Text style={{ fontWeight: "600", marginTop: 15 }}>Tầng dưới</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
        }}>
        {lowerSeats.map(renderSeat)}
      </View>

      {/* Tầng trên */}
      <Text style={{ fontWeight: "600", marginTop: 15 }}>Tầng trên</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
        }}>
        {upperSeats.map(renderSeat)}
      </View>

      {/* Trạng thái */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontWeight: "600" }}>Trạng thái</Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#eee",
                marginRight: 5,
              }}
            />
            <Text>Còn trống</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#007AFF",
                marginRight: 5,
              }}
            />
            <Text>Đang chọn</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#c62828",
                marginRight: 5,
              }}
            />
            <Text>Đã bán</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
