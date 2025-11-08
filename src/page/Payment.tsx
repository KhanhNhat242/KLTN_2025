import { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import type { Bus } from '../interface/Interface'
import axios from 'axios'
import SeatMap from '../components/SeatMap'
import currenticon from '../assets/currenticon.png'
import soldicon from '../assets/soldicon.png'
import emptyicon from '../assets/emptyicon.png'

const Payment = () => {
    const [promoCode, setPromoCode] = useState<string>('')
    const [vehicle, setVehicle] = useState<Bus>()
    const [isLimousine, setIsLimousine] = useState<boolean>(false)
    const [type, setType] = useState<string>('')
    const [price, setPrice] = useState<number>(1)

    const location = useLocation() 
    const { tripData, vehicleID } = location.state
    const seatList = useSelector((state: RootState) => state.seatList)
    const token = useSelector((state: RootState) => state.auth.accessToken)
    const navigate = useNavigate()

    const getVehicle = async () => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/vehicles/${vehicleID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // console.log(res.data)
            setVehicle(res.data)
            if (res.data.type === 'LIMOUSINE') {
                setIsLimousine(true)
                setType('Limousine')
            }
            else if (res.data.type === 'STANDARD_BUS_NORMAL') {
                setType('Thường')
            }
            else if (res.data.type === 'STANDARD_BUS_VIP') {
                setType('VIP')
            }
        })
        .catch(() => {
            console.log('Get vehicle fail!')
        })
    }

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds} ngày ${day}/${month}/${year}`
    }

    const handlePrice = () => {
        console.log(vehicle)
        setPrice(Number(vehicle?.typeFactor) * tripData.route.baseFare * 1000)
    }

    const handlePayment = async () => {
        alert('Thanh toán thành công')
        navigate('/')
    }

    useEffect(() => {
        // console.log(vehicleID)
        getVehicle()
    }, [])
    
    useEffect(() => {
        handlePrice()
        console.log(price)
    }, [vehicle])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px] bg-gray-100'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý hóa đơn</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='w-[50vw] p-[10px] flex flex-col items-start bg-white'>
                        <h2 className='ml-[10px] font-bold text-[20px]'>Chọn ghế</h2>
                        <div className='w-full flex flex-row'>
                            <SeatMap isLimousine={isLimousine} />
                            <div className='w-[30%] px-[10px]'>
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
                    <div className='w-[30vw]'>
                        <div className='w-full bg-white flex flex-col items-start p-[10px]'>
                            <h2 className='font-bold text-[20px] p-[10px]'>Thông tin tuyến</h2>
                            <div className='w-full p-[10px]' style={{borderTopColor: '#ccc', borderTopStyle: 'solid', borderTopWidth: '1px'}}>
                                <div className='w-full flex flex-row justify-between'>
                                    <p>Tuyến</p>
                                    <p className='font-bold'>{tripData.route.origin.address.ward.district.province.name + ' - ' + tripData.route.destination.address.ward.district.province.name}</p>
                                </div>
                                <div className='w-full flex flex-row justify-between mt-[5px]'>
                                    <p>Chuyến</p>
                                    <p className='font-bold'>{formatTimestamp(tripData.departureTime)}</p>
                                </div>
                                <div className='w-full flex flex-row justify-between mt-[5px]'>
                                    <p>Biển số</p>
                                    <p className='font-bold'>{vehicle?.plateNumber}</p>
                                </div>
                                <div className='w-full flex flex-row justify-between mt-[5px]'>
                                    <p>Loại xe</p>
                                    <p className='font-bold'>{type}</p>
                                </div>
                                <div className='w-full flex flex-row justify-between mt-[5px]'>
                                    <p>Số lượng</p>
                                    <p className='font-bold'>{seatList.length}</p>
                                </div>
                                <div className='w-full flex flex-row justify-between mt-[5px]'>
                                    <p>Mã ghế</p>
                                    <div className='flex flex-row'>
                                        {/* {
                                            seatList.map((s) => (
                                                <p className='font-bold'>{s + ', '}</p>
                                            ))
                                        } */}
                                        <p className='font-bold'>{seatList.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full p-[10px]' style={{borderTopColor: '#ccc', borderTopStyle: 'solid', borderTopWidth: '1px'}}>
                                <div className='w-full flex flex-col items-start'>
                                    <div className='w-full flex flex-row justify-between'>
                                        <p>Điểm đón</p>
                                        {/* <p className='text-[#1447E6] cursor-pointer hover:underline'>Thay đổi</p> */}
                                    </div>
                                    <p className='font-bold'>{tripData.route.origin.name}</p>
                                    <p className='text-left ml-[10px]'>{`Địa chỉ: ${tripData.route.origin.address.streetAddress}`}</p>
                                </div>
                                <div className='w-full flex flex-col items-start mt-[5px]'>
                                    <div className='w-full flex flex-row justify-between'>
                                        <p>Điểm trả</p>
                                        {/* <p className='text-[#1447E6] cursor-pointer hover:underline'>Thay đổi</p> */}
                                    </div>
                                    <p className='font-bold'>{tripData.route.destination.name}</p>
                                    <p className='text-left ml-[10px]'>{`Địa chỉ: ${tripData.route.destination.address.streetAddress}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full bg-white flex flex-col items-start p-[10px] mt-[10px]'>
                            <h2 className='font-bold text-[20px] p-[10px]'>Thông tin hóa đơn</h2>
                            <div className='w-full flex flex-col p-[10px]' style={{borderTopColor: '#ccc', borderTopStyle: 'solid', borderTopWidth: '1px'}}>
                                {/* <div className='w-full flex flex-row justify-between mt-[5px]'>
                                    <p>Tạm tính</p>
                                    <p className='font-bold'>600000</p>
                                </div>
                                <div className='w-full flex flex-row items-center justify-between'>
                                    <p>Khuyến mãi</p>
                                    <input type="text" className='w-[30%] px-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    <select className='w-[30%] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                                        <option value="">ứdfgử</option>
                                        <option value="">ửdtgwẻ</option>
                                        <option value="">ưêtgư</option>
                                    </select>
                                </div> */}
                                {/* <div className='w-full h-full flex flex-col justify-between items-end mt-[10px] pt-[10px]' style={{borderTopStyle: 'solid', borderTopWidth: 1, borderTopColor: '#000'}} > */}
                                <div className='w-full h-full flex flex-col justify-between items-end mt-[10px] pt-[10px]' >
                                    <div className='w-full flex flex-row justify-between'>
                                        <p>Tổng tiền</p>
                                        <p className='font-bold'>{(price * seatList.length).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                    </div>
                                    <button className='w-[30%] mt-[10px] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'
                                        onClick={() => handlePayment()}
                                    >Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Payment
