import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";

type Province = {
  id: number;
  name: string;
  provinceCode: number;
};

interface Props {
  label: string;
  value: Province | null;
  provinces: Province[];
  onSelect: (p: Province) => void;
}

const ProvincePicker = ({ label, value, provinces, onSelect }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <View className="w-full mb-[10px]">
      <Text>{label}</Text>

      {/* Nút mở dropdown */}
      <TouchableOpacity
        className="w-full bg-white p-[12px] rounded-[8px] mt-[5px] border border-[#ccc]"
        onPress={() => setOpen(true)}>
        <Text className="font-bold">
          {value ? value.name : `Chọn ${label.toLowerCase()}...`}
        </Text>
      </TouchableOpacity>

      {/* Modal chọn tỉnh */}
      <Modal visible={open} animationType="slide" transparent>
        <View className="flex-1 bg-[rgba(0,0,0,0.3)] justify-center items-center">
          <View className="w-[90%] max-h-[70%] bg-white rounded-[10px] p-[10px]">
            <Text className="text-center font-bold text-[18px] mb-[10px]">
              {label}
            </Text>

            <FlatList
              data={provinces}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-[12px] border-b border-[#eee]"
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              className="mt-[10px] p-[12px] bg-red-500 rounded-[8px]"
              onPress={() => setOpen(false)}>
              <Text className="text-white text-center">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProvincePicker;
