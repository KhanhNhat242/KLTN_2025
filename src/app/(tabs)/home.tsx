import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProvincePicker from "@/components/provincepicker/ProvincePicker";
import { useRouter } from "expo-router";

type Province = {
  id: number;
  name: string;
  provinceCode: number;
};

const Home = () => {
  const router = useRouter();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);

  const [fromProvince, setFromProvince] = useState<Province | null>(null);
  const [toProvince, setToProvince] = useState<Province | null>(null);
  const [showPicker, setShowPicker] = useState<"from" | "to" | null>(null);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isValid = !!fromProvince && !!toProvince && !!date;

  const fetchProvinces = async (token: string) => {
    setLoadingProvinces(true);

    try {
      const res = await axios.get(
        "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(res.data)) {
        setProvinces(res.data.slice(10));
      } else if (res.data?.content && Array.isArray(res.data.content)) {
        setProvinces(res.data.content.slice(10));
      } else {
        console.warn("⚠️ Unexpected provinces format", res.data);
        setProvinces([]);
      }
    } catch (err: any) {
      console.log("❌ Lỗi fetchProvinces:", err.response?.data || err.message);
      Alert.alert("Lỗi", "Không thể tải danh sách tỉnh/thành phố.");
    } finally {
      setLoadingProvinces(false);
    }
  };

  useEffect(() => {
    const loadProvinces = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Thông báo", "Bạn chưa đăng nhập.");
        return;
      }

      fetchProvinces(token);
    };

    loadProvinces();
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSearch = async () => {
    if (!fromProvince || !toProvince) {
      Alert.alert("Thông báo", "Vui lòng chọn điểm đi và điểm đến.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Lỗi", "Bạn chưa đăng nhập.");
      return;
    }

    const day = date.toISOString().split("T")[0]; // yyyy-mm-dd
    const startTime = `${day}T00:00:00.000Z`;
    const endTime = `${day}T23:59:59.000Z`;

    try {
      const res = await axios.get(
        "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips",
        {
          params: {
            page: 0,
            size: 200,
            "departureTime.greaterThan": startTime,
            "departureTime.lessThan": endTime,
            "originProvinceCode.equals": fromProvince.provinceCode,
            "destinationProvinceCode.equals": toProvince.provinceCode,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      const trips = res.data;

      console.log("🔍 API TRẢ VỀ TRIPS:", trips);

      if (!trips || trips.length === 0) {
        Alert.alert("Không có chuyến", "Không tìm thấy chuyến xe nào.");
        return;
      }

      router.push({
        pathname: "/trip-list",
        params: {
          from: JSON.stringify(fromProvince),
          to: JSON.stringify(toProvince),
          trips: JSON.stringify(trips),
        },
      });
    } catch (error: any) {
      Alert.alert("Lỗi", "Không tìm thấy chuyến xe nào.");
      console.log("Error search trip:", error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground
          source={require("../../../assets/homebg.png")}
          style={styles.bg}
          imageStyle={styles.bgImage}
        >
          <Text style={styles.headerText}>Bạn muốn đi đâu, Lộc</Text>
        </ImageBackground>

        {/* Chọn điểm đi & điểm đến */}
        <View style={styles.locationBox}>
          <Image
            source={require("../../../assets/locationicon.png")}
            style={styles.locationIcon}
          />

          <View style={styles.locationContent}>
            <TouchableOpacity onPress={() => setShowPicker("from")}>
              <Text>Chọn điểm đi: {fromProvince?.name || "..."}</Text>
            </TouchableOpacity>

            <Image
              source={require("../../../assets/line.png")}
              style={styles.line}
            />

            <TouchableOpacity onPress={() => setShowPicker("to")}>
              <Text>Chọn điểm đến: {toProvince?.name || "..."}</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../../assets/swapicon.png")}
            style={styles.swapIcon}
          />
        </View>

        {/* Chọn ngày */}
        <View style={styles.dateBox}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text>Ngày đi: {date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <Image
            source={require("../../../assets/calendaricon.png")}
            style={styles.calendarIcon}
          />
        </View>

        {/* Button tìm chuyến */}
        <View style={{ paddingHorizontal: 10, marginTop: 16 }}>
          <TouchableOpacity
            disabled={!isValid}
            style={[
              styles.searchBtn,
              { backgroundColor: isValid ? "#2563eb" : "#9ca3af" },
            ]}
            onPress={handleSearch}
          >
            <Text style={styles.searchText}>TÌM CHUYẾN XE</Text>
          </TouchableOpacity>
        </View>

        {/* Province Picker */}
        {showPicker && (
          <ProvincePicker
            visible={!!showPicker}
            label={showPicker === "from" ? "Điểm đi" : "Điểm đến"}
            value={showPicker === "from" ? fromProvince : toProvince}
            provinces={provinces}
            onSelect={(p) => {
              if (showPicker === "from") setFromProvince(p);
              else setToProvince(p);
              setShowPicker(null);
            }}
            onClose={() => setShowPicker(null)}
          />
        )}

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  bg: {
    width: "100%",
    height: 100,
  },
  bgImage: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    padding: 12,
    marginTop: 30,
  },
  locationBox: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 150,
  },
  locationIcon: {
    width: 40,
    height: "100%",
    resizeMode: "contain",
  },
  locationContent: {
    width: "70%",
    justifyContent: "space-between",
    height: "100%",
  },
  line: {
    width: "100%",
    height: 2,
    marginVertical: 6,
  },
  swapIcon: {
    width: 40,
    height: 40,
  },
  dateBox: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendarIcon: {
    width: 28,
    height: 28,
  },
  searchBtn: {
    padding: 16,
    borderRadius: 10,
  },
  searchText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
