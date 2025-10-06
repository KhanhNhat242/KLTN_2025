import Filter from '../components/Filter';
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop';
import Search from '../components/Search';
import downloadicon from '../assets/downloadicon.png'
import DeleteMocal from '../components/DeleteModal';
import BusModal from '../components/BusModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setBuses } from '../redux/busSlice';
import axios from 'axios';

const Bus = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch()
  const buses = useSelector((state: RootState) => state.buses)

  const getData = async () => {
    await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles', {
        params: {
            'page': '0',
            'size': '20',
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
        dispatch(setBuses(res.data))
    })
    .catch(() => {
        console.log('Get data fail!')
    })
    // console.log('data: ',res.data)
    // setPromotions(res.data)
        
    }

    useEffect(() => {
        console.log('token:', token)
        if (token) {
            getData()
        }
    }, [token])

  return (
    <div className='w-full h-full flex flex-row justify-start'>
      <Header />
      <div className='w-full p-[10px]'>
        <HeaderTop />
        <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách xe</h2>
        <div className='w-full flex flex-row justify-between'>
          <div className='flex flex-row'>
            <Search placeholder='Tìm trong danh sách tuyến' />
            <Filter type='bus-information' />
          </div>
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
                    return (
                      <tr key={bus.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{bus.id}</td>
                        <td className="p-3 border-b">{bus.type}</td>
                        <td className="p-3 border-b">{bus.plateNumber}</td>
                        <td className="p-3 border-b">{bus.brand}</td>
                        <td className="p-3 border-b">{bus.description}</td>
                        <td className="p-3 border-b space-x-2">
                          <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                            onClick={() => {
                              setIsOpen(true)
                              setIsEdit(true)
                            }}>Sửa</button>
                          <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                        </td>
                      </tr>
                    )

                }
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (isEdit ? <BusModal isEdit={true} setIsOpen={setIsOpen} /> : <BusModal isEdit={false} setIsOpen={setIsOpen} /> ) }
        {isDelete && <DeleteMocal setIsDelete={setIsDelete} />}
    </div>
  )
}

export default Bus
