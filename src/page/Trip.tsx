import Filter from '../components/Filter';
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import Search from '../components/Search';
import downloadicon from '../assets/downloadicon.png'
import { useState } from 'react';
import TripModal from '../components/TripModal';
import DeleteMocal from '../components/DeleteModal';
import tripdata from '../fakedata/fakeapitrip.json'

// const trip = tripdata;

interface Trip {
  id: number,
  
}

const Trip = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [trips, setTrips] = useState([])

  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách tuyến xe</h2>
        <div className='w-full flex flex-row justify-between'>
          <div className='flex flex-row'>
            <Search placeholder='Tìm trong danh sách tuyến' />
            <Filter type='trip' />
          </div>
          <div className='flex flex-row'>
            <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
              <img src={downloadicon} className='size-[20px] mr-[5px]' />
              <p>Xuất Excel</p>
            </button>
            <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
              onClick={() => {
                setIsOpen(true)
                setIsEdit(false)
              }}>+ Tạo tuyến xe mới</button>
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
                <th className="p-3 border-b">Khoảng cách</th>
                <th className="p-3 border-b">Giá vé cơ bản</th>
                {/* <th className="p-3 border-b">Trạng thái</th> */}
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trip.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">111</td>
                      <td className="p-3 border-b">{trip.station}</td>
                      <td className="p-3 border-b">{trip.totaltime}</td>
                      <td className="p-3 border-b">{trip.typeofbus}</td>
                      <td className="p-3 border-b">{trip.distance}</td>
                      {/* <td className="p-3 border-b">{trip.price}</td> */}
                      <td className="p-3 border-b">(Hoạt động)</td>
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
      {isOpen && (isEdit ? <TripModal isEdit={true} setIsOpen={setIsOpen} /> : <TripModal isEdit={false} setIsOpen={setIsOpen} /> ) }
      {isDelete && <DeleteMocal setIsDelete={setIsDelete} />}
    </div>
  )
}

export default Trip
