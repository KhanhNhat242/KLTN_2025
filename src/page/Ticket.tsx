import React from 'react'
import Header from '../components/Header'

const tickets = [
  {
    route: "Hà Nội → Huế",
    type: "Ghế ngồi",
    price: "500,000",
    date: "01/08/2024",
  },
  {
    route: "Hà Nội → Huế",
    type: "Giường nằm",
    price: "700,000",
    date: "02/08/2024",
  },
  {
    route: "Hà Nội → TP.Hồ Chí Minh",
    type: "Limousine",
    price: "1,500,000",
    date: "05/08/2024",
  },
];

const Ticket = () => {
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
              <option value="volvo">Tất cả</option>
              <option value="saab">Hoạt động</option>
              <option value="fiat">Tạm dừng</option>
            </select>
          </form>
        </div>
        <div className="mt-[20px]">
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="p-3 font-medium">Tuyến đường</th>
                <th className="p-3 font-medium">Loại xe</th>
                <th className="p-3 font-medium">Giá vé (VND)</th>
                <th className="p-3 font-medium">Ngày áp dụng</th>
                <th className="p-3 font-medium">Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3">{ticket.route}</td>
                  <td className="p-3">{ticket.type}</td>
                  <td className="p-3">{ticket.price}</td>
                  <td className="p-3">{ticket.date}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline">
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Ticket
