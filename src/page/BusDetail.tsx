import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import wifiicon from '../assets/wifiicon.png'
import batteryicon from '../assets/batteryicon.png'
import airconditionericon from '../assets/airconditionericon.png'
import towelicon from '../assets/towelicon.png'
import hammericon from '../assets/hammericon.png'
import blanketicon from '../assets/blanketicon.png'
import bottleicon from '../assets/bottleicon.png'
import Free from '../components/Free'
import currenticon from '../assets/currenticon.png'
import soldicon from '../assets/soldicon.png'
import emptyicon from '../assets/emptyicon.png'
import SeatMap from '../components/SeatMap'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import type { Bus } from '../interface/Interface'

const BusDetail = () => {
    const [type, setType] = useState<string>('')
    const [isLimousine, setIsLimousine] = useState<boolean>(false)
    const [bus, setBus] = useState<Bus>()

    const location = useLocation() 
    const { busid, tripid } = location.state
    const token = useSelector((state: RootState) => state.auth.accessToken)

    const getVehicle = async () => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${busid}/detail`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            setBus(res.data.vehicle)
            if (res.data.vehicle.type === 'STANDARD_BUS_VIP') {
                setType('VIP')
            }
            else if (res.data.vehicle.type === 'STANDARD_BUS_NORMAL') {
                setType('Thường')
            }
            else if (res.data.vehicle.type === 'LIMOUSINE') {
                setIsLimousine(true)
                setType('Limousine')
            }
        })
        .catch(() => {
            console.log('Get data fail!')
        })
    }

    useEffect(() => {
        getVehicle()
        console.log('id', busid, tripid)
        const hasReloaded = sessionStorage.getItem("page_reloaded");

        if (!hasReloaded) {
            sessionStorage.setItem("page_reloaded", "true");
            window.location.reload();
        }
    }, [])

    return (
        <div className='w-full flex flex-row'>
            <Header />
            <div className='w-full p-[10px] bg-gray-100'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold my-[10px]'>Chi tiết xe</h2>
                <div className='w-full flex flex-row'>
                    <div className='w-[30%] bg-white mr-[10px] p-[10px] rounded-[10px]'>
                        <div className='w-full flex flex-row justify-between' style={{borderStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: 2}}>
                            <h2 className='font-bold pb-[10px]'>Thông tin xe</h2>
                            <p>Hoạt động</p>
                        </div>
                        {/* <div className='w-full flex flex-row justify-between pt-[10px]'>
                            <p>Tài xế chính:</p>
                            <p className='font-bold'>Nguyễn Văn A</p>
                        </div> */}
                        <div className='w-full flex flex-row justify-between'>
                            <p>Biển số:</p>
                            <p className='font-bold'>{bus?.plateNumber}</p>
                        </div>
                        <div className='w-full flex flex-row justify-between'>
                            <p>Loại xe:</p>
                            <p className='font-bold'>{type}</p>
                        </div>
                        <div className='w-full flex flex-row justify-between'>
                            <p>Hãng xe</p>
                            <p className='font-bold'>{bus?.brand}</p>
                        </div>
                        {/* <div className='w-full flex flex-row justify-between'>
                            <p>Ngày cập nhật gần nhất:</p>
                            <p className='font-bold'>12/03/2025</p>
                        </div> */}
                        <div className='mt-[10px] p-[10px] bg-gray-100 rounded-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                            <h2 className='text-left font-bold pb-[5px]' style={{borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>Tiện ích</h2>
                            <div className='flex flex-row pt-[10px]'>
                                <Free txt='Wifi' source={wifiicon} />
                                <Free txt='Sạc điện thoại' source={batteryicon} />
                                <Free txt='Điều hòa' source={airconditionericon} />
                            </div>
                            <div className='flex flex-row mt-[5px] mb-[5px]'>
                                <Free txt='Khăn lạnh' source={towelicon} />
                                <Free txt='Búa phá kính' source={hammericon} />
                            </div>
                            <div className='flex flex-row'>
                                <Free txt='Chăn đắp' source={blanketicon} />
                                <Free txt='Nước uống' source={bottleicon} />
                            </div>
                        </div>
                    </div>
                    <div className='w-[70%] bg-white'>
                        <h2 className='font-bold text-left p-[10px]' style={{borderStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: 2}}>Sơ đồ ghế</h2>
                        <div className='w-full p-[10px] flex flex-row'>
                            <SeatMap isLimousine={isLimousine} tripID={tripid} />
                            <div className='w-[50% pl-[20px] pb-[10px] flex flex-col justify-between items-start'>
                                <div>
                                    <h2 className='h-[40px] font-bold text-left pt-[20px] text-gray'>Trạng thái</h2>
                                    <div className='w-full mt-[30px]'>
                                        <div className='w-full flex flex-row items-center p-[5px]'>
                                            <img src={emptyicon} className='mr-[5px]' />
                                            <p>Còn trống</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center p-[5px]'>
                                            <img src={currenticon} className='mr-[5px]' />
                                            <p>Đang chọn</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center p-[5px]'>
                                            <img src={soldicon} className='mr-[5px]' />
                                            <p>Đã bán</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default BusDetail
