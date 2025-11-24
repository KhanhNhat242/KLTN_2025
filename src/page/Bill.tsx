import React, { useEffect } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import Search from '../components/Search'
import Filter from '../components/Filter'
import downloadicon from '../assets/downloadicon.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setBills, updateTrip } from '../redux/billSlice'

const Bill = () => {

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const bills = useSelector((state: RootState) => state.bill)

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
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings?page=0&size=50', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setBills(res.data))
        })
        .catch(() => {
            console.log('Get payment-transactions fail!')
        })
    }

    const getTrip = async (id: number) => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${id}/detail`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data.tripDTO)
            // console.log(res.data.seatLockDTOs)
            dispatch(updateTrip({ id: id, trip: res.data.tripDTO}))
        })
        .catch(() => {
            console.log('Get trip fail!')
        })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (bills) {
            bills.forEach((b) => {
                if (!b.trip?.route.id) {
                    getTrip(b.tripId)
                }
            })
        }
    }, [bills])

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
                </div>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b">ID</th>
                            <th className="p-3 border-b">Trip ID</th>
                            <th className="p-3 border-b">Booking CODE</th>
                            <th className="p-3 border-b">Tuyến</th> 
                            <th className="p-3 border-b">Số lượng ghế</th>
                            <th className="p-3 border-b">Tổng tiền</th>
                            <th className="p-3 border-b">Thời gian đặt ghế</th>
                            <th className="p-3 border-b">Thời hạn thanh toán</th> 
                            <th className="p-3 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((b) => {
                            if (b.id > 1500)
                            return (
                                <tr key={b.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{b.id}</td>
                                <td className="p-3 border-b">{b.tripId}</td>
                                <td className="p-3 border-b">{b.bookingCode}</td>
                                <td className="p-3 border-b">{`${b.trip?.route.origin.address.ward.district.province.name} - ${b.trip?.route.destination.address.ward.district.province.name}`}</td>
                                <td className="p-3 border-b">{b.quantity}</td>
                                <td className="p-3 border-b">{(1000*b.totalAmount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                <td className="p-3 border-b">{formatTimestamp(Number(b.bookedAt))}</td>
                                <td className="p-3 border-b">{formatTimestamp(Number(b.expiresAt))}</td>
                                <td className="p-3 border-b">{b.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
    )
}

export default Bill
