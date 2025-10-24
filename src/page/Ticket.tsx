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
import { setTickets } from '../redux/ticketSlice';

const Ticket = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)

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

      return `${hours}:${minutes}:${seconds} ngày ${day}/${month}/${year}`
  }

  const getTickets = async () => {
    axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/tickets', {
      headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
        },
    })
    .then((res) => {
      console.log(res.data)
      dispatch(setTickets(res.data))
    })
    .catch(() => {
      console.log('Get data fail!')
    })
  }  

  useEffect(() => {
    getTickets()
  }, [])

  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách vé</h2>
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
            <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'
              onClick={() => {
                setIsEdit(false)
                setIsOpen(true)
              }}>+ Tạo vé mới</button>
          </div>
        </div>
        <div className='mt-[20px]'>
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Mã vé</th>
                  <th className="p-3 border-b">CODE</th>
                  <th className="p-3 border-b">Giá vé</th>
                  <th className="p-3 border-b">Bắt đầu</th>
                  <th className="p-3 border-b">Kết thúc</th>
                  <th className="p-3 border-b">Check-in</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{ticket.id}</td>
                    <td className="p-3 border-b">{ticket.ticketCode}</td>
                    <td className="p-3 border-b">{ticket.price}</td>
                    <td className="p-3 border-b">{formatTimestamp(Number(ticket.timeFrom))}</td>
                    <td className="p-3 border-b">{formatTimestamp(Number(ticket.timeTo))}</td>
                    <td className="p-3 border-b">{ticket.checkedIn === true ? 'Đã check-in' : 'Chưa check-in'}</td>
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
