import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import type { Driver } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setDrivers, updateStaff } from '../redux/driverSlice'
import DeleteModal from '../components/DeleteModal'
import DriverModal from '../components/DriverModal'

const Driver = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedDriver, setSelectedDriver] = useState<Driver>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const drivers = useSelector((state: RootState) => state.driver)

    const getDrivers = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/drivers', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setDrivers(res.data))
        })
        .catch(() => {
            console.log('Get drivers fail!')
        })
    }

    const getStaffs = async (id: number) => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/staff/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(updateStaff({ id: id, staff: res.data }))
        })
        .catch(() => {
            console.log('Get staff fail!')
        })
    }

    useEffect(() => {
        getDrivers()
    }, [])

    useEffect(() => {
        if (drivers.length >= 20) {
            drivers.forEach((d) => {
                if (!d.staff.age) {
                    getStaffs(d.staff.id)
                }
            })
        }
        // console.log(drivers)
    }, [drivers])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách tài xế</h2>
                <div className='w-full flex flex-row justify-end'>
                    <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                    <img src={downloadicon} className='size-[20px] mr-[5px]' />
                    <p>Xuất Excel</p>
                    </button>
                    <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                    onClick={() => {
                        setIsEdit(false)
                        setIsOpen(true)
                    }}>+ Tạo tài xế mới</button>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="p-3 border-b">ID</th>
                        <th className="p-3 border-b">Giấy phép lái xe</th>
                        <th className="p-3 border-b">Kinh nghiệm (năm)</th>
                        <th className="p-3 border-b">Tên</th>
                        <th className="p-3 border-b">Tuổi</th>
                        <th className="p-3 border-b">Giới tính</th>
                        <th className="p-3 border-b">Số điện thoại</th>
                        <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((d) => {
                            if (d.id >= 1520)
                            return (
                            <tr key={d.id} className="cursor-pointer hover:bg-gray-50">
                                <td className="p-3 border-b">{d.id}</td>
                                <td className="p-3 border-b">{d.licenseClass}</td>
                                <td className="p-3 border-b">{d.yearsExperience}</td>
                                <td className="p-3 border-b">{d.staff.name}</td>
                                <td className="p-3 border-b">{d.staff.age}</td>
                                <td className="p-3 border-b">{`${d.staff.gender === 'MALE' ? 'Nam' : 'Nữ'}`}</td>
                                <td className="p-3 border-b">{d.staff.phoneNumber}</td>
                                <td className="p-3 border-b space-x-2">
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedDriver(d)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
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
                {isOpen && (isEdit ? <DriverModal isEdit={true} setIsOpen={setIsOpen} driver={selectedDriver} /> : <DriverModal isEdit={false} setIsOpen={setIsOpen} /> ) }
                {isDelete && <DeleteModal setIsDelete={setIsDelete} />}
            </div>
    )
}

export default Driver
