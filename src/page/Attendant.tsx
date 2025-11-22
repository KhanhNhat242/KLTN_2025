import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import type { Attendant } from '../interface/Interface'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import axios from 'axios'
import { setAttendants, updateStaff } from '../redux/attendantSlice'
import AttendantModal from '../components/AttendantModal'
import DeleteModal from '../components/DeleteModal'

const Attendant = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedAttendant, setSelectedAttendant] = useState<Attendant>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const attendants = useSelector((state: RootState) =>state.attendant)

    const getAttendants = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/attendants', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setAttendants(res.data))
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
        getAttendants()
    }, [])

    useEffect(() => {
        attendants.forEach((a) => {
            if (!a.staff.name) {
                getStaffs(a.staff.id)
            }
        })
    }, [attendants])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <div className='w-full flex flex-row justify-between my-[10px]'>
                    <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách phụ xe</h2>
                    <div className='flex flex-row'>
                        <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                        <img src={downloadicon} className='size-[20px] mr-[5px]' />
                        <p>Xuất Excel</p>
                        </button>
                        <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                        onClick={() => {
                            setIsEdit(false)
                            setIsOpen(true)
                        }}>+ Tạo phụ xe mới</button>
                    </div>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="p-3 border-b">ID</th>
                        <th className="p-3 border-b">Tên</th>
                        <th className="p-3 border-b">Tuổi</th>
                        <th className="p-3 border-b">Giới tính</th>
                        <th className="p-3 border-b">Số điện thoại</th>
                        <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendants.map((a) => {
                            if (a.id >= 1530)
                            return (
                            <tr key={a.id} className="cursor-pointer hover:bg-gray-50">
                                <td className="p-3 border-b">{a.id}</td>
                                <td className="p-3 border-b">{a.staff.name}</td>
                                <td className="p-3 border-b">{a.staff.age}</td>
                                <td className="p-3 border-b">{`${a.staff.gender === 'MALE' ? 'Nam' : 'Nữ'}`}</td>
                                <td className="p-3 border-b">{a.staff.phoneNumber}</td>
                                <td className="p-3 border-b space-x-2">
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedAttendant(a)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedAttendant(a)
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
                {isOpen && (isEdit ? <AttendantModal isEdit={true} setIsOpen={setIsOpen} attendant={selectedAttendant} /> : <AttendantModal isEdit={false} setIsOpen={setIsOpen} /> ) }
                {isDelete && <DeleteModal setIsDelete={setIsDelete} attendant={selectedAttendant} />}
            </div>
    )
}

export default Attendant
