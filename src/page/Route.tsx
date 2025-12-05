import { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setRoutes } from '../redux/routeSlice'
import type { RootState } from '../redux/store'
import DeleteModal from '../components/DeleteModal'
import RouteModal from '../components/RouteModal'
import type { Route as RouteType } from '../interface/Interface'
import SearchRoute from '../components/SearchRoute'

const Route = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedRoute, setSelectedRoute] = useState<RouteType>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const routes = useSelector((state: RootState) => state.routes)

    const getRoutes = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes?isDeleted.equals=false', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setRoutes(res.data))
        })
        .catch(() => {
            console.log('Get data fail!')
        })
    }

    const handleDelete = async (route: RouteType) => {
        const now = new Date().toISOString()

        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes/${route.id}`, {
            "id": route.id,
            "routeCode": route.routeCode,
            "distanceKm": 0,
            "baseFare": route.baseFare,
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": now,
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "origin": {
                "id": route.origin.id,
                "name": route.origin.name,
                "phoneNumber": "string",
                "description": route.origin.description,
                "active": route.origin.active,
                "createdAt": "2025-10-18T10:26:17.325Z",
                "updatedAt": "2025-10-18T10:26:17.325Z",
                "isDeleted": true,
                "deletedAt": "2025-10-18T10:26:17.325Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route.origin.address.id,
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
                "id": route.destination.id,
                "name": route.destination.name,
                "phoneNumber": "string",
                "description": route.destination.description,
                "active": route.destination.active,
                "createdAt": "2025-10-18T10:26:17.325Z",
                "updatedAt": "2025-10-18T10:26:17.325Z",
                "isDeleted": true,
                "deletedAt": "2025-10-18T10:26:17.325Z",
                "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "address": {
                    "id": route.destination.address.id,
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
        }})
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            alert('Error when deleting!')
            console.log(error)
        })
    }

    useEffect(() => {
        getRoutes()
    }, [])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
            <HeaderTop />
            <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách tuyến xe</h2>
            <div className='w-full flex flex-row justify-between my-[10px] items-end'>
                <SearchRoute />
                <div className='flex flex-row mb-[20px]'>
                    <button className='h-[30%] p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                    <img src={downloadicon} className='size-[20px] mr-[5px]' />
                    <p>Xuất Excel</p>
                    </button>
                    <button className='h-[30%] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                    onClick={() => {
                        setIsEdit(false)
                        setIsOpen(true)
                    }}>+ Tạo tuyến mới</button>
                </div>
            </div>
            <div className='mt-[20px]'>
                <table className="w-full border border-gray-200 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b">Mã tuyến</th>
                        <th className="p-3 border-b">CODE</th>
                        <th className="p-3 border-b">Giá vé</th>
                        <th className="p-3 border-b">Điểm đón</th>
                        <th className="p-3 border-b">Điểm trả</th>
                        <th className="p-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((route) => {
                        if ((route.id >= 1000))
                        return (
                        <tr key={route.id} className="cursor-pointer hover:bg-gray-50">
                            <td className="p-3 border-b">{route.id}</td>
                            <td className="p-3 border-b">{route.routeCode}</td>
                            <td className="p-3 border-b">{(route.baseFare * 1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                            <td className="p-3 border-b">{route.origin.name}</td>
                            <td className="p-3 border-b">{route.destination.name}</td>
                            <td className="p-3 border-b space-x-2">
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedRoute(route)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                }}>Sửa</button>
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedRoute(route)
                                        handleDelete(route)
                                        setIsDelete(true)
                                    }
                                }>Xóa</button>
                            </td>
                        </tr>
                        )
                    }
                    )}
                </tbody>
                </table>
            </div>
            </div>
            {isOpen && (isEdit ? <RouteModal isEdit={true} setIsOpen={setIsOpen} route={selectedRoute} /> : <RouteModal isEdit={false} setIsOpen={setIsOpen} /> ) }
            {isDelete && <DeleteModal setIsDelete={setIsDelete} route={selectedRoute}/>}
        </div>
    )
}

export default Route
