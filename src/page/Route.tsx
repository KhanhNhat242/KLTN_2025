import { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import Search from '../components/Search'
import Filter from '../components/Filter'
import downloadicon from '../assets/downloadicon.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setRoutes } from '../redux/routeSlice'
import type { RootState } from '../redux/store'
import DeleteModal from '../components/DeleteModal'
import RouteModal from '../components/RouteModal'
import type { Route } from '../interface/Interface'

const Route = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedRoute, setSelectedRoute] = useState<Route>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const routes = useSelector((state: RootState) => state.routes)

    const getRoutes = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes?page=0&size=100', {
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

    useEffect(() => {
        getRoutes()
    }, [])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
        <Header />
        <div className='w-full p-[10px]'>
            <HeaderTop />
            <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách tuyến xe</h2>
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
                }}>+ Tạo tuyến mới</button>
            </div>
            </div>
            <div className='mt-[20px]'>
                <table className="w-full border border-gray-200 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b">Mã tuyến</th>
                        <th className="p-3 border-b">CODE</th>
                        <th className="p-3 border-b">Giá cơ bản</th>
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
                            <td className="p-3 border-b">{route.baseFare}</td>
                            <td className="p-3 border-b">{route.origin.name}</td>
                            <td className="p-3 border-b">{route.destination.name}</td>
                            <td className="p-3 border-b space-x-2">
                            <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                onClick={() => {
                                    setIsOpen(true)
                                    setIsEdit(true)
                                }}>Sửa</button>
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedRoute(route)
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
            {isOpen && (isEdit ? <RouteModal isEdit={true} setIsOpen={setIsOpen} /> : <RouteModal isEdit={false} setIsOpen={setIsOpen} /> ) }
            {isDelete && <DeleteModal setIsDelete={setIsDelete} route={selectedRoute}/>}
        </div>
    )
}

export default Route
