import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripList() {
  const params = useLocalSearchParams();

  const from = JSON.parse(
    Array.isArray(params.from) ? params.from[0] : params.from!
  );
  const to = JSON.parse(Array.isArray(params.to) ? params.to[0] : params.to!);
  const trips = JSON.parse(
    Array.isArray(params.trips) ? params.trips[0] : params.trips!
  );

  console.log("TRIP OBJECT:", JSON.stringify(trips[0], null, 2));
  const renderTrip = (item: any) => {
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: "#fff",
          marginTop: 15,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}>
        {/* Hãng xe + Giá */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View className="w-full flex flex-row justify-between">
            <Text style={{ fontWeight: "600" }}>
              {item.vehicle.brand || "FUTA Bus Lines"}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#007AFF" }}>
              {(item.route.baseFare*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
            </Text>
          </View>
        </View>

        {/* Thông tin xe */}
        {/* <Text style={{ marginTop: 5 }}>
          {item.driver?.name || "Phương Trang"} - Ghế còn{" "}
          {item.availableSeats || 5}
        </Text> */}
        <Text className="my-[5px]">{`Từ ${item.route.origin.name} đến ${item.route.destination.name}`}</Text>
        <Text>
          Loại xe: {item.vehicle.type || "Limousine"}
        </Text>

        {/* Giờ đi - giờ đến */}
        <View className="w-full flex flex-row justify-between items-center my-[5px]">
          <Text className="w-[15%]">
            {new Date(item.departureTime * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
          </Text>
          <View className="w-[65%] flex flex-row items-center">
              <Image source={require('../../assets/starticon.png')} />
              <Text className="w-[60%] h-[1px]" style={{borderColor: '#ccc', borderStyle: 'dotted', borderWidth: 1}}></Text>
              <Image source={require('../../assets/endicon.png')} />
          </View>
          <Text className="w-[15%]">
            {new Date(item.arrivalTime * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        {/* <Text style={{ textAlign: "center", color: "#999", marginTop: 2 }}>
          {item.route?.distanceKm ? `${item.route.distanceKm} km` : "120km"} •{" "}
          {item.duration || "3 giờ 25 phút"}
        </Text> */}

        {/* Nút chọn chỗ */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "#007AFF",
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={() => {
            router.push({
              pathname: "/seat",
              params: {
                
                trip: JSON.stringify(item),
                from: JSON.stringify(from),
                to: JSON.stringify(to),
              },
            });
          }}>
          <Text
            style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>
            Chọn chỗ
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2", padding: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        🚏 {from.name} → {to.name}
      </Text>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderTrip(item)}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
