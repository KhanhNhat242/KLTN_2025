import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import DeleteModal from '../components/DeleteModal';
import StationModal from '../components/StationModal'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import axios from 'axios'
import { setStations, update } from '../redux/stationSlice'
import type { Address, Station } from '../interface/Interface'

const Station = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [addresses, setAddresses] = useState<Address[]>([])
    const [selectedStation, setSelectedStation] = useState<Station>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const stations = useSelector((state: RootState) => state.stations)

    const getData = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/stations', {
            params: {
                'page': '0',
                'size': '50',
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setStations(res.data))
        })
        .catch(() => {
            console.log('Get data fail!')
        })
    }

    const getAddress = async (id: number) => {
        const res = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/addresses/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        // console.log(res.data)
        setAddresses([res.data, ...addresses])
    }

    const getAddresses = async (ids: number[]) => {
        try {
            // Gọi tất cả API song song, chờ tất cả xong rồi mới set state
                const responses = await Promise.all(
                    ids.map(id =>
                        axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/addresses/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    accept: '*/*',
                                    'Content-Type': 'application/json',
                                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                                },
                            }
                        )
                    )
                )
                const data = responses.map(res => res.data)
                setAddresses(data)
                // console.log(addresses)
        } catch (err) {
            console.error('Get addresses failed', err)
        }
    }

    const handleDelete = async (station: Station) => {
        const now = new Date().toISOString()

        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/stations/${station?.id}`, {
            "id": station?.id,
            "name": station.name,
            "phoneNumber": "0123456666",
            "description": station.description,
            "active": station.active,
            "createdAt": now,
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": now,
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
            // dispatch(remove(res.data.id))
            // alert('delete success')
        })
        .catch((error) => {
            alert('Error when deleting!')
            console.log(error)
        })
    }

    useEffect(() => {
        if (token) {
            getData()
        }
    }, [token])

    useEffect(() => {
        if (stations.length > 0 && stations.length <= 50) {
            const ids = stations.map(item => item.address.id)
            // setAddressIDArr(ids)
            getAddresses(ids)
        }
        else if (stations.length > 50) {
            const lastStation = stations[0]
            console.log(lastStation)
            getAddress(lastStation.address.id)
            // const isDup = stations.some((s) => s.id === lastStation.address.id)
            // if (!isDup) {
            //     getAddress(lastStation.address.id)
            // }
        }
    }, [stations])

    useEffect(() => {
        if (addresses.length > 0 && stations.length > 0) {
            stations.forEach(s => {
                const match = addresses.find(a => a.id === s.address.id)
                if (match) {
                    dispatch(
                        update({
                            id: s.id,
                            name: s.name,
                            description: s.description,
                            active: s.active,
                            address: s.address,
                            streetAddress: match.streetAddress,
                            isDeleted: false,
                        })
                    )
                }
            })
        }
    }, [addresses])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
            <HeaderTop />
            <div className='w-full flex flex-row justify-between my-[10px]'>
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý trạm</h2>
                <div className='flex flex-row'>
                    <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                    <img src={downloadicon} className='size-[20px] mr-[5px]' />
                    <p>Xuất Excel</p>
                    </button>
                    <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                    onClick={() => {
                        setIsEdit(false)
                        setIsOpen(true)
                    }}>+ Tạo trạm mới</button>
                </div>
            </div>
            <div className='mt-[20px]'>
                <table className="w-full border border-gray-200 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b">Mã trạm</th>
                        <th className="p-3 border-b">Tên trạm</th>
                        <th className="p-3 border-b">Địa chỉ</th>
                        <th className="p-3 border-b">Mô tả</th>
                        <th className="p-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.filter(station => station.id >= 1500 && station.isDeleted === false).map((station) => 
                        // if (station.id >= 1500 && station.isDeleted === false)                        
                         (
                            <tr key={station.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{station.id}</td>
                                <td className="p-3 border-b">{station.name}</td>
                                <td className="p-3 border-b">{station.streetAddress}</td>
                                <td className="p-3 border-b">{station.description}</td>
                                <td className="p-3 border-b space-x-2">
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedStation(station)
                                            setIsOpen(true)
                                            setIsEdit(true)
                                        }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedStation(station)
                                            handleDelete(station)
                                            setIsDelete(true)
                                        }
                                        }>Xóa</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
                </table>
            </div>
            </div>
            {isOpen && (isEdit ? <StationModal isEdit={true} setIsOpen={setIsOpen} station={selectedStation} /> : <StationModal isEdit={false} setIsOpen={setIsOpen} /> ) }
            {isDelete && <DeleteModal setIsDelete={setIsDelete} station={selectedStation} />}
        </div>
    )
}

export default Station
