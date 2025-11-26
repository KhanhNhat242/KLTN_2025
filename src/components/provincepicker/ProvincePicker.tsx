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
  visible: boolean;
  onClose: () => void;
}

const ProvincePicker = ({
  label,
  value,
  provinces,
  onSelect,
  visible,
  onClose,
}: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
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
                  onClose();
                }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            className="mt-[10px] p-[12px] bg-red-500 rounded-[8px]"
            onPress={onClose}>
            <Text className="text-white text-center">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};



export default ProvincePicker;
