import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { add, update } from '../redux/busSlice'
import type { Bus } from '../interface/Interface'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    bus?: Bus,
}

const BusModal = ({ setIsOpen, isEdit, bus }: Props) => {
    const [type, setType] = useState<string>('STANDARD_BUS_VIP')
    const [plateNumber, setPlateNumber] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const handleCreate = async () => {
        const now = new Date().toISOString()

        const res = await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/seat-maps', 
            { 
                "name": "seat-map-success", 
                "createdAt": now,
                "updatedAt": now,
                "isDeleted": true,
                "deletedAt": "2025-10-07T17:25:14.216Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMapImg": { "id": 1,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-07T17:25:14.216Z",
                    "updatedAt": "2025-10-07T17:25:14.216Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-07T17:25:14.216Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" } },
                { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                } 
                },
             )
        const seatmapid = res.data.id

        console.log(type, plateNumber, brand, description)
        await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles', 
        {
            "type": type,
            "typeFactor": 0,
            "plateNumber": plateNumber,
            "brand": brand,
            "description": description,
            "status": "ACTIVE",
            "createdAt": "2025-10-08T06:57:47.531Z",
            "updatedAt": "2025-10-08T06:57:47.531Z",
            "isDeleted": true,
            "deletedAt": "2025-10-08T06:57:47.531Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "seatMap": {
                "id": 1,
                "name": "string",
                "createdAt": "2025-10-08T06:57:47.531Z",
                "updatedAt": "2025-10-08T06:57:47.531Z",
                "isDeleted": true,
                "deletedAt": "2025-10-08T06:57:47.531Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMapImg": {
                    "id": 0,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-08T06:57:47.532Z",
                    "updatedAt": "2025-10-08T06:57:47.532Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-08T06:57:47.532Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            },
            "vehicleImg": {
                "id": 1,
                "bucket": "string",
                "objectKey": "string",
                "contentType": "string",
                "size": 0,
                "createdAt": "2025-10-08T06:57:47.532Z",
                "updatedAt": "2025-10-08T06:57:47.532Z",
                "isDeleted": true,
                "deletedAt": "2025-10-08T06:57:47.532Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // dispatch(add(res.data))
            console.log(res.data)
            dispatch(add(res.data))
            alert('Create success')
        })
        .catch((error) => {
            alert('Error when creating!')
            console.log(error)
        })
    }

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const res = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${bus?.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            }
        )
        console.log(res.data.seatMap.id)
        const seatmapid = res.data.seatMap.id

        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${bus?.id}`, 
            {
                "id": bus?.id,
                "type": type,
                "typeFactor": 0,
                "plateNumber": plateNumber,
                "brand": brand,
                "description": description,
                "status": "ACTIVE",
                "createdAt": "2025-10-08T07:59:05.392Z",
                "updatedAt": "2025-10-08T07:59:05.392Z",
                "isDeleted": true,
                "deletedAt": "2025-10-08T07:59:05.392Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMap": {
                    "id": seatmapid,
                    "name": "string",
                    "createdAt": "2025-10-08T07:59:05.392Z",
                    "updatedAt": "2025-10-08T07:59:05.392Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-08T07:59:05.392Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "seatMapImg": {
                    "id": 0,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-08T07:59:05.392Z",
                    "updatedAt": "2025-10-08T07:59:05.392Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-08T07:59:05.392Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }
                },
                "vehicleImg": {
                    "id": 1,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-08T07:59:05.392Z",
                    "updatedAt": "2025-10-08T07:59:05.392Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-08T07:59:05.392Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                } 
            }
        )
        .then((res) => {
            // dispatch(add(res.data))
            console.log(res.data)
            dispatch(update(res.data))
            alert('Edit success')
        })
        .catch((error) => {
            alert('Error when editing!')
            console.log(error)
        })
    }

    useEffect(() => {
        if (bus && isEdit) {
            setType(bus.type)
            setDescription(bus.description)
            setBrand(bus.brand)
            setPlateNumber(bus.plateNumber)
        }
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin xe' : 'Tạo xe mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[30%]'>
                                    <p>Biển số</p>
                                    <input value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} type="text" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[30%]'>
                                    <p>Hãng xe</p>
                                    <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[30%]'>
                                    <p>Loại xe</p>
                                    <select defaultValue={type} onChange={(e) => setType(e.target.value)} name="" id="" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                                        <option value="STANDARD_BUS_VIP">STANDARD_BUS_VIP</option>
                                        <option value="LIMOUSINE">LIMOUSINE</option>
                                        <option value="STANDARD_BUS_NORMAL">STANDARD_BUS_NORMAL</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full justify-between my-[5px]'>
                                <p>Mô tả</p>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" className='w-full' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                        onClick={(e) => {
                            if (isEdit === false) {
                                // createSeatmap()
                                handleCreate()
                            }
                            else if (isEdit === true) {
                                handleEdit(e)
                            }
                            setIsOpen(false)
                        }}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BusModal
