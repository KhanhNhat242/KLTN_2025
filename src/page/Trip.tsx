import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import downloadicon from '../assets/downloadicon.png'
import { useEffect, useState } from 'react';
import TripModal from '../components/TripModal';
import DeleteMocal from '../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { setTrips } from '../redux/tripSlice';
import type { Province, Trip } from '../interface/Interface';
import { useNavigate } from 'react-router-dom';

const Trip = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedTrip, setSelectedTrip] = useState<Trip>()
    const [provinces, setProvinces] = useState<Province[]>([])
    const [currentPStart, setCurrentPStart] = useState<number>(0)
    const [currentPEnd, setCurrentPEnd] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const trips = useSelector((state: RootState) => state.trips)
    const navigate = useNavigate()

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds} ngày ${day}/${month}/${year}`
    }

    const getProvinces = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // console.log(res.data)
            setProvinces(res.data)
        })
        .catch((error) => {
            // alert('Error when get provinces!')
            console.log(error)
        })
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
        console.log(res.data)
        dispatch(setTrips(res.data))
      })
      .catch(() => {
          console.log('Get data fail!')
      })
    }

    const handleFilter = async () => {
      if (currentPStart !== 0 && currentPEnd !== 0) {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?originProvinceCode.equals=${currentPStart}&destinationProvinceCode.equals=${currentPEnd}`, {
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
    }

    useEffect(() => {
      if (token) {
          getData()
      }
    }, [token])

    useEffect(() => {
      getProvinces()
    }, [])

    return (
      <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
          <HeaderTop />
          <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách chuyến xe</h2>
          <div className='w-full flex flex-row justify-between'>
            <div className='w-[50%] h-[90%] flex flex-row'>
              {/* <Search placeholder='Tìm trong danh sách tuyến' /> */}
              {/* <Filter type='trip' /> */}
              <select className='w-[20%] p-[0px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                  onChange={(e) => setCurrentPStart(Number(e.target.value))}>
                  <option value="">Nơi đi</option>
                  { 
                      provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                          <option key={province.id} value={province.provinceCode}>{province.name}</option>
                      ))
                  }
              </select>
              <select className='w-[20%] p-[0px] rounded-[5px] mx-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                  onChange={(e) => setCurrentPEnd(Number(e.target.value))}>
                  <option value="">Nơi đến</option>
                  { 
                      provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                          <option key={province.id} value={province.provinceCode}>{province.name}</option>
                      ))
                  }
              </select>
              <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => handleFilter()}>Tìm kiếm</button>
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
                }}>+ Tạo chuyến xe mới</button>
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
                  <th className="p-3 border-b">Giá vé cơ bản</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => {
                  return (
                    <tr key={trip.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/bus-detail', { state: { busdata: trip.vehicle, tripdata: trip } })}>
                        <td className="p-3 border-b">{trip.id}</td>
                        <td className="p-3 border-b">{trip.tripCode}</td>
                        <td className="p-3 border-b">{formatTimestamp(Number(trip.departureTime))}</td>
                        <td className="p-3 border-b">{formatTimestamp(Number(trip.arrivalTime))}</td>
                        <td className="p-3 border-b">{trip.route.origin.name}</td>
                        <td className="p-3 border-b">{trip.route.destination.name}</td>
                        <td className="p-3 border-b">{trip.baseFare}</td>
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
        {isDelete && <DeleteMocal setIsDelete={setIsDelete} />}
      </div>
    )
}

export default Trip
