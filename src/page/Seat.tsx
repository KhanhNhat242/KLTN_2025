import React from 'react'
import Header from '../components/Header'

const vehicles = [
  { id: "29A-00123", type: "Giường nằm", seat: "60 chỗ", status: "Hoạt động" },
  { id: "51B-45678", type: "Ghế ngồi", seat: "50", status: "Đang hoạt động" },
  { id: "30G-09876", type: "Limousine", seat: "", status: "Đang hoạt động" },
  { id: "30G-09876", type: "Giường nằm", seat: "33", status: "Ban g hoạt động" },
  { id: "30F-14045", type: "Hà mi vic", seat: "24 hố", status: "Bảo trì" },
  { id: "30F-14045", type: "Có ghế", seat: "10 chỗ xe", status: "Hoạt động" },
];

const Seat = () => {
  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-[80%] p-[10px]'>
        <div className='w-full flex flex-row justify-between'>
          <h2 className='text-[20px] font-bold'>Quản lý thông tin tuyến xe</h2>
          <button className='color-white bg-[#1677FF] font-bold'>Thêm tuyến mới</button>
        </div>
        <div className='w-full flex flex-row justify-between'>
          <input className='w-[60%]' type="text" placeholder='Tìm kiếm theo điểm đi/điểm đến' />
          <p></p>
          <form>
            <label className='mr-[10px]'>Trạng thái</label>
            <select>
              <option>Tất cả</option>
              <option>Còn trống</option>
              <option>Đã đặt</option>
            </select>
          </form>
        </div>
        <div className="">
          <table className="w-full border-collapse">
            <tbody>
              {Array.from({ length: Math.ceil(vehicles.length / 3) }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {vehicles.slice(rowIdx * 3, rowIdx * 3 + 3).map((v) => (
                    <td key={v.id} className="p-3 align-top">
                      <div className="border rounded-lg shadow-sm p-4 h-full">
                        <p className="font-bold text-lg">{v.id}</p>
                        <p className="text-gray-600">{v.type}</p>
                        {v.seat && <p>{v.seat}</p>}
                        <p
                          className={`font-medium ${
                            v.status.includes("Hoạt động") || v.status.includes("Đang hoạt động") || v.status.includes("Ban g")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {v.status}
                        </p>
                        <button className="mt-2 px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                          Xem chi tiết
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Seat
