import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import downloadicon from "../assets/downloadicon.png";
import Search from "../components/Search";
import AddUserModal from "../components/AddUserModal";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import ConfirmModal from "../components/ConfirmModal";
import AlertModal from "../components/AlertModal";
// import { useNavigate } from "react-router-dom";
import EditUserModal from "../components/EditUserModal";
interface AppUser {
  id: number;
  keycloakId: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: number[];
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  deletedBy: string;
  profile: unknown;
}

const Employees = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  // const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);


 

  const fetchUsers = async () => {
    try {
      const res = await axios.get<AppUser[]>(
        "https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": "41866a2d-cdc1-4547-9eef-f6d3464f7b6b",
          },
        }
      );
      setUsers(res.data);
      console.log("user", res.data);
    } catch (error) {
      console.log(" API error:", error);
    }
  };

  // const deleteUser = async (id: number) => {
  //   if (!confirm("Bạn có chắc muốn xóa khách hàng này?")) return;

  //   try {
  //     await axios.delete(
  //       `https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           accept: "*/*",
  //         },
  //       }
  //     );

  //     alert("🗑️ Xóa khách hàng thành công!");
  //     fetchUsers();
  //   } catch (error) {
  //     console.log("Delete error:", error);
  //     alert("Không thể xóa khách hàng!");
  //   }
  // };

  const showSuccess = (msg: string) => {
    setAlertMsg(msg);
    setShowAlert(true);
  };

  const openDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(
        `https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );

      setShowConfirm(false);
      setAlertMsg("🗑️ Xóa khách hàng thành công!");
      setShowAlert(true);
      fetchUsers();
    } catch (error) {
      console.log("Delete error:", error);
      setShowConfirm(false);
      setAlertMsg("❌ Không thể xóa khách hàng!");
      setShowAlert(true);
    }
  };

  // const handleRowClick = async (id: number) => {
  //   try {
  //     const res = await axios.get(
  //       `https://apigateway.microservices.appf4s.io.vn/services/msuser/api/app-users/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     navigate("/user-detail", { state: res.data });
  //   } catch (err) {
  //     console.log("❌ Error fetch user detail:", err);
  //   }
  // };

   const openEditModal = async (id: number) => {
     setEditId(id);
     setIsEditOpen(true);
   };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Header />
      <div className="w-full p-[10px]">
        <h2 className="text-[20px] text-left font-bold mt-[10px] mb-[10px]">
          Quản lý khách hàng
        </h2>

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row">
            <Search placeholder="Tìm khách hàng" />
            <select
              className="flex flex-row items-center rounded-[10px] p-[10px] ml-[10px]"
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#ccc",
              }}>
              <option value="all">Tất cả</option>
              <option value="happening">Đang diễn ra</option>
              <option value="ended">Đã kết thúc</option>
              <option value="notStarted">Chưa diễn ra</option>
            </select>
          </div>

          <div className="flex flex-row">
            <button
              className="p-[10px] flex flex-row items-center mx-[10px] rounded-[10px] cursor-pointer"
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#ccc",
              }}>
              <img src={downloadicon} className="size-[20px] mr-[5px]" />
              <p>Xuất Excel</p>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]">
              + Thêm khách hàng mới
            </button>
          </div>
        </div>

        <div className="mt-[20px]">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr className="cursor-pointer hover:bg-gray-100">
                <th className="p-3 border-b">Họ tên</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Số điện thoại</th>
                <th className="p-3 border-b">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-3 border-b">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="p-3 border-b">{u.email}</td>
                  <td className="p-3 border-b">{u.phoneNumber}</td>
                  <td className="p-3 border-b">
                    {/* <button
                      className="text-blue-600 hover:underline mr-3
                    "
                      onClick={() => handleRowClick(u.id)}>
                      Xem
                    </button> */}
                    <button
                      className="text-red-600 hover:underline cursor-pointer"
                      onClick={() => openDeleteConfirm(u.id)}>
                      Xóa
                    </button>

                    <button
                      className="text-yellow-600 hover:underline mr-3 ml-3 cursor-pointer"
                      onClick={() => openEditModal(u.id)}>
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdded={fetchUsers}
          onSuccess={showSuccess}
        />

        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          message="Bạn có chắc muốn xóa khách hàng này?"
        />

        <AlertModal
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          message={alertMsg}
        />

        <EditUserModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          userId={editId}
          onSuccess={showSuccess}
          onUpdated={fetchUsers}
        />
      </div>
    </div>
  );
};

export default Employees;
