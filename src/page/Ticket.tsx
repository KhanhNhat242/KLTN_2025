import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import Search from '../components/Search';
import Filter from '../components/Filter';
import downloadicon from '../assets/downloadicon.png'
import { useEffect, useState } from 'react';
import DeleteMocal from '../components/DeleteModal';
import TicketModal from '../components/TicketModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import axios from 'axios';
import { setTickets, updateTrip, updateVehicle } from '../redux/ticketSlice';
import type { Bus, Ticket, Trip } from '../interface/Interface';

const Ticket = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [currentTripID, setCurrentTripID] = useState<number[]>([])
  const [currentVehicleID, setCurrentVehicleID] = useState<number[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [vehicles, setVehicles] = useState<Bus[]>([])

  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch()
  const tickets = useSelector((state: RootState) => state.tickets)

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

  const getTickets = async () => {
    await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/tickets', {
      headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
        },
    })
    .then((res) => {
      // console.log(res.data)
      dispatch(setTickets(res.data))
      const ta = res.data
      setCurrentTripID(ta.map((t: Ticket) => t.tripId))
    })
    .catch(() => {
      console.log('Get tickets fail!')
    })
  }  

  const getTrip = async (id: number) => {
    // console.log(id)
    await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${id}/detail`, {
      headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
        },
    })
    .then((res) => {
      // console.log(res.data)
      // console.log(res.data.detailVM.vehicle)
      // console.log(res.data.tripDTO)
      if (res.data?.tripDTO) {
        setTrips((prev) => [...prev, res.data.tripDTO])
      }
    })
    .catch(() => {
      console.log('Get trip fail!')
    })
  }

  const getVehicle = async (id: number) => {
    // console.log(id)
    if (!isNaN(id)) {
      await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${id}`, {
        headers: {
              'Authorization': `Bearer ${token}`,
              'accept': '*/*',
              'Content-Type': 'application/json',
              'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
          },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data) {
          setVehicles((prev) => [...prev, res.data])
        }
      })
      .catch(() => {
        console.log('Get vehicle fail!')
      })
    }
  }

  useEffect(() => {
    getTickets()
  }, [])

  useEffect(() => {
      // console.log(currentTripID)
      currentTripID.forEach((c) => getTrip(c))
  }, [currentTripID])

  useEffect(() => {
    // console.log(trips)
    trips.forEach((t) => {
      dispatch(updateTrip({ id: Number(t.id), trip: t }))
    })
    // console.log(tickets)
    setCurrentVehicleID(tickets.map((t) => Number(t.trip?.vehicle.id)))
    // console.log(currentVehicleID)
    currentVehicleID.forEach((c) => getVehicle(c))
  }, [trips])

  useEffect(() => {
    // console.log(vehicles)
    vehicles.forEach((v) => {
      dispatch(updateVehicle({ id: Number(v.id), vehicle: v }))
    })
    // console.log(tickets)
  }, [vehicles])

  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý vé</h2>
        <div className='w-full flex flex-row justify-between'>
          <div className='flex flex-row'>
            <Search placeholder='Tìm trong danh sách tuyến' />
            <Filter type='ticket' />
          </div>
          <div className='flex flex-row'>
            <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
              <img src={downloadicon} className='size-[20px] mr-[5px]' />
              <p>Xuất Excel</p>
            </button>
            {/* <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'
              onClick={() => {
                setIsEdit(false)
                setIsOpen(true)
              }}>+ Tạo bảng giá mới</button> */}
          </div>
        </div>
        <div className='mt-[20px]'>
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Mã vé</th>
                  <th className="p-3 border-b">Tuyến</th>
                  <th className="p-3 border-b">Loại xe</th>
                  {/* <th className="p-3 border-b">Giá vé cơ bản</th> */}
                  <th className="p-3 border-b">Giá vé áp dụng</th>
                  <th className="p-3 border-b">Bắt đầu</th>
                  <th className="p-3 border-b">Kết thúc</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                    <tr key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                      <td className="p-3 border-b">{ticket.id}</td>
                      <td className="p-3 border-b">{`${ticket.trip?.route.origin.address.ward.district.province.name} - ${ticket.trip?.route.destination.address.ward.district.province.name}`}</td>
                      <td className="p-3 border-b">{ticket.trip?.vehicle.type}</td>
                      {/* <td className="p-3 border-b">{(Number(ticket.trip?.route.baseFare) * 1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td> */}
                      <td className="p-3 border-b">{(Number(ticket.trip?.route.baseFare) * Number(ticket.trip?.vehicle.typeFactor) * 1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                      <td className="p-3 border-b">{formatTimestamp(Number(ticket.timeFrom))}</td>
                      <td className="p-3 border-b">{formatTimestamp(Number(ticket.timeTo))}</td>
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
        {isOpen && (isEdit ? <TicketModal isEdit={true} setIsOpen={setIsOpen} /> : <TicketModal isEdit={false} setIsOpen={setIsOpen} /> ) }
        {isDelete && <DeleteMocal setIsDelete={setIsDelete} />} 
    </div>
  )
}

export default Ticket
