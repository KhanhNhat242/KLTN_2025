import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import downloadicon from '../assets/downloadicon.png'
import DeleteModal from '../components/DeleteModal';
import BusModal from '../components/BusModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setBuses } from '../redux/busSlice';
import axios from 'axios';
import type { Bus } from '../interface/Interface';
import { useNavigate } from 'react-router-dom';

const Bus = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [selectedBus, setSelectedBus] = useState<Bus>()

  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch()
  const buses = useSelector((state: RootState) => state.buses)
  const navigate = useNavigate()

  const getData = async () => {
    await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles?isDeleted.equals=false', {
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
      // console.log(res.data)
      dispatch(setBuses(res.data))
    })
    .catch(() => {
        console.log('Get data fail!')
    })
    // console.log('data: ',res.data)
    // setPromotions(res.data)
        
    }

    const handleDelete = async (bus: Bus) => {
      const now = new Date().toISOString()
      const res = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${bus?.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            }
        )
      const seatmapid = res.data.seatMap.id

      await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${bus.id}`, {
          "id": bus?.id,
          "type": bus.type,
          "typeFactor": 0,
          "plateNumber": bus.plateNumber,
          "brand": bus.brand,
          "description": bus.description,
          "status": "ACTIVE",
          "createdAt": "2025-10-08T07:59:05.392Z",
          "updatedAt": now,
          "isDeleted": true,
          "deletedAt": now,
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
      })
      .catch((error) => {
          alert('Error when deleting!')
          console.log(error)
      })
    }

    useEffect(() => {
        // console.log('token:', token)
        if (token) {
            getData()
        }
    }, [token])

  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <div className='w-full flex flex-row justify-between my-[10px]'>
          <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách xe</h2>
          <div className='flex flex-row'>
            <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
              <img src={downloadicon} className='size-[20px] mr-[5px]' />
              <p>Xuất Excel</p>
            </button>
            <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
              onClick={() => {
                setIsEdit(false)
                setIsOpen(true)
              }}>+ Tạo xe mới</button>
          </div>
        </div>
        <div className='mt-[20px]'>
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Mã xe</th>
                  <th className="p-3 border-b">Loại xe</th>
                  <th className="p-3 border-b">Biển số</th>
                  <th className="p-3 border-b">Hãng xe</th>
                  <th className="p-3 border-b">Mô tả</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => {
                    if (bus.id >= 1540)
                    return (
                      <tr key={bus.id} className="cursor-pointer hover:bg-gray-50">
                        <td className="p-3 border-b"  onClick={() => navigate('/bus-detail', { state: { busdata: bus } })}>{bus.id}</td>
                        <td className="p-3 border-b">{bus.type}</td>
                        <td className="p-3 border-b">{bus.plateNumber}</td>
                        <td className="p-3 border-b">{bus.brand}</td>
                        <td className="p-3 border-b">{bus.description}</td>
                        <td className="p-3 border-b space-x-2">
                          <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                            onClick={() => {
                              setSelectedBus(bus)
                              setIsOpen(true)
                              setIsEdit(true)
                            }}>Sửa</button>
                            <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                onClick={() => {
                                  setSelectedBus(bus)
                                  handleDelete(bus)
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
        {isOpen && (isEdit ? <BusModal isEdit={true} setIsOpen={setIsOpen} bus={selectedBus} /> : <BusModal isEdit={false} setIsOpen={setIsOpen} /> ) }
        {isDelete && <DeleteModal setIsDelete={setIsDelete} vehicle={selectedBus} />}
    </div>
  )
}

export default Bus
