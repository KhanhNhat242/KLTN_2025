/* eslint-disable @typescript-eslint/no-explicit-any */
import Filter from "../components/Filter";
import Header from "../components/Header";
import HeaderTop from "../components/HeaderTop";
import Search from "../components/Search";
import downloadicon from "../assets/downloadicon.png";
import { useEffect, useState } from "react";
import TripModal from "../components/TripModal";
import DeleteMocal from "../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../redux/store";
import { setTrips } from "../redux/tripSlice";

const Trip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [page, setPage] = useState(1);
  const size = 10;

  const token = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const trips = useSelector((state: RootState) => state.trips);

  const [paginatedTrips, setPaginatedTrips] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ngày ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
      dispatch(setTrips(res.data));

      const total = Math.ceil(res.data.length / size);
      setTotalPages(total);

      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      setPaginatedTrips(res.data.slice(startIndex, endIndex));
    } catch {
      console.log("Get data fail!");
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  useEffect(() => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    setPaginatedTrips(trips.slice(startIndex, endIndex));
  }, [page, trips]);

  return (
    <div className="w-full h-full flex flex-row justify-start">
      <Header />
      <div className="w-full p-[10px]">
        <HeaderTop />
        <h2 className="text-[20px] text-left font-bold mt-[10px] mb-[10px]">
          Danh sách tuyến xe
        </h2>
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row">
            <Search placeholder="Tìm trong danh sách tuyến" />
            <Filter type="trip" />
          </div>
          <div className="flex flex-row">
            <button className="p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer border border-gray-300">
              <img src={downloadicon} className="size-[20px] mr-[5px]" />
              <p>Xuất Excel</p>
            </button>
            <button
              className="p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]"
              onClick={() => {
                setIsOpen(true);
                setIsEdit(false);
              }}>
              + Tạo tuyến xe mới
            </button>
          </div>
        </div>

        <div className="mt-[20px]">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Mã tuyến</th>
                <th className="p-3 border-b">Tuyến xe</th>
                <th className="p-3 border-b">Thời gian khởi hành</th>
                <th className="p-3 border-b">Thời gian kết thúc</th>
                <th className="p-3 border-b">Giá vé cơ bản</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{trip.id}</td>
                  <td className="p-3 border-b">{trip.tripCode}</td>
                  <td className="p-3 border-b">
                    {formatTimestamp(trip.departureTime)}
                  </td>
                  <td className="p-3 border-b">
                    {formatTimestamp(trip.arrivalTime)}
                  </td>
                  <td className="p-3 border-b">{trip.baseFare}</td>
                  <td className="p-3 border-b space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setIsOpen(true);
                        setIsEdit(true);
                      }}>
                      Sửa
                    </button>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setIsDelete(true)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 border rounded disabled:opacity-50">
              Trang trước
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-blue-500 text-white" : ""
                }`}>
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 border rounded disabled:opacity-50">
              Trang sau
            </button>
          </div>
        </div>
      </div>

      {/* modals */}
      {isOpen && <TripModal isEdit={isEdit} setIsOpen={setIsOpen} />}
      {isDelete && <DeleteMocal setIsDelete={setIsDelete} />}
    </div>
  );
};

export default Trip;
