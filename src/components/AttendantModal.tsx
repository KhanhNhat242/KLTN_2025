import React, { useEffect, useState } from 'react'
import type { Attendant } from '../interface/Interface'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import axios from 'axios'
import { add, update } from '../redux/attendantSlice'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    attendant?: Attendant,
}

const AttendantModal = ({ setIsOpen, isEdit, attendant }: Props) => {
    const [age, setAge] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<string>('MALE')
    const [phone, setPhone] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const createStaff = async () => {
        const now = new Date().toISOString()

        const res = await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/staff', {
            "name": name,
            "age": age,
            "gender": gender,
            "phoneNumber": phone,
            "status": "ACTIVE",
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": "2025-11-14T12:13:40.144Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })

        return res.data
    }

    const handleCreate = async () => {
        const now = new Date().toISOString()
        const ns = await createStaff()

        await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/attendants', {
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": "2025-11-14T15:52:37.141Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "staff": {
                "id": ns.id,
                "name":ns.name,
                "age": ns.age,
                "gender": ns.gender,
                "phoneNumber": ns.phoneNumber,
                "status": "ACTIVE",
                "createdAt": "2025-11-14T15:52:37.141Z",
                "updatedAt": "2025-11-14T15:52:37.141Z",
                "isDeleted": true,
                "deletedAt": "2025-11-14T15:52:37.141Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(add(res.data))
            alert('Create success')
        })
        .catch((error) => {
            alert('Error when creating!')
            console.log(error)
        })
    }

    const handleEdit = async () => {
        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/attendants/simple/${attendant?.id}`, {
            "name": name,
            "age": age,
            "gender": gender,
            "phoneNumber": phone,
            "status": "ACTIVE"
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            console.log(res.data)
            dispatch(update(res.data))
            alert('Update success')
        })
        .catch((error) => {
            alert('Error when updating!')
            console.log(error)
        })
    }

    useEffect(() => {
        if (attendant) {
            setName(attendant.staff.name)
            setAge(attendant.staff.age)
            setPhone(attendant.staff.phoneNumber)
            setGender(attendant.staff.gender)
        }
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin phụ xe' : 'Tạo phụ xe mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>Tên</p>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text"  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                                <div className='w-[48%]'>
                                    <p>Tuổi</p>
                                    <input value={age} onChange={(e) => setAge(e.target.valueAsNumber)} type="number"  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between'>
                                <div className='w-[48%]'>
                                    <p>Giới tính</p>
                                    <select className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} 
                                        onChange={(e) => setGender(e.target.value)}>
                                        <option value="MALE" selected>Nam</option>
                                        <option value="FEMALE">Nữ</option>
                                    </select>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Số điện thoại</p>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text"  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                        onClick={() => {
                        setIsOpen(false)
                            if (!isEdit) {
                                handleCreate()
                            }
                            else {
                                handleEdit()
                            }
                        }}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AttendantModal
