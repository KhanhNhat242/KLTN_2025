import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Province, Route, Station } from '../interface/Interface'
import axios from 'axios'
import type { RootState } from '../redux/store'
import { add, update } from '../redux/routeSlice'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    route?: Route,
}

const RouteModal = ({ setIsOpen, isEdit, route }: Props) => {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [currentPStart, setCurrentPStart] = useState<number>(0)
    const [currentPEnd, setCurrentPEnd] = useState<number>(0)
    const [origins, setOrigins] = useState<Station[]>([])
    const [destinations, setDestinations] = useState<Station[]>([])
    const [code, setCode] = useState<string>('')
    const [origin, setOrigin] = useState<Station>()
    const [destination, setDestination] = useState<Station>()
    const [basefare, setBasefare] = useState<number>(0)
    const [valid, setValid] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const getProvinces = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // console.log(res.data)
            setProvinces(res.data)
        })
        .catch((error) => {
            console.log('Error when get provinces!')
            console.log(error)
        })
    }

    const getStations = async (pCode: number) => {
        await axios(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/stations?provinceCode.equals=${pCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // console.log(res.data)
            if (pCode === currentPStart) {
                setOrigins(res.data)
            }
            else if (pCode === currentPEnd) {
                setDestinations(res.data)
            }
        })
        .catch((error) => {
            console.log('Error when get station!')
            console.log(error)
        })
    }

    const handleCreate = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const now = new Date().toISOString()
        console.log(code, origin, destination)
        
        if (code === '') {
            setIsOpen(true)
            setValid(1)
        }
        else if (isNaN(basefare) || basefare === 0) {
            setIsOpen(true)
            setValid(2)
        }
        else if (!origin?.id) {
            setIsOpen(true)
            setValid(3)
        }
        else if (!destination?.id) {
            setIsOpen(true)
            setValid(4)
        }
        else {
            await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes', {
                "routeCode": code,
                "distanceKm": 0,
                "baseFare": basefare,
                "createdAt": now,
                "updatedAt": now,
                "isDeleted": true,
                "deletedAt": "2025-10-18T10:26:17.325Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "origin": {
                    "id": origin?.id,
                    "name": origin?.name,
                    "phoneNumber": "string",
                    "description": origin?.description,
                    "active": origin?.active,
                    "createdAt": "2025-10-18T10:26:17.325Z",
                    "updatedAt": "2025-10-18T10:26:17.325Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-18T10:26:17.325Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "address": {
                        "id": origin?.address.id,
                        "streetAddress": "string",
                        "latitude": 0,
                        "longitude": 0,
                        "createdAt": "2025-10-18T10:26:17.325Z",
                        "updatedAt": "2025-10-18T10:26:17.325Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-18T10:26:17.325Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "ward": {
                            "id": 0,
                            "wardCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "district": {
                            "id": 0,
                            "districtCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "province": {
                                "id": 0,
                                "provinceCode": "string",
                                "name": "string",
                                "nameEn": "string",
                                "fullName": "string",
                                "fullNameEn": "string",
                                "codeName": "string",
                                "administrativeUnitId": 0,
                                "administrativeRegionId": 0,
                                "createdAt": "2025-10-18T10:26:17.325Z",
                                "updatedAt": "2025-10-18T10:26:17.325Z",
                                "isDeleted": true,
                                "deletedAt": "2025-10-18T10:26:17.325Z",
                                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                            }
                        }
                    },
                    "stationImg": {
                        "id": 0,
                        "bucket": "string",
                        "objectKey": "string",
                        "contentType": "string",
                        "size": 0,
                        "createdAt": "2025-10-18T10:26:17.325Z",
                        "updatedAt": "2025-10-18T10:26:17.325Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-18T10:26:17.325Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }
                },
                "destination": {
                    "id": destination?.id,
                    "name": destination?.name,
                    "phoneNumber": "string",
                    "description": destination?.description,
                    "active": destination?.active,
                    "createdAt": "2025-10-18T10:26:17.325Z",
                    "updatedAt": "2025-10-18T10:26:17.325Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-18T10:26:17.325Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "address": {
                        "id": destination?.address.id,
                        "streetAddress": "string",
                        "latitude": 0,
                        "longitude": 0,
                        "createdAt": "2025-10-18T10:26:17.325Z",
                        "updatedAt": "2025-10-18T10:26:17.325Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-18T10:26:17.325Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "ward": {
                            "id": 0,
                            "wardCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "district": {
                            "id": 0,
                            "districtCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "province": {
                                "id": 0,
                                "provinceCode": "string",
                                "name": "string",
                                "nameEn": "string",
                                "fullName": "string",
                                "fullNameEn": "string",
                                "codeName": "string",
                                "administrativeUnitId": 0,
                                "administrativeRegionId": 0,
                                "createdAt": "2025-10-18T10:26:17.325Z",
                                "updatedAt": "2025-10-18T10:26:17.325Z",
                                "isDeleted": true,
                                "deletedAt": "2025-10-18T10:26:17.325Z",
                                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                            }
                        }
                    },
                    "stationImg": {
                    "id": 0,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-18T10:26:17.325Z",
                    "updatedAt": "2025-10-18T10:26:17.325Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-18T10:26:17.325Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }
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
            setIsOpen(false)
        }
    }

    const handleEdit = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const now = new Date().toISOString()

        if (code === '') {
            setIsOpen(true)
            setValid(1)
        }
        else if (isNaN(basefare) || basefare === 0) {
            setIsOpen(true)
            setValid(2)
        }
        else if (!origin?.id) {
            setIsOpen(true)
            setValid(3)
        }
        else if (!destination?.id) {
            setIsOpen(true)
            setValid(4)
        }
        else {
            await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes/${route?.id}`, {
                "id": route?.id,
                "routeCode": code,
                "distanceKm": 0,
                "baseFare": basefare,
                "createdAt": now,
                "updatedAt": now,
                "isDeleted": false,
                "deletedAt": "2025-10-18T10:26:17.325Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "origin": {
                    "id": origin?.id,
                    "name": origin?.name,
                    "phoneNumber": "string",
                    "description": origin?.description,
                    "active": origin?.active,
                    "createdAt": "2025-10-18T10:26:17.325Z",
                    "updatedAt": "2025-10-18T10:26:17.325Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-18T10:26:17.325Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "address": {
                        "id": origin?.address.id,
                        "streetAddress": "string",
                        "latitude": 0,
                        "longitude": 0,
                        "createdAt": "2025-10-18T10:26:17.325Z",
                        "updatedAt": "2025-10-18T10:26:17.325Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-18T10:26:17.325Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "ward": {
                            "id": 0,
                            "wardCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "district": {
                            "id": 0,
                            "districtCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "province": {
                                "id": 0,
                                "provinceCode": "string",
                                "name": "string",
                                "nameEn": "string",
                                "fullName": "string",
                                "fullNameEn": "string",
                                "codeName": "string",
                                "administrativeUnitId": 0,
                                "administrativeRegionId": 0,
                                "createdAt": "2025-10-18T10:26:17.325Z",
                                "updatedAt": "2025-10-18T10:26:17.325Z",
                                "isDeleted": true,
                                "deletedAt": "2025-10-18T10:26:17.325Z",
                                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                            }
                        }
                    },
                    "stationImg": {
                        "id": 0,
                        "bucket": "string",
                        "objectKey": "string",
                        "contentType": "string",
                        "size": 0,
                        "createdAt": "2025-10-18T10:26:17.325Z",
                        "updatedAt": "2025-10-18T10:26:17.325Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-18T10:26:17.325Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }
                },
                "destination": {
                    "id": destination?.id,
                    "name": destination?.name,
                    "phoneNumber": "string",
                    "description": destination?.description,
                    "active": destination?.active,
                    "createdAt": "2025-10-18T10:26:17.325Z",
                    "updatedAt": "2025-10-18T10:26:17.325Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-18T10:26:17.325Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "address": {
                        "id": destination?.address.id,
                        "streetAddress": "string",
                        "latitude": 0,
                        "longitude": 0,
                        "createdAt": "2025-10-18T10:26:17.325Z",
                        "updatedAt": "2025-10-18T10:26:17.325Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-18T10:26:17.325Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "ward": {
                            "id": 0,
                            "wardCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "district": {
                            "id": 0,
                            "districtCode": "string",
                            "name": "string",
                            "nameEn": "string",
                            "fullName": "string",
                            "fullNameEn": "string",
                            "codeName": "string",
                            "administrativeUnitId": 0,
                            "createdAt": "2025-10-18T10:26:17.325Z",
                            "updatedAt": "2025-10-18T10:26:17.325Z",
                            "isDeleted": true,
                            "deletedAt": "2025-10-18T10:26:17.325Z",
                            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "province": {
                                "id": 0,
                                "provinceCode": "string",
                                "name": "string",
                                "nameEn": "string",
                                "fullName": "string",
                                "fullNameEn": "string",
                                "codeName": "string",
                                "administrativeUnitId": 0,
                                "administrativeRegionId": 0,
                                "createdAt": "2025-10-18T10:26:17.325Z",
                                "updatedAt": "2025-10-18T10:26:17.325Z",
                                "isDeleted": true,
                                "deletedAt": "2025-10-18T10:26:17.325Z",
                                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                            }
                        }
                    },
                    "stationImg": {
                    "id": 0,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-18T10:26:17.325Z",
                    "updatedAt": "2025-10-18T10:26:17.325Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-18T10:26:17.325Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }
                }
            }, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
            })
            .then((res) => {
                // console.log(res.data)
                dispatch(update(res.data))
                alert('Update success')
            })
            .catch((error) => {
                // alert('Error when get provinces!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    useEffect(() => {
        getProvinces()
        if (isEdit && route) {
            setCode(route?.routeCode)
            setBasefare(route.baseFare)
            setOrigin(route.origin)
            setDestination(route.destination)
        }
    }, [])

    useEffect(() => {
        getStations(currentPStart)
    }, [currentPStart])

    useEffect(() => {
        getStations(currentPEnd)
    }, [currentPEnd])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin tuyến' : 'Tạo tuyến mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>CODE</p>
                                    <input value={code} onChange={(e) => setCode(e.target.value)} type="text" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Giá vé cơ bản (VND)</p>
                                    <input value={basefare} onChange={(e) => setBasefare(e.target.valueAsNumber)} type="number" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                            </div>  
                            { valid === 1 && <p className='text-[red]'>*CODE không hợp lệ</p> }
                            { valid === 2 && <p className='text-[red]'>*Giá vé không hợp lệ</p> }
                            <p className='mt-[10px]'>Điểm đón</p>
                            <div className='w-full flex flex-row justify-between'>
                                <select className='w-[48%] ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                    onChange={(e) => setCurrentPStart(Number(e.target.value))}>
                                    <option value="">{isEdit ? origin?.address.ward.district.province.name : 'Chọn tỉnh'}</option>
                                    { 
                                        provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => {
                                            if (province.id >= 1500)
                                            return <option key={province.id} value={province.provinceCode}>{province.name}</option>
                                        })
                                    } 
                                </select>
                                <select className='w-[48%] ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                    onChange={(e) => {
                                        const selected = origins.find(o => o.id === Number(e.target.value))
                                        if (selected) setOrigin(selected)
                                    }}>
                                    <option value="">{isEdit ? origin?.name : 'Chọn trạm'}</option>
                                    {
                                        origins.map((origin) => (
                                            <option key={origin.id} value={origin.id}>{origin.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {valid === 3 && <p className='text-[red]'>*Trạm không hợp lệ</p> }
                            <p className='mt-[10px]'>Điểm trả</p>
                            <div className='w-full flex flex-row justify-between'>
                                <select className='w-[48%] ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                    onChange={(e) => setCurrentPEnd(Number(e.target.value))}>
                                    <option value="">{isEdit ? destination?.address.ward.district.province.name : 'Chọn tỉnh'}</option>
                                    { 
                                        provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => {
                                            if (province.id >= 1500)
                                            return <option key={province.id} value={province.provinceCode}>{province.name}</option>
                                        })
                                    } 
                                </select>
                                <select className='w-[48%] ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                    onChange={(e) => {
                                        const selected = destinations.find(o => o.id === Number(e.target.value))
                                        if (selected) setDestination(selected)
                                    }}>
                                    <option value="">{isEdit ? origin?.name : 'Chọn trạm'}</option>
                                    {
                                        destinations.map((destination) => (
                                            <option key={destination.id} value={destination.id}>{destination.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {valid === 4 && <p className='text-[red]'>*Trạm không hợp lệ</p> }
                        </div>
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                        onClick={() => {
                            if (!isEdit) {
                                handleCreate(setIsOpen)
                            }
                            else if (isEdit) {
                                handleEdit(setIsOpen)
                            }
                            // setIsOpen(false)
                        }}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RouteModal
