import React, { useEffect, useState } from 'react'
import type { District, Province, Station, Ward } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { add, update } from '../redux/stationSlice'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    station?: Station,
}

const StationModal = ({ setIsOpen, isEdit, station }: Props) => {
    const [name, setName] = useState<string>('')
    const [isActive, setIsActive] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [provinces, setProvinces] = useState<Province[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [province, setProvince] = useState<string>('')
    const [district, setDistrict] = useState<string>('')
    const [ward, setWard] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [currentPID, setCurrentPID] = useState<number>(0)
    const [currentDID, setCurrentDID] = useState<number>(0)
    const [currentWID, setCurrentWID] = useState<number>(0)
    const [valid, setValid] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const nameRegex = /^[A-Za-z]+$/

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
            alert('Error when get provinces!')
            console.log(error)
        })
    }

    const getDistricts = async () => {
        // console.log(currentPID)
        if (currentPID !== 0) {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/districts?provinceId.equals=${currentPID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            }
               )
            .then((res) => {
                // console.log(res.data)
                setDistricts(res.data)
            })
            .catch((error) => {
                alert('Error when get districts!')
                console.log(error)
            })
        }
    }

    const getWards = async () => {
        if (currentDID !== 0) {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/wards?districtId.equals=${currentDID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            })
            .then((res) => {
                // console.log(res.data)
                setWards(res.data)
            })
            .catch((error) => {
                alert('Error when get wards!')
                console.log(error)
            })
        }
    }

    const getAddress = async () => {
        const res = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/addresses/${station?.address.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            } 
        })
        // console.log('wardid', res.data.ward.id)
        
        const wardID = res.data.ward.id
        const resWard = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/wards/${wardID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            } 
        })
        // console.log('wardname', resWard.data.name)
        
        const districtID = resWard.data.district.id
        const resDistrict = await axios(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/districts/${districtID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            } 
        })
        // console.log('districtname', resDistrict.data.name)

        const provinceID = resDistrict.data.province.id
        const resProvince = await axios(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces/${provinceID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            } 
        })
        // console.log('provincename', resProvince.data.name)

        setWard(resWard.data.name)
        setDistrict(resDistrict.data.name)
        setProvince(resProvince.data.name)
    }

    const createAddress = async () => {
        const now = new Date().toISOString()
        
        const cp = provinces.find((p) => p.id === currentPID)
        const cd = districts.find((d) => d.id === currentDID)
        const cw = wards.find((w) => w.id === currentWID)
        console.log(cp, cd, cw)

        const res = await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/addresses', {
            "streetAddress": `${street} ${cw?.name} ${cd?.name} ${cp?.name}`,
            "latitude": 0,
            "longitude": 0,
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": "2025-10-15T09:26:59.887Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "ward": {
                "id": cw?.id,
                "wardCode": cw?.wardCode,
                "name": cw?.name,
                "nameEn": "string",
                "fullName": "string",
                "fullNameEn": "string",
                "codeName": "string",
                "administrativeUnitId": 0,
                "createdAt": "2025-10-15T09:26:59.887Z",
                "updatedAt": "2025-10-15T09:26:59.887Z",
                "isDeleted": true,
                "deletedAt": "2025-10-15T09:26:59.887Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "district": {
                    "id": cd?.id,
                    "districtCode": cd?.districtCode,
                    "name": cd?.name,
                    "nameEn": "string",
                    "fullName": "string",
                    "fullNameEn": "string",
                    "codeName": "string",
                    "administrativeUnitId": 0,
                    "createdAt": "2025-10-15T09:26:59.887Z",
                    "updatedAt": "2025-10-15T09:26:59.887Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-15T09:26:59.887Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "province": {
                        "id": cp?.id,
                        "provinceCode": cp?.provinceCode,
                        "name": cp?.name,
                        "nameEn": "string",
                        "fullName": "string",
                        "fullNameEn": "string",
                        "codeName": "string",
                        "administrativeUnitId": 0,
                        "administrativeRegionId": 0,
                        "createdAt": "2025-10-15T09:26:59.887Z",
                        "updatedAt": "2025-10-15T09:26:59.887Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-15T09:26:59.887Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        return res.data
    }

    const handleCreate = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const now = new Date().toISOString()

        let active = true
        if (isActive === 'NOT_ACTIVE') {
            active = false
        }
        else if (isActive === 'ACTIVE') {
            active = true
        }

        console.log(name, active, description, street)

        
        if (!nameRegex.test(name)) {
            setIsOpen(true)
            setValid(1)
        }
        else if (!nameRegex.test(description)) {
            setIsOpen(true)
            setValid(2)
        }
        else if (street === '' || currentWID === 0) {
            setIsOpen(true)
            setValid(3)
        }
        else {
            const res = await createAddress()
            console.log(res)
            await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/stations', {
                "name": name,
                "phoneNumber": "0123456666",
                "description": description,
                "active": active,
                "createdAt": now,
                "updatedAt": now,
                "isDeleted": true,
                "deletedAt": "2025-10-15T09:21:57.774Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": res.id,
                    "streetAddress": res.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-11-11T16:32:20.101Z",
                    "updatedAt": "2025-11-11T16:32:20.101Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-11T16:32:20.101Z",
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
                    "createdAt": "2025-11-11T16:32:20.101Z",
                    "updatedAt": "2025-11-11T16:32:20.101Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-11T16:32:20.101Z",
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
                        "createdAt": "2025-11-11T16:32:20.101Z",
                        "updatedAt": "2025-11-11T16:32:20.101Z",
                        "isDeleted": true,
                        "deletedAt": "2025-11-11T16:32:20.101Z",
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
                        "createdAt": "2025-11-11T16:32:20.101Z",
                        "updatedAt": "2025-11-11T16:32:20.101Z",
                        "isDeleted": true,
                        "deletedAt": "2025-11-11T16:32:20.101Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                        }
                    }
                    }
                },
                "stationImg": {
                    "id": 1,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-15T09:21:57.774Z",
                    "updatedAt": "2025-10-15T09:21:57.774Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-15T09:21:57.774Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            })
            .then((res) => {
                console.log(res.data)
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

        let active = true
        if (isActive === 'NOT_ACTIVE') {
            active = false
        }
        else if (isActive === 'ACTIVE') {
            active = true
        }

        if (name === '') {
            setIsOpen(true)
            setValid(1)
        }
        else if (description === '') {
            setIsOpen(true)
            setValid(2)
        }
        else if (street === '') {
            setIsOpen(true)
            setValid(3)
        }
        else {
            const cp = provinces.find((p) => p.id === currentPID)
            
            console.log(province, cp)
            if (cp === undefined) {
                await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/stations/${station?.id}`, {
                    "id": station?.id,
                    "name": name,
                    "phoneNumber": "0123456666",
                    "description": description,
                    "active": active,
                    "createdAt": now,
                    "updatedAt": now,
                    "isDeleted": false,
                    "deletedAt": "2025-10-15T09:21:57.774Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "address": {
                        "id": station?.address.id,
                    },
                    "stationImg": {
                        "id": 1,
                        "bucket": "string",
                        "objectKey": "string",
                        "contentType": "string",
                        "size": 0,
                        "createdAt": "2025-10-15T09:21:57.774Z",
                        "updatedAt": "2025-10-15T09:21:57.774Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-15T09:21:57.774Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    }, 
                }, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }})
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
        }
        // else if (cp !== undefined) {
        //     const res = await createAddress()
        //     console.log(res)
        //     dispatch(update(res))
        //     alert('Update success')
        // }
    }

    useEffect(() => {
        getProvinces()
        console.log(station)
        if (station && isEdit) {
            setName(station.name)
            setDescription(station.description)

            if (station.streetAddress) {
                setStreet(station.streetAddress)
            }

            if (station.active) {
                setIsActive('ACTIVE')
            }
            else {
                setIsActive('NOT_ACTIVE')
            }

            getAddress()
        }
    }, [])

    useEffect(() => {
        getDistricts()
    }, [currentPID])

    useEffect(() => {
        getWards()
    }, [currentDID])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin trạm' : 'Tạo trạm mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between'>
                                <div className='w-[48%]'>
                                    <p>Tên trạm</p>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text"  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                                <div className='w-[48%]'>
                                    <p>Trạng thái</p>
                                    <select defaultValue={isActive} onChange={(e) => setIsActive(e.target.value)} name="" id="" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                                        <option value='ACTIVE' defaultChecked>Đang hoạt động</option>
                                        <option value='NOT_ACTIVE'>Ngưng hoạt động</option>
                                    </select>
                                </div>
                            </div>
                            { valid === 1 && <p className='text-[red]'>*Tên trạm không hợp lệ</p> }
                            <div className='w-full justify-between my-[5px]'>
                                <p>Mô tả</p>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" className='w-full p-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}></textarea>
                            </div>
                            { valid === 2 && <p className='text-[red]'>*Mô tả không hợp lệ</p> }
                            <div className='w-full justify-between my-[5px]'>
                                <p>Địa chỉ:</p>
                                <div className='w-[48%] flex flex-row items-center my-[5px]'>
                                    <p className='mr-[7px]'>Tỉnh</p>
                                    <select name="" id="" className='w-full ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => setCurrentPID(Number(e.target.value))}>
                                        <option value="">{isEdit ? province : 'Tất cả'}</option>
                                        { 
                                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                                                <option key={province.id} value={province.id}>{province.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='w-[48%] flex flex-row items-center'>
                                        <p>Quận</p>
                                        <select name="" id="" className='w-full ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                            onChange={(e) => setCurrentDID(Number(e.target.value))}
                                        >
                                            <option value="">{isEdit ? district : 'Tất cả'}</option>
                                            { 
                                                districts.sort((a, b) => a.name.localeCompare(b.name)).map((district) => (
                                                    <option key={district.id} value={district.id}>{district.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='w-[48%] flex flex-row items-center'>
                                        <p>Phường</p>
                                        <select name="" id="" className='w-full ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                            onChange={(e) => setCurrentWID(Number(e.target.value))}
                                        >
                                            <option value="">{isEdit ? ward : 'Tất cả'}</option>
                                            { 
                                                wards.sort((a, b) => a.name.localeCompare(b.name)).map((ward) => (
                                                    <option key={ward.id} value={ward.id}>{ward.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='w-full flex flex-row justify-between items-center my-[5px]'>
                                    <p className='mr-[7px]'>Số nhà, tên đường</p>
                                    <input value={street} onChange={(e) => setStreet(e.target.value)} type="text"  className='w-[68%] px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                            </div>
                            { valid === 3 && <p className='text-[red]'>*Địa chỉ không hợp lệ</p> }
                        </div>
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                        onClick={() => {
                            // setIsOpen(false)
                            if (!isEdit) {
                                handleCreate(setIsOpen)
                            }
                            else if (isEdit){
                                handleEdit(setIsOpen)
                            }
                        }}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StationModal
