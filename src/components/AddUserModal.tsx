import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
  onSuccess: (msg: string) => void;
}

interface AppUserCreate {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

const AddUserModal = ({ isOpen, onClose, onAdded, onSuccess }: Props) => {
  const [form, setForm] = useState<AppUserCreate>({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (isOpen) {
      setForm({
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const payload = {
        ...form,
        keycloakId: crypto.randomUUID(),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axios.post(
        "https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      onSuccess(
        `🎉 Thêm khách hàng ${form.firstName} ${form.lastName} thành công!`
      );
      onAdded();
      onClose();
    } catch (err) {
      console.log("❌ Error add user:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true">
      <div className="fixed flex justify-center items-center inset-0 bg-gray-500/75 transition-opacity">
        <div className="bg-white w-[400px] p-5 rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold mb-4">Thêm khách hàng</h2>
          <div className="mb-3">
            <label className="flex items-start font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="flex items-start font-medium">
              Số điện thoại
            </label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="flex items-start font-medium">Họ</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="flex items-start font-medium">
              Tên khách hàng
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="mr-3 px-4 py-2 bg-gray-300 rounded cursor-pointer"
              onClick={onClose}>
              Hủy
            </button>

            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
