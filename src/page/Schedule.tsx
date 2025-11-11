import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import axios from 'axios'
import Header from '../components/Header'
import SearchTrip from '../components/SearchTrip'
import downloadicon from '../assets/downloadicon.png'
import HeaderTop from '../components/HeaderTop'
import { setSchedules } from '../redux/scheduleSlice'
import ScheduleModal from '../components/ScheduleModal'
import DeleteModal from '../components/DeleteModal'
import type { Schedule } from '../interface/Interface'

const Schedule = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const schedules = useSelector((state: RootState) => state.schedule)

    const convertDays = (str: string) => {
        const dayMap: Record<number, string> = {
            1: "Thứ 2",
            2: "Thứ 3",
            3: "Thứ 4",
            4: "Thứ 5",
            5: "Thứ 6",
            6: "Thứ 7",
            7: "Chủ nhật",
        };

        return str
            .split(",")
            .map(s => Number(s.trim()))
            .map(n => dayMap[n])
            .filter(Boolean)
    }

    const getSchedules = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/schedules', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setSchedules(res.data))
        })
        .catch(() => {
            console.log('Get data fail!')
        })
    }

    useEffect(() => {
        getSchedules()
    }, [])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px]'>Quản lý lịch trình theo chu kỳ</h2>
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
                        <th className="p-3 border-b">ID</th>
                        <th className="p-3 border-b">Ngày bắt đầu</th>
                        <th className="p-3 border-b">Ngày kết thúc</th>
                        <th className="p-3 border-b">Chu kỳ</th>
                        <th className="p-3 border-b">Giá theo thời điểm</th>
                        <th className="p-3 border-b">Tuyến</th>
                        <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((s) => {
                        if (Number(s.id) >= 1500)
                        return (
                            // <tr key={trip.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/bus-detail', { state: { busid: trip.vehicle.id, tripdata: trip } })}>
                            <tr key={s.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{s.id}</td>
                                <td className="p-3 border-b">{`${s.startDate[2]}/${s.startDate[1]}/${s.startDate[0]}`}</td>
                                <td className="p-3 border-b">{`${s.endDate[2]}/${s.endDate[1]}/${s.endDate[0]}`}</td>
                                <td className="p-3 border-b">{convertDays(s.daysOfWeek).join(', ')}</td>
                                <td className="p-3 border-b">{s.occasionRule.occasionFactor}</td>
                                <td className="p-3 border-b">{`${s.route.origin.name} - ${s.route.destination.name}`}</td>
                                <td className="p-3 border-b space-x-2">
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedSchedule(s)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedSchedule(s)
                                            setIsDelete(true)
                                        }
                                        }>Xóa</button>
                                </td>
                            </tr>
                        )
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
            {isOpen && (isEdit ? <ScheduleModal isEdit={true} setIsOpen={setIsOpen} schedule={selectedSchedule} /> : <ScheduleModal isEdit={false} setIsOpen={setIsOpen} /> ) }
            {isDelete && <DeleteModal setIsDelete={setIsDelete} schedule={selectedSchedule} />}
        </div>
    )
}

export default Schedule
