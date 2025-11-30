import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onSuccess: (msg: string) => void;
  onUpdated: () => void;
}

const EditUserModal = ({
  isOpen,
  onClose,
  userId,
  onSuccess,
  onUpdated,
}: Props) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  // Lưu nguyên object từ API
  interface UserData {
    id?: number;
    email?: string | null;
    phoneNumber?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
    updatedAt?: string | null;
    [key: string]: unknown;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  // Load User khi mở modal
  useEffect(() => {
    if (!isOpen || !userId) return;

    const loadUser = async () => {
      try {
        const res = await axios.get(
          `https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const u = res.data;
        setUserData(u); // Lưu toàn bộ user

        setForm({
          email: u.email || "",
          phoneNumber: u.phoneNumber || "",
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          dateOfBirth: u.dateOfBirth ? u.dateOfBirth.substring(0, 10) : "",
        });
      } catch (err) {
        console.log("❌ Load user error:", err);
      }
    };

    loadUser();
  }, [isOpen, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!userData) return;

    // Gộp lại thành object đầy đủ (PUT yêu cầu FULL DTO)
    const payload = {
      ...userData,
      email: form.email,
      phoneNumber: form.phoneNumber,
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth || null,
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.put(
        `https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSuccess("✔️ Cập nhật khách hàng thành công!");
      onUpdated();
      onClose();
    } catch (err) {
      console.log("❌ Update user error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white w-[450px] p-6 rounded-lg shadow-xl relative z-10">
        <h2 className="text-xl font-bold mb-4">Sửa thông tin khách hàng</h2>

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
          <label className="flex items-start font-medium">Số điện thoại</label>
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
          <label className="flex items-start font-medium">Tên</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* <div className="mb-3">
          <label className="flex items-start font-medium">Ngày sinh</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div> */}

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-3"
            onClick={onClose}>
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleUpdate}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;