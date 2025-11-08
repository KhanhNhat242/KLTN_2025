import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import downloadicon from '../assets/downloadicon.png'
import { useEffect, useState } from 'react';
import TripModal from '../components/TripModal';
import DeleteModal from '../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { setTrips } from '../redux/tripSlice';
import type { Trip } from '../interface/Interface';
import SearchTrip from '../components/SearchTrip';

const Trip = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedTrip, setSelectedTrip] = useState<Trip>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const trips = useSelector((state: RootState) => state.trips)

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`
    }

    const getData = async () => {
      await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips', {
        params: {
            'page': '0',
            'size': '40',
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
        },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch(setTrips(res.data))
      })
      .catch(() => {
          console.log('Get data fail!')
      })
    }

    useEffect(() => {
      if (token) {
          getData()
      }
    }, [token])

    return (
      <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
          <HeaderTop />
          <h2 className='text-[20px] text-left font-bold mt-[10px]'>Quản lý lịch trình</h2>
          <div className='w-full flex flex-row justify-between'>
            <SearchTrip />
            <div className='flex flex-row items-end pb-[20px]'>
              <button className='h-[30%] p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                <img src={downloadicon} className='size-[20px] mr-[5px]' />
                <p>Xuất Excel</p>
              </button>
              <button className='h-[30%] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                onClick={() => {
                  setIsOpen(true)
                  setIsEdit(false)
                }}>+ Tạo lịch trình mới</button>
            </div>
          </div>
          <div className='mt-[20px]'>
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Mã tuyến</th>
                  <th className="p-3 border-b">Tuyến xe</th>
                  <th className="p-3 border-b">Thời gian khởi hành</th>
                  <th className="p-3 border-b">Thời gian kết thúc</th>
                  <th className="p-3 border-b">Nơi đi</th>
                  <th className="p-3 border-b">Nơi đến</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => {
                  if (Number(trip.id) >= 1500)
                  return (
                    // <tr key={trip.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/bus-detail', { state: { busid: trip.vehicle.id, tripdata: trip } })}>
                    <tr key={trip.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{trip.id}</td>
                        <td className="p-3 border-b">{`${trip.route.origin.address.ward.district.province.name} - ${trip.route.destination.address.ward.district.province.name}`}</td>
                        <td className="p-3 border-b">{formatTimestamp(Number(trip.departureTime))}</td>
                        <td className="p-3 border-b">{formatTimestamp(Number(trip.arrivalTime))}</td>
                        <td className="p-3 border-b">{trip.route.origin.name}</td>
                        <td className="p-3 border-b">{trip.route.destination.name}</td>
                        <td className="p-3 border-b space-x-2">
                          <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                            onClick={() => {
                              setSelectedTrip(trip)
                              setIsOpen(true)
                              setIsEdit(true)
                            }}>Sửa</button>
                          <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                        </td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (isEdit ? <TripModal isEdit={true} setIsOpen={setIsOpen} trip={selectedTrip} /> : <TripModal isEdit={false} setIsOpen={setIsOpen} /> ) }
        {isDelete && <DeleteModal setIsDelete={setIsDelete} />}
      </div>
    )
}

export default Trip
