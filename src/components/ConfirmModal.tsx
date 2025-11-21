import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[350px]">
        <p className="text-lg font-medium">{message}</p>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-3"
            onClick={onClose}>
            Hủy
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
