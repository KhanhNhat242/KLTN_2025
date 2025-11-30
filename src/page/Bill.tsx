import React, { useEffect } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setBills, updateTrip } from '../redux/billSlice'
import { useNavigate } from 'react-router-dom'
import type { Bill } from '../interface/Interface'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'

const Bill = () => {

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const bills = useSelector((state: RootState) => state.bill)
    const navigate = useNavigate()

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
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings?page=0&size=10&sort=bookedAt%2Cdesc', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            console.log(res.data)
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
            // console.log(res.data)
            // console.log(res.data.seatLockDTOs)
            // console.log(res.data)
            dispatch(updateTrip({ id: id, trip: res.data.tripDTO}))
        })
        .catch(() => {
            console.log('Get trip fail!')
        })
    }

    const handleExportExcel = async (data: Bill[], fileName: string) => {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Trip ID", key: "tripId", width: 10 },
            { header: "Booking Code", key: "bookingCode", width: 20 },
            { header: "Tuyến", key: "route", width: 30 },
            { header: "Số lượng ghế", key: "quantity", width: 15 },
            { header: "Tổng tiền", key: "totalAmount", width: 15 },
            { header: "Thời gian đặt", key: "bookedAt", width: 25 },
            { header: "Thời hạn thanh toán", key: "expiresAt", width: 25 },
            { header: "Status", key: "status", width: 15 },
        ];

        data.forEach(b => {
            worksheet.addRow({
                id: b.id,
                tripId: b.tripId,
                bookingCode: b.bookingCode,
                route: `${b.trip?.route.origin.address.ward.district.province.name} - ${b.trip?.route.destination.address.ward.district.province.name}`,
                quantity: b.quantity,
                totalAmount: b.totalAmount,
                bookedAt: formatTimestamp(Number(b.bookedAt)),
                expiresAt: formatTimestamp(Number(b.expiresAt)),
                status: b.status
            });
        });

        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, fileName + '.xlsx');
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
                <div className='w-full flex flex-row justify-between items-center mt-[10px]'>
                    <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý hóa đơn</h2>
                    {/* <FilterBill /> */}
                    <button className='h-[30%] p-[10px] flex flex-row items-center mr-[10px] mb-[20px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                        onClick={() => handleExportExcel(bills, 'test')}
                    >
                        <img src={downloadicon} className='size-[20px] mr-[5px]' />
                        <p>Xuất Excel</p>
                    </button>
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
                                <tr key={b.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate('/bus-detail', { state: { busid: Number(b.trip?.vehicle.id), tripid: b.tripId } })}>
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
