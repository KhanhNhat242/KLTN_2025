import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import { useEffect, useState } from 'react';
import TripModal from '../components/TripModal';
import DeleteModal from '../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { setTrips } from '../redux/tripSlice';
import type { Trip } from '../interface/Interface';
import SearchTrip from '../components/SearchTrip';

const Trip = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedTrip, setSelectedTrip] = useState<Trip>()
    const [currentFilter, setCurrentFilter] = useState<string>('all')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const trips = useSelector((state: RootState) => state.trips)

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`
    }

    const getData = async () => {
      await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?isDeleted.equals=false', {
        params: {
            'page': '0',
            'size': '40',
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
        },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch(setTrips(res.data))
      })
      .catch(() => {
          console.log('Get data fail!')
      })
    }

    const handleDelete = async (trip: Trip) => {
      const now = new Date().toISOString()
      const st = new Date(trip.departureTime).toISOString()
      const et = new Date(trip.arrivalTime).toISOString()

      await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${trip?.id}`, {
          "id": trip?.id,
          "tripCode": trip.tripCode,
          "departureTime": st,
          "arrivalTime": et,
          "occasionFactor": 1,
          "createdAt": "2025-10-19T07:13:00.993Z",
          "updatedAt": now,
          "isDeleted": true,
          "deletedAt": now,
          "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "route": {
              "id": trip.route.id,
              "routeCode": trip.route.routeCode,
              "distanceKm": trip.distance,
              "baseFare": 0,
              "createdAt": "2025-10-19T07:13:00.993Z",
              "updatedAt": "2025-10-19T07:13:00.993Z",
              "isDeleted": true,
              "deletedAt": "2025-10-19T07:13:00.993Z",
              "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "origin": {
              "id": trip.route.origin.id,
              "name": trip.route.origin.name,
              "phoneNumber": "string",
              "description": trip.route.origin.description,
              "active": true,
              "createdAt": "2025-10-19T07:13:00.993Z",
              "updatedAt": "2025-10-19T07:13:00.993Z",
              "isDeleted": true,
              "deletedAt": "2025-10-19T07:13:00.993Z",
              "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "address": {
                  "id": trip.route.origin.address.id,
                  "streetAddress": trip.route.origin.streetAddress,
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
              "id": trip.route.destination.id,
              "name": trip.route.destination.name,
              "phoneNumber": "string",
              "description": trip.route.destination.description,
              "active": true,
              "createdAt": "2025-10-19T07:13:00.994Z",
              "updatedAt": "2025-10-19T07:13:00.994Z",
              "isDeleted": true,
              "deletedAt": "2025-10-19T07:13:00.994Z",
              "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "address": {
                  "id": trip.route.destination.address.id,
                  "streetAddress": trip.route.destination.streetAddress,
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
              "id": trip.vehicle.id,
              "type": trip.vehicle.type,
              "typeFactor": 0,
              "plateNumber": trip.vehicle.plateNumber,
              "brand": trip.vehicle.brand,
              "description": trip.vehicle.description,
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
          "slot": {
              "id": 1,
              "slotCode": null,
              "departureTime": null,
              "arrivalTime": null,
              "bufferMinutes": null,
              "sequence": null,
              "active": null,
              "createdAt": null,
              "updatedAt": null,
              "isDeleted": null,
              "deletedAt": null,
              "deletedBy": null,
              "schedule": null
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
          console.log(res.data)
      })
      .catch(() => {
          console.log('Delete fail!')
      })
    }

    const handleFilter = async () => {
      const currentTime = new Date().toISOString()
      console.log(currentTime)

      if (currentFilter === 'happening') {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?departureTime.lessThanOrEqual=${currentTime}&arrivalTime.greaterThanOrEqual=${currentTime}`, {
          headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setTrips(res.data))
        })
        .catch((error) => {
            alert('Filter fail!')
            console.log(error)
        })
      }
      else if (currentFilter === 'ended') {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?arrivalTime.lessThan=${currentTime}`, {
          headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setTrips(res.data))
        })
        .catch((error) => {
            alert('Filter fail!')
            console.log(error)
        })
      }
      else if (currentFilter === 'notStarted') {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?departureTime.lessThan=${currentTime}`, {
          headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setTrips(res.data))
        })
        .catch((error) => {
            alert('Filter fail!')
            console.log(error)
        })
      }
    }

    useEffect(() => {
      if (token) {
          getData()
      }
    }, [token])

    useEffect(() => {
      handleFilter()
    }, [currentFilter])

    return (
      <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
          <HeaderTop />
          <h2 className='text-[20px] text-left font-bold mt-[10px]'>Quản lý lịch trình</h2>
          <div className='w-full flex flex-row justify-between'>
            <SearchTrip />
            <div className='flex flex-row items-end pb-[20px]'>
              <select className='flex flex-row items-center rounded-[10px] p-[10px] mr-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                onChange={(e) => setCurrentFilter(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="happening">Đang diễn ra</option>
                <option value="ended">Đã kết thúc</option>
                <option value="notStarted">Chưa diễn ra</option>
              </select>
              <button className='h-[30%] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                onClick={() => {
                  setIsOpen(true)
                  setIsEdit(false)
                }}>+ Tạo lịch trình mới</button>
            </div>
          </div>
          <div className='mt-[20px]'>
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Mã tuyến</th>
                  <th className="p-3 border-b">Tuyến xe</th>
                  <th className="p-3 border-b">Thời gian khởi hành</th>
                  <th className="p-3 border-b">Thời gian kết thúc</th>
                  <th className="p-3 border-b">Nơi đi</th>
                  <th className="p-3 border-b">Nơi đến</th>
                  <th className="p-3 border-b">Loại xe</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => {
                  if (Number(trip.id) >= 1500)
                  return (
                    // <tr key={trip.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/bus-detail', { state: { busid: trip.vehicle.id, tripdata: trip } })}>
                    <tr key={trip.id} className="cursor-pointer hover:bg-gray-50">
                        <td className="p-3 border-b">{trip.id}</td>
                        <td className="p-3 border-b">{`${trip.route.origin.description.replace(/^Station in /, '')} - ${trip.route.destination.description.replace(/^Station in /, '')}`}</td>
                        <td className="p-3 border-b">{formatTimestamp(Number(trip.departureTime))}</td>
                        <td className="p-3 border-b">{formatTimestamp(Number(trip.arrivalTime))}</td>
                        <td className="p-3 border-b">{trip.route.origin.name}</td>
                        <td className="p-3 border-b">{trip.route.destination.name}</td>
                        <td className="p-3 border-b">{trip.vehicle.type}</td>
                        <td className="p-3 border-b space-x-2">
                          <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                            onClick={() => {
                              setSelectedTrip(trip)
                              setIsOpen(true)
                              setIsEdit(true)
                            }}>Sửa</button>
                            <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                              onClick={() => {
                                setSelectedTrip(trip)
                                handleDelete(trip)
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
        {isOpen && (isEdit ? <TripModal isEdit={true} setIsOpen={setIsOpen} trip={selectedTrip} /> : <TripModal isEdit={false} setIsOpen={setIsOpen} /> ) }
        {isDelete && <DeleteModal setIsDelete={setIsDelete} trip={selectedTrip} />}
      </div>
    )
}

export default Trip
