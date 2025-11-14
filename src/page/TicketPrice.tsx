import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setTrips, updateVehicle } from '../redux/tripSlice'
import type { Bus, Trip } from '../interface/Interface'
import SearchTrip from '../components/SearchTrip'
import TicketPriceModal from '../components/TicketPriceModal'
import DeleteModal from '../components/DeleteModal'

const TicketPrice = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [vehicleArr, setVehicleArr] = useState<Bus[]>([])
    const [selectedTrip, setSelectedTrip] = useState<Trip>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const trips = useSelector((state: RootState) => state.trips)
    const dispatch = useDispatch()

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
                'size': '30',
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

    // const getVehicle = async (id: number) => {
    //     // console.log(id)
    //     if (!isNaN(id)) {
    //     await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${id}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'accept': '*/*',
    //             'Content-Type': 'application/json',
    //             'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
    //         },
    //     })
    //     .then((res) => {
    //         // console.log(res.data)
    //         if (res.data) {
    //             setVehicleArr((prev) => [...prev, res.data])
    //         }
    //     })
    //     .catch(() => {
    //         console.log('Get vehicle fail!')
    //     })
    //     }
    // }

    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {
    //     if (trips) {
    //     trips.forEach((t) => {
    //         getVehicle(Number(t.vehicle.id))
    //     })
    //     }
    //     console.log(trips)
    // }, [trips])

    // useEffect(() => {
    //     // console.log(vehicleArr)
    //     vehicleArr.forEach((v) => {
    //         dispatch(updateVehicle({ id: Number(v.id), vehicle: v }))
    //     })
    // }, [vehicleArr])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý bảng giá</h2>
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
                        }}>+ Tạo bảng giá mới</button>
                    </div>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="p-3 border-b">Tuyến</th>
                        <th className="p-3 border-b">Loại xe</th>
                        <th className="p-3 border-b">Thời điểm</th>
                        <th className="p-3 border-b">Giá vé áp dụng</th>
                        <th className="p-3 border-b">Bắt đầu</th>
                        <th className="p-3 border-b">Kết thúc</th>
                        <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((t) => {
                            if (t.id && t.id >= 1500)
                            return (
                            <tr key={t.id} className="cursor-pointer hover:bg-gray-50">
                                <td className="p-3 border-b">{`${t.route.origin.description.replace(/^Station in /, '')} - ${t.route.destination.description.replace(/^Station in /, '')}`}</td>
                                <td className="p-3 border-b">{t.vehicle.type}</td>
                                <td className="p-3 border-b">{t.occasionFactor === 1 ? 'Ngày thường' : 'Dịp lễ tết'}</td>
                                <td className="p-3 border-b">{(Number(t.route.baseFare) * Number(t.vehicle.typeFactor) * 1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                <td className="p-3 border-b">{formatTimestamp(Number(t.departureTime))}</td>
                                <td className="p-3 border-b">{formatTimestamp(Number(t.arrivalTime))}</td>
                                <td className="p-3 border-b space-x-2">
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedTrip(t)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedTrip(t)
                                            setIsDelete(true)
                                        }
                                        }>Xóa</button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                    </table>
                </div>
                </div>
                {isOpen && (isEdit ? <TicketPriceModal isEdit={true} setIsOpen={setIsOpen} trip={selectedTrip} /> : <TicketPriceModal isEdit={false} setIsOpen={setIsOpen} /> ) }
                {isDelete && <DeleteModal setIsDelete={setIsDelete} trip={selectedTrip} />} 
            </div>
    )
}

export default TicketPrice
