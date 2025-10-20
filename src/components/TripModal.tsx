import React, { useEffect, useState } from 'react'
import type { Bus, Province, Route, Trip } from '../interface/Interface'
import axios from 'axios'
import type { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { add, update } from '../redux/tripSlice'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    trip?: Trip,
}

const TripModal = ({ setIsOpen, isEdit, trip }: Props) => {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [buses, setBuses] = useState<Bus[]>([])
    const [currentPStart, setCurrentPStart] = useState<number>(0)
    const [currentPEnd, setCurrentPEnd] = useState<number>(0)
    const [routes, setRoutes] = useState<Route[]>([])
    const [currentRID, setCurrentRID] = useState<number>(0)
    const [code, setCode] = useState<string>('')
    const [sTime, setSTime] = useState<string>('')
    const [eTime, setETime] = useState<string>('')
    const [distance, setDistance] = useState<number>(0)
    const [route, setRoute] = useState<Route>()
    const [bus, setBus] = useState<Bus>()
    const [pStart, setPStart] = useState<string>('')
    const [pEnd, setPEnd] = useState<string>('')

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
            alert('Error when get provinces!')
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

    const getVehicles = async (type: string) => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles?type.in=${type}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            setBuses(res.data)
        })
        .catch((error) => {
            alert('Error when get buses!')
            console.log(error)
        })
    }

    const toDatetimeLocalString = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const pad = (n: number) => n.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const handleCreate = async () => {
        const now = new Date().toISOString()
        const st = new Date(sTime).toISOString()
        const et = new Date(eTime).toISOString()

        console.log(code, distance, currentRID, sTime, eTime, route)
        await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips', {
            "tripCode": code,
            "departureTime": st,
            "arrivalTime": et,
            "baseFare": 0,
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": "2025-10-19T07:13:00.993Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "route": {
                "id": route?.id,
                "routeCode": route?.routeCode,
                "distanceKm": distance,
                "createdAt": "2025-10-19T07:13:00.993Z",
                "updatedAt": "2025-10-19T07:13:00.993Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.993Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "origin": {
                "id": route?.origin.id,
                "name": route?.origin.name,
                "phoneNumber": "string",
                "description": route?.origin.description,
                "active": true,
                "createdAt": "2025-10-19T07:13:00.993Z",
                "updatedAt": "2025-10-19T07:13:00.993Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.993Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route?.origin.address.id,
                    "streetAddress": route?.origin.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-10-19T07:13:00.993Z",
                    "updatedAt": "2025-10-19T07:13:00.993Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.993Z",
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
                    "createdAt": "2025-10-19T07:13:00.993Z",
                    "updatedAt": "2025-10-19T07:13:00.993Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.993Z",
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
                        "createdAt": "2025-10-19T07:13:00.993Z",
                        "updatedAt": "2025-10-19T07:13:00.993Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.993Z",
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
                        "createdAt": "2025-10-19T07:13:00.994Z",
                        "updatedAt": "2025-10-19T07:13:00.994Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.994Z",
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
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                },
                "destination": {
                "id": route?.destination.id,
                "name": route?.destination.name,
                "phoneNumber": "string",
                "description": route?.destination.description,
                "active": true,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route?.destination.address.id,
                    "streetAddress": route?.destination.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
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
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
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
                        "createdAt": "2025-10-19T07:13:00.994Z",
                        "updatedAt": "2025-10-19T07:13:00.994Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.994Z",
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
                        "createdAt": "2025-10-19T07:13:00.994Z",
                        "updatedAt": "2025-10-19T07:13:00.994Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.994Z",
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
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                }
            },
            "vehicle": {
                "id": bus?.id,
                "type": bus?.type,
                "typeFactor": 0,
                "plateNumber": bus?.plateNumber,
                "brand": bus?.brand,
                "description": bus?.description,
                "status": "ACTIVE",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMap": {
                "id": 0,
                "name": "string",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMapImg": {
                    "id": 0,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                },
                "vehicleImg": {
                "id": 0,
                "bucket": "string",
                "objectKey": "string",
                "contentType": "string",
                "size": 0,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            },
            "driver": {
                "id": 1528,
                "licenseClass": "string",
                "yearsExperience": 0,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "staff": {
                "id": 0,
                "name": "string",
                "age": 0,
                "gender": "MALE",
                "phoneNumber": "string",
                "status": "ACTIVE",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            },
            "attendant": {
                "id": 1538,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "staff": {
                "id": 0,
                "name": "string",
                "age": 0,
                "gender": "MALE",
                "phoneNumber": "string",
                "status": "ACTIVE",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
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
    }

    const handleEdit = async () => {
        const now = new Date().toISOString()
        const st = new Date(sTime).toISOString()
        const et = new Date(eTime).toISOString()
        console.log(code, distance, currentRID, sTime, eTime, route)

        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${trip?.id}`, {
            "id": trip?.id,
            "tripCode": code,
            "departureTime": st,
            "arrivalTime": et,
            "baseFare": 0,
            "createdAt": "2025-10-19T07:13:00.993Z",
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": "2025-10-19T07:13:00.993Z",
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "route": {
                "id": route?.id,
                "routeCode": route?.routeCode,
                "distanceKm": distance,
                "createdAt": "2025-10-19T07:13:00.993Z",
                "updatedAt": "2025-10-19T07:13:00.993Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.993Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "origin": {
                "id": route?.origin.id,
                "name": route?.origin.name,
                "phoneNumber": "string",
                "description": route?.origin.description,
                "active": true,
                "createdAt": "2025-10-19T07:13:00.993Z",
                "updatedAt": "2025-10-19T07:13:00.993Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.993Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route?.origin.address.id,
                    "streetAddress": route?.origin.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-10-19T07:13:00.993Z",
                    "updatedAt": "2025-10-19T07:13:00.993Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.993Z",
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
                    "createdAt": "2025-10-19T07:13:00.993Z",
                    "updatedAt": "2025-10-19T07:13:00.993Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.993Z",
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
                        "createdAt": "2025-10-19T07:13:00.993Z",
                        "updatedAt": "2025-10-19T07:13:00.993Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.993Z",
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
                        "createdAt": "2025-10-19T07:13:00.994Z",
                        "updatedAt": "2025-10-19T07:13:00.994Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.994Z",
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
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                },
                "destination": {
                "id": route?.destination.id,
                "name": route?.destination.name,
                "phoneNumber": "string",
                "description": route?.destination.description,
                "active": true,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route?.destination.address.id,
                    "streetAddress": route?.destination.streetAddress,
                    "latitude": 0,
                    "longitude": 0,
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
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
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
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
                        "createdAt": "2025-10-19T07:13:00.994Z",
                        "updatedAt": "2025-10-19T07:13:00.994Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.994Z",
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
                        "createdAt": "2025-10-19T07:13:00.994Z",
                        "updatedAt": "2025-10-19T07:13:00.994Z",
                        "isDeleted": true,
                        "deletedAt": "2025-10-19T07:13:00.994Z",
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
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                }
            },
            "vehicle": {
                "id": bus?.id,
                "type": bus?.type,
                "typeFactor": 0,
                "plateNumber": bus?.plateNumber,
                "brand": bus?.brand,
                "description": bus?.description,
                "status": "ACTIVE",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMap": {
                "id": 0,
                "name": "string",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "seatMapImg": {
                    "id": 0,
                    "bucket": "string",
                    "objectKey": "string",
                    "contentType": "string",
                    "size": 0,
                    "createdAt": "2025-10-19T07:13:00.994Z",
                    "updatedAt": "2025-10-19T07:13:00.994Z",
                    "isDeleted": true,
                    "deletedAt": "2025-10-19T07:13:00.994Z",
                    "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
                },
                "vehicleImg": {
                "id": 0,
                "bucket": "string",
                "objectKey": "string",
                "contentType": "string",
                "size": 0,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            },
            "driver": {
                "id": 1528,
                "licenseClass": "string",
                "yearsExperience": 0,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "staff": {
                "id": 0,
                "name": "string",
                "age": 0,
                "gender": "MALE",
                "phoneNumber": "string",
                "status": "ACTIVE",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            },
            "attendant": {
                "id": 1538,
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "staff": {
                "id": 0,
                "name": "string",
                "age": 0,
                "gender": "MALE",
                "phoneNumber": "string",
                "status": "ACTIVE",
                "createdAt": "2025-10-19T07:13:00.994Z",
                "updatedAt": "2025-10-19T07:13:00.994Z",
                "isDeleted": true,
                "deletedAt": "2025-10-19T07:13:00.994Z",
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
            alert('Error when update!')
            console.log(error)
        })
    }

    useEffect(() => {
        getProvinces()
        if (isEdit && trip) {
            console.log(trip)
            setCode(trip?.tripCode)
            setDistance(trip.distance)
            setPStart(trip.route.origin.name)
            setPEnd(trip.route.destination.name)
            setSTime(toDatetimeLocalString(Number(trip.departureTime)))
            setETime(toDatetimeLocalString(Number(trip.arrivalTime)))
            setRoute(trip.route)
            setBus(trip.vehicle)
        }
    }, [])

    useEffect(() => {
        getRoutes()
    }, [currentPStart, currentPEnd])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin chuyến xe' : 'Tạo chuyến xe mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>CODE</p>
                                    <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder='code' className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Khoảng cách (km)</p>
                                    <input value={distance} onChange={(e) => setDistance(e.target.valueAsNumber)} type="number" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>Nơi đi</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => setCurrentPStart(Number(e.target.value))}>
                                        <option value="">Chọn tỉnh</option>
                                        { 
                                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                                                <option key={province.id} value={province.provinceCode}>{province.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Nơi đến</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => setCurrentPEnd(Number(e.target.value))}>
                                        <option value="">Chọn tỉnh</option>
                                        { 
                                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                                                <option key={province.id} value={province.provinceCode}>{province.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <select className='w-full my-[10px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                onChange={(e) => {
                                    const selected = routes.find(o => o.id === Number(e.target.value))
                                    if (selected) setRoute(selected)
                                    setCurrentRID(Number(e.target.value))
                                }
                                }>
                                <option value="">{isEdit ? `Từ ${pStart} đến ${pEnd}` : 'Chọn bến xe'}</option>
                                { 
                                    routes.map((route) => (
                                        <option key={route.id} value={route.id}>Từ {route.origin.name} đến {route.destination.name}</option>
                                    ))
                                }
                            </select>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>Loại xe</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => {
                                            getVehicles(e.target.value)
                                        }}>
                                        <option>{isEdit ? trip?.vehicle.type : 'Chọn loại xe'}</option>
                                        <option value='STANDARD_BUS_NORMAL'>STANDARD_BUS_NORMAL</option>
                                        <option value='STANDARD_BUS_VIP'>STANDARD_BUS_VIP</option>
                                        <option value='LIMOUSINE'>LIMOUSINE</option>
                                    </select>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Xe</p>
                                    <select className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => {
                                            const selected = buses.find(o => o.id === Number(e.target.value))
                                            if (selected) setBus(selected)
                                        }}>
                                        <option>{isEdit ? trip?.vehicle.plateNumber : 'Chọn xe'}</option>
                                        {
                                            buses.map((bus) => (
                                                <option value={bus.id}>{bus.plateNumber}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between my-[5px]'>
                                <div className='w-[48%]'>
                                    <p>Thời gian bắt đầu</p>
                                    <input value={sTime} onChange={(e) => setSTime(e.target.value)} type='datetime-local' className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                                </div>
                                <div className='w-[48%]'>
                                    <p>Thời gian kết thúc</p>
                                    <input value={eTime} onChange={(e) => setETime(e.target.value)} type='datetime-local' className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
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

export default TripModal
