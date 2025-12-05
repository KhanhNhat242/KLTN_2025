import { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import type { Driver as DriverType } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setDrivers, updateStaff } from '../redux/driverSlice'
import DeleteModal from '../components/DeleteModal'
import DriverModal from '../components/DriverModal'

const Driver = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [selectedDriver, setSelectedDriver] = useState<DriverType>()

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const drivers = useSelector((state: RootState) => state.driver)

    const getDrivers = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/drivers?isDeleted.equals=false', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setDrivers(res.data))
        })
        .catch(() => {
            console.log('Get drivers fail!')
        })
    }

    const getStaffs = async (id: number) => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/staff/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(updateStaff({ id: id, staff: res.data }))
        })
        .catch(() => {
            console.log('Get staff fail!')
        })
    }

    const handleDelete = async (driver: DriverType) => {
        const now = new Date().toISOString()

        await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/drivers/${driver.id}`, {
            "id": driver.id,
            "licenseClass": driver.licenseClass,
            "yearsExperience": driver.yearsExperience,
            "createdAt": "2025-12-05T15:09:41.399Z",
            "updatedAt": now,
            "isDeleted": true,
            "deletedAt": now,
            "deletedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "staff": {
                "id": driver.staff.id,
                "name": driver.staff.name,
                "age": driver.staff.age,
                "gender": driver.staff.gender,
                "phoneNumber": driver.staff.phoneNumber,
                "status": driver.staff.status,
                "createdAt": "2025-12-05T15:09:41.400Z",
                "updatedAt": "2025-12-05T15:09:41.400Z",
                "isDeleted": false,
                "deletedAt": "2025-12-05T15:09:41.400Z",
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
        .catch(() => {
            console.log('Delete fail!')
        })
    }

    useEffect(() => {
        getDrivers()
    }, [])

    useEffect(() => {
        if (drivers.length >= 10) {
            drivers.forEach((d) => {
                if (!d.staff.age) {
                    getStaffs(d.staff.id)
                }
            })
        }
        // console.log(drivers)
    }, [drivers])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <div className='w-full flex flex-row justify-between my-[10px]'>
                    <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách tài xế</h2>
                    <div className='flex flex-row'>
                        <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                        <img src={downloadicon} className='size-[20px] mr-[5px]' />
                        <p>Xuất Excel</p>
                        </button>
                        <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                        onClick={() => {
                            setIsEdit(false)
                            setIsOpen(true)
                        }}>+ Tạo tài xế mới</button>
                    </div>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="p-3 border-b">ID</th>
                        <th className="p-3 border-b">Giấy phép lái xe</th>
                        <th className="p-3 border-b">Kinh nghiệm (năm)</th>
                        <th className="p-3 border-b">Tên</th>
                        <th className="p-3 border-b">Tuổi</th>
                        <th className="p-3 border-b">Giới tính</th>
                        <th className="p-3 border-b">Số điện thoại</th>
                        <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((d) => {
                            if (d.id >= 1520)
                            return (
                            <tr key={d.id} className="cursor-pointer hover:bg-gray-50">
                                <td className="p-3 border-b">{d.id}</td>
                                <td className="p-3 border-b">{d.licenseClass}</td>
                                <td className="p-3 border-b">{d.yearsExperience}</td>
                                <td className="p-3 border-b">{d.staff.name}</td>
                                <td className="p-3 border-b">{d.staff.age}</td>
                                <td className="p-3 border-b">{`${d.staff.gender === 'MALE' ? 'Nam' : 'Nữ'}`}</td>
                                <td className="p-3 border-b">{d.staff.phoneNumber}</td>
                                <td className="p-3 border-b space-x-2">
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedDriver(d)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedDriver(d)
                                            handleDelete(d)
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
                {isOpen && (isEdit ? <DriverModal isEdit={true} setIsOpen={setIsOpen} driver={selectedDriver} /> : <DriverModal isEdit={false} setIsOpen={setIsOpen} /> ) }
                {isDelete && <DeleteModal setIsDelete={setIsDelete} driver={selectedDriver} />}
            </div>
    )
}

export default Driver
