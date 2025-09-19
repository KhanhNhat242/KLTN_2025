import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import Search from '../components/Search';
import Filter from '../components/Filter';
import downloadicon from '../assets/downloadicon.png'

const ticket = [
  {id: 221, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 222, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Giữ chỗ'},
  {id: 223, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Thất bại'},
  {id: 224, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 225, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Hoàn thành'},
  {id: 226, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 227, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 228, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 229, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 230, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 231, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 232, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 233, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 234, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 235, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 236, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 237, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
  {id: 238, customer: 'Le Van An', trip: 'Saigon - Angiang', seat: 'A22', status: 'Đã trả'},
];

const Ticket = () => {
  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách vé</h2>
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
            <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'>+ Tạo vé mới</button>
          </div>
        </div>
        <div className='mt-[20px]'>
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Mã vé</th>
                  <th className="p-3 border-b">Khách hàng</th>
                  <th className="p-3 border-b">Chuyến xe</th>
                  <th className="p-3 border-b">Ghế</th>
                  <th className="p-3 border-b">Trạng thái</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ticket.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{ticket.id}</td>
                    <td className="p-3 border-b">{ticket.customer}</td>
                    <td className="p-3 border-b">{ticket.trip}</td>
                    <td className="p-3 border-b">{ticket.seat}</td>
                    <td className="p-3 border-b">{ticket.status}</td>
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

export default Ticket
