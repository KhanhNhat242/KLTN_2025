import React, { useEffect, useState } from 'react'
import type { OccasionRule, Province, Route, Schedule } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { add, update } from '../redux/scheduleSlice'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    schedule?: Schedule,
}

const ScheduleModal = ({ setIsOpen, isEdit, schedule }: Props) => {
    const [selected, setSelected] = useState<number[]>([])
    const [provinces, setProvinces] = useState<Province[]>([])
    const [currentPStart, setCurrentPStart] = useState<number>(0)
    const [currentPEnd, setCurrentPEnd] = useState<number>(0)
    const [routes, setRoutes] = useState<Route[]>([])
    const [route, setRoute] = useState<Route>()
    // const [currentRID, setCurrentRID] = useState<number>(0)
    const [pStart, setPStart] = useState<string>('')
    const [pEnd, setPEnd] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [occasion, setOccasion] = useState<string>('normal')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [occ, setOcc] = useState<OccasionRule>()

    const selectedClass = 'bg-[#1447E6] text-white'
    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const formatDate = (dateArr: number[]): string => {
        const [year, month, day] = dateArr;

        const mm = String(month).padStart(2, "0");
        const dd = String(day).padStart(2, "0");

        return `${year}-${mm}-${dd}`;
    }

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

    const getRoutes = async () => {
        if (currentPStart !== 0 && currentPEnd !== 0) {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes?originProvinceCode.equals=${currentPStart}&destinationProvinceCode.equals=${currentPEnd}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            })
            .then((res) => {
                // console.log(res.data)
                setRoutes(res.data)
            })
            .catch((error) => {
                alert('Error when get routes!')
                console.log(error)
            })
        }
    }

    const handleCreate = async () => {
        const now = new Date().toISOString()
        const dow = selected.join(',').toString()
        console.log(code, startDate, endDate, dow, route?.id)
        console.log(occ)
        
        await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/schedules', {
            "scheduleCode": code,
            "startDate": startDate,
            "endDate": endDate,
            "daysOfWeek": dow,
            "active": false,
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": "2025-11-07T15:18:22.623Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "occasionRule": {
                "id": occ?.id,
                "occasion": 'NORMAL',
                "occasionFactor": 0,
                "createdAt": "2025-11-07T15:18:22.623Z",
                "updatedAt": "2025-11-07T15:18:22.623Z",
                "isDeleted": true,
                "deletedAt": "2025-11-07T15:18:22.623Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            },
            "route": {
                "id": route?.id,
                "routeCode": route?.routeCode,
                "distanceKm": 0,
                "baseFare": route?.baseFare,
                "createdAt": "2025-11-07T15:18:22.623Z",
                "updatedAt": "2025-11-07T15:18:22.623Z",
                "isDeleted": true,
                "deletedAt": "2025-11-07T15:18:22.623Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "origin": {
                "id": route?.origin.id,
                "name": route?.origin.name,
                "phoneNumber": "string",
                "description": route?.origin.description,
                "active": true,
                "createdAt": "2025-11-07T15:18:22.624Z",
                "updatedAt": "2025-11-07T15:18:22.624Z",
                "isDeleted": true,
                "deletedAt": "2025-11-07T15:18:22.624Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route?.origin.address.id,
                    "streetAddress": route?.origin.address.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-11-07T15:18:22.624Z",
                    "updatedAt": "2025-11-07T15:18:22.624Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-07T15:18:22.624Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "ward": {
                    "id": route?.origin.address.ward.id,
                    "wardCode": route?.origin.address.ward.wardCode,
                    "name": route?.origin.address.ward.name,
                    "nameEn": "string",
                    "fullName": "string",
                    "fullNameEn": "string",
                    "codeName": "string",
                    "administrativeUnitId": 0,
                    "createdAt": "2025-11-07T15:18:22.624Z",
                    "updatedAt": "2025-11-07T15:18:22.624Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-07T15:18:22.624Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "district": {
                        "id": route?.origin.address.ward.district.id,
                        "districtCode": route?.origin.address.ward.district.districtCode,
                        "name": route?.origin.address.ward.district.name,
                        "nameEn": "string",
                        "fullName": "string",
                        "fullNameEn": "string",
                        "codeName": "string",
                        "administrativeUnitId": 0,
                        "createdAt": "2025-11-07T15:18:22.624Z",
                        "updatedAt": "2025-11-07T15:18:22.624Z",
                        "isDeleted": true,
                        "deletedAt": "2025-11-07T15:18:22.624Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "province": {
                        "id": route?.origin.address.ward.district.province.id,
                        "provinceCode": route?.origin.address.ward.district.province.provinceCode,
                        "name": route?.origin.address.ward.district.province.name,
                        "nameEn": "string",
                        "fullName": "string",
                        "fullNameEn": "string",
                        "codeName": "string",
                        "administrativeUnitId": 0,
                        "administrativeRegionId": 0,
                        "createdAt": "2025-11-07T15:18:22.624Z",
                        "updatedAt": "2025-11-07T15:18:22.624Z",
                        "isDeleted": true,
                        "deletedAt": "2025-11-07T15:18:22.624Z",
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
                    "createdAt": "2025-11-07T15:18:22.624Z",
                    "updatedAt": "2025-11-07T15:18:22.624Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-07T15:18:22.624Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                },
                "destination": {
                "id": route?.destination.id,
                "name": route?.destination.name,
                "phoneNumber": "string",
                "description": route?.destination.description,
                "active": true,
                "createdAt": "2025-11-07T15:18:22.624Z",
                "updatedAt": "2025-11-07T15:18:22.624Z",
                "isDeleted": true,
                "deletedAt": "2025-11-07T15:18:22.624Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route?.destination.address.id,
                    "streetAddress": route?.destination.address.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-11-07T15:18:22.624Z",
                    "updatedAt": "2025-11-07T15:18:22.624Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-07T15:18:22.624Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "ward": {
                    "id": route?.destination.address.ward.id,
                    "wardCode": route?.destination.address.ward.wardCode,
                    "name": route?.destination.address.ward.name,
                    "nameEn": "string",
                    "fullName": "string",
                    "fullNameEn": "string",
                    "codeName": "string",
                    "administrativeUnitId": 0,
                    "createdAt": "2025-11-07T15:18:22.624Z",
                    "updatedAt": "2025-11-07T15:18:22.624Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-07T15:18:22.624Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "district": {
                        "id": route?.destination.address.ward.district.id,
                        "districtCode": route?.destination.address.ward.district.districtCode,
                        "name": route?.destination.address.ward.district.name,
                        "nameEn": "string",
                        "fullName": "string",
                        "fullNameEn": "string",
                        "codeName": "string",
                        "administrativeUnitId": 0,
                        "createdAt": "2025-11-07T15:18:22.624Z",
                        "updatedAt": "2025-11-07T15:18:22.624Z",
                        "isDeleted": true,
                        "deletedAt": "2025-11-07T15:18:22.624Z",
                        "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "province": {
                        "id": route?.destination.address.ward.district.province.id,
                        "provinceCode": route?.destination.address.ward.district.province.provinceCode,
                        "name": route?.destination.address.ward.district.province.name,
                        "nameEn": "string",
                        "fullName": "string",
                        "fullNameEn": "string",
                        "codeName": "string",
                        "administrativeUnitId": 0,
                        "administrativeRegionId": 0,
                        "createdAt": "2025-11-07T15:18:22.624Z",
                        "updatedAt": "2025-11-07T15:18:22.624Z",
                        "isDeleted": true,
                        "deletedAt": "2025-11-07T15:18:22.624Z",
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
                    "createdAt": "2025-11-07T15:18:22.624Z",
                    "updatedAt": "2025-11-07T15:18:22.624Z",
                    "isDeleted": true,
                    "deletedAt": "2025-11-07T15:18:22.624Z",
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
        const now = new Date().toISOString()
        const dow = selected.join(',').toString()
        // console.log(code, startDate, endDate, dow, route, schedule?.id)
        console.log(occ?.id, route?.id, schedule?.id)

        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/schedules/${schedule?.id}`, {
            "id": schedule?.id,
            "scheduleCode": code,
            "startDate": startDate,
            "endDate": endDate,
            "daysOfWeek": dow,
            "active": true,
            "createdAt": 1761868881,
            "updatedAt": now,
            "isDeleted": false,
            "deletedAt": null,
            "deletedBy": null,
            "occasionRule": {
                "id": occ?.id,
                "occasion": "NORMAL",
                "occasionFactor": 29305.67,
                "createdAt": 1761635278,
                "updatedAt": 1761649285,
                "isDeleted": false,
                "deletedAt": 1761699049,
                "deletedBy": "8735d912-1210-4d3f-a133-e00a6da79e98"
            },
            "route": {
                "id": route?.id,
                "routeCode": route?.routeCode,
                "distanceKm": null,
                "baseFare": 201.55,
                "createdAt": 1759862864,
                "updatedAt": null,
                "isDeleted": false,
                "deletedAt": null,
                "deletedBy": null,
                "origin": {
                "id": route?.origin.id,
                "name": route?.origin.name,
                "phoneNumber": "",
                "description": route?.origin.description,
                "active": true,
                "createdAt": 1759049805,
                "updatedAt": null,
                "isDeleted": false,
                "deletedAt": null,
                "deletedBy": null,
                "address": {
                    "id": route?.origin.address.id,
                    "streetAddress": null,
                    "latitude": null,
                    "longitude": null,
                    "createdAt": null,
                    "updatedAt": null,
                    "isDeleted": null,
                    "deletedAt": null,
                    "deletedBy": null,
                    "ward": null
                },
                "stationImg": null
                },
                "destination": {
                "id": route?.destination.id,
                "name": route?.destination.name,
                "phoneNumber": "",
                "description": route?.destination.description,
                "active": true,
                "createdAt": 1759049805,
                "updatedAt": null,
                "isDeleted": false,
                "deletedAt": null,
                "deletedBy": null,
                "address": {
                    "id": route?.destination.address.id,
                    "streetAddress": null,
                    "latitude": null,
                    "longitude": null,
                    "createdAt": null,
                    "updatedAt": null,
                    "isDeleted": null,
                    "deletedAt": null,
                    "deletedBy": null,
                    "ward": null
                },
                "stationImg": null
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
        getProvinces()
        console.log(schedule)
        if (isEdit && schedule) {
            setCode(schedule.scheduleCode)
            setStartDate(formatDate(schedule.startDate))
            setEndDate(formatDate(schedule.endDate))
            setPStart(schedule.route.origin.name)
            setPEnd(schedule.route.destination.name)
            setSelected(schedule.daysOfWeek.split(',').map(Number))
            setRoute(schedule.route)
            if(schedule.occasionRule.id === 1) {
                setOccasion('normal')
                setOcc({ id: 1, occasion: 'NORMAL', occasionFactor: 29305.67, isDeleted: false })
            }
            else if (schedule.occasionRule.id === 4) {
                setOccasion('peak')
                setOcc({ id: 4, occasion: 'PEAK`', occasionFactor: 19348.9, isDeleted: false })
            }
        }
    }, [])

    useEffect(() => {
        getRoutes()
    }, [currentPStart, currentPEnd])


    useEffect(() => {
        if (occasion === 'normal') {
            setOcc({ id: 1, occasion: 'NORMAL', occasionFactor: 29305.67, isDeleted: false })
        }
        else if (occasion === 'peak') {
            setOcc({ id: 4, occasion: 'PEAK`', occasionFactor: 19348.9, isDeleted: false })
        }
    }, [occasion])
    // useEffect(() => {
    //     console.log(selected)
    // }, [selected])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin lịch trình' : 'Tạo lịch trình mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>CODE</p>
                                    <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder='code' className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Thời điểm</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                                        <option value="normal" selected>Ngày thường</option>
                                        <option value="peak">Dịp cao điểm (Lễ, tết)</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>Ngày bắt đầu</p>
                                    <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Ngày kết thúc</p>
                                    <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                            </div>
                            <div className='my-[5px]'>
                                <p>Tần xuất lặp lại (tuần)</p>
                                <div className='w-full flex flex-row justify-between rounded-[10px]' style={{borderStyle: 'solid', borderWidth: 3, borderColor: '#1447E6'}}>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 1) && selectedClass}`} onClick={() => selected.find(s => s === 1) ? setSelected(selected.filter(s => s !== 1)) : setSelected(prev => [...prev, 1])}>Thứ 2</p>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 2) && selectedClass}`} onClick={() => selected.find(s => s === 2) ? setSelected(selected.filter(s => s !== 2)) : setSelected(prev => [...prev, 2])}>Thứ 3</p>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 3) && selectedClass}`} onClick={() => selected.find(s => s === 3) ? setSelected(selected.filter(s => s !== 3)) : setSelected(prev => [...prev, 3])}>Thứ 4</p>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 4) && selectedClass}`} onClick={() => selected.find(s => s === 4) ? setSelected(selected.filter(s => s !== 4)) : setSelected(prev => [...prev, 4])}>Thứ 5</p>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 5) && selectedClass}`} onClick={() => selected.find(s => s === 5) ? setSelected(selected.filter(s => s !== 5)) : setSelected(prev => [...prev, 5])}>Thứ 6</p>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 6) && selectedClass}`} onClick={() => selected.find(s => s === 6) ? setSelected(selected.filter(s => s !== 6)) : setSelected(prev => [...prev, 6])}>Thứ 7</p>
                                    <p className={`px-[0.6vw] py-[5px] cursor-pointer ${selected.find((s) => s === 7) && selectedClass}`} onClick={() => selected.find(s => s === 7) ? setSelected(selected.filter(s => s !== 7)) : setSelected(prev => [...prev, 7])}>Chủ nhật</p>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>Nơi đi</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => setCurrentPStart(Number(e.target.value))}>
                                        <option value="">Chọn tỉnh</option>
                                        { 
                                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => {
                                                if (province.id >= 1500)
                                                return <option key={province.id} value={province.provinceCode}>{province.name}</option>
                                            })
                                        } 
                                    </select>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Nơi đến</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => setCurrentPEnd(Number(e.target.value))}>
                                        <option value="">Chọn tỉnh</option>
                                        { 
                                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => {
                                                if (province.id >= 1500)
                                                return <option key={province.id} value={province.provinceCode}>{province.name}</option>
                                            })
                                        } 
                                    </select>
                                </div>
                            </div>
                            <select className='w-full my-[10px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                onChange={(e) => {
                                    const selected = routes.find(o => o.id === Number(e.target.value))
                                    if (selected) setRoute(selected)
                                    // setCurrentRID(Number(e.target.value))
                                }
                                }>
                                <option value="">{isEdit ? `Từ ${pStart} đến ${pEnd}` : 'Chọn bến xe'}</option>
                                { 
                                    routes.map((route) => (
                                        <option key={route.id} value={route.id}>Từ {route.origin.name} đến {route.destination.name}</option>
                                    ))
                                }
                            </select>
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
                            else if (isEdit) {
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

export default ScheduleModal
