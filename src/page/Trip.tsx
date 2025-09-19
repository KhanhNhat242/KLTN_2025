import Filter from '../components/Filter';
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import Search from '../components/Search';
import downloadicon from '../assets/downloadicon.png'

const trip = [
  { id: "47291", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47292", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47293", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47294", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47295", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47296", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47297", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47298", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47299", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47300", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47301", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47302", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47303", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47304", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47305", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
  { id: "47306", location: "TP.HCM – An Giang", time: '8:30 - 11:30', type: 'Limousine', price: '300.000đ', status: "Hoạt động" },
];

const Trip = () => {
  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách tuyến xe</h2>
        <div className='w-full flex flex-row justify-between'>
          <div className='flex flex-row'>
            <Search placeholder='Tìm trong danh sách tuyến' />
            <Filter />
          </div>
          <div className='flex flex-row'>
            <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
              <img src={downloadicon} className='size-[20px] mr-[5px]' />
              <p>Xuất Excel</p>
            </button>
            <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'>+ Tạo xe mới</button>
          </div>
        </div>
        <div className='mt-[20px]'>
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Mã tuyến</th>
                <th className="p-3 border-b">Tuyến xe</th>
                <th className="p-3 border-b">Thời gian dự kiến</th>
                <th className="p-3 border-b">Loại xe</th>
                <th className="p-3 border-b">Giá vé cơ bản</th>
                <th className="p-3 border-b">Trạng thái</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trip.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{trip.id}</td>
                  <td className="p-3 border-b">{trip.location}</td>
                  <td className="p-3 border-b">{trip.time}</td>
                  <td className="p-3 border-b">{trip.type}</td>
                  <td className="p-3 border-b">{trip.price}</td>
                  <td className="p-3 border-b">{trip.status}</td>
                  <td className="p-3 border-b space-x-2">
                    <button className="text-blue-600 hover:underline">Sửa</button>
                    <button className="text-blue-600 hover:underline">Xóa</button>
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

export default Trip
