import Filter from '../components/Filter';
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import Search from '../components/Search';
import downloadicon from '../assets/downloadicon.png'
import DeleteMocal from '../components/DeleteMocal';
import BusModal from '../components/BusModal';
import { useState } from 'react';

const bus = [
  { id: '111', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '112', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Bảo trì" },
  { id: '113', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Đã ngưng" },
  { id: '114', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Đã ngưng" },
  { id: '115', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '116', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '117', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '118', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Đã ngưng" },
  { id: '119', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '120', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '121', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '122', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '123', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '124', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '125', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '126', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '127', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
  { id: '128', licensePlate: "29A-00123", trip: "Saigon - Danang", type: 'Limousine', seatNumber: "36", driver: 'Nguyen Nhat Hoang', status: "Hoạt động" },
];

const BusInformation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)

    return (
      <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
          <HeaderTop />
          <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách xe</h2>
          <div className='w-full flex flex-row justify-between'>
            <div className='flex flex-row'>
              <Search placeholder='Tìm trong danh sách tuyến' />
              <Filter type='bus-information' />
            </div>
            <div className='flex flex-row'>
              <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                <img src={downloadicon} className='size-[20px] mr-[5px]' />
                <p>Xuất Excel</p>
              </button>
              <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                onClick={() => {
                  setIsEdit(false)
                  setIsOpen(true)
                }}>+ Tạo xe mới</button>
            </div>
          </div>
          <div className='mt-[20px]'>
              <table className="w-full border border-gray-200 text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b">Mã xe</th>
                    <th className="p-3 border-b">Biển số</th>
                    <th className="p-3 border-b">Tuyến xe</th>
                    <th className="p-3 border-b">Loại xe</th>
                    <th className="p-3 border-b">Số ghế</th>
                    <th className="p-3 border-b">Tài xế chính</th>
                    <th className="p-3 border-b">Trạng thái</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bus.map((bus) => (
                    <tr key={bus.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{bus.id}</td>
                      <td className="p-3 border-b">{bus.licensePlate}</td>
                      <td className="p-3 border-b">{bus.trip}</td>
                      <td className="p-3 border-b">{bus.type}</td>
                      <td className="p-3 border-b">{bus.seatNumber}</td>
                      <td className="p-3 border-b">{bus.driver}</td>
                      <td className="p-3 border-b">{bus.status}</td>
                      <td className="p-3 border-b space-x-2">
                        <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                          onClick={() => {
                            setIsOpen(true)
                            setIsEdit(true)
                          }}>Sửa</button>
                        <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isOpen && (isEdit ? <BusModal isEdit={true} setIsOpen={setIsOpen} /> : <BusModal isEdit={false} setIsOpen={setIsOpen} /> ) }
          {isDelete && <DeleteMocal setIsDelete={setIsDelete} />}
      </div>
    )
}

export default BusInformation
