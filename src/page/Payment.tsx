import { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

const Payment = () => {
    const [promoCode, setPromoCode] = useState<string>('')

    const location = useLocation() 
    const { tripdata } = location.state
    const seatList = useSelector((state: RootState) => state.seatList)

    // const handlePrePrice = async () => {
    //     await axios.post('')
    // }

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

    const handlePayment = async () => {
        alert('Thanh toán thành công')
    }

    useEffect(() => {
        console.log(tripdata, seatList)
    }, [])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px] bg-gray-100'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý hóa đơn</h2>
                <div className='w-full flex flex-row'>
                    <div className='w-[30%] bg-white flex flex-col p-[10px]'>
                        <div className='w-full flex flex-row justify-between'>
                            <p>Tuyến</p>
                            <p className='font-bold'>{tripdata.route.origin.address.ward.district.province.name + ' - ' + tripdata.route.destination.address.ward.district.province.name}</p>
                        </div>
                        <div className='w-full flex flex-row justify-between mt-[5px]'>
                            <p>Chuyến</p>
                            <p className='font-bold'>{formatTimestamp(tripdata.departureTime)}</p>
                        </div>
                        <div className='w-full flex flex-row justify-between mt-[5px]'>
                            <p>Loại xe</p>
                            <p className='font-bold'>{tripdata.vehicle.type}</p>
                        </div>
                        <div className='w-full flex flex-row justify-between mt-[5px]'>
                            <p>Số lượng</p>
                            <p className='font-bold'>{seatList.length}</p>
                        </div>
                        <div className='w-full flex flex-row justify-between mt-[5px]'>
                            <p>Mã ghế</p>
                            <div className='flex flex-row'>
                                {
                                    seatList.map((s) => (
                                        <p className='font-bold'>{s + '|'}</p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start mt-[10px]'>
                            <div className='w-full flex flex-row justify-between'>
                                <p>Điểm đón</p>
                                <p className='text-[#1447E6] cursor-pointer hover:underline'>Thay đổi</p>
                            </div>
                            <p className='font-bold'>{tripdata.route.origin.name}</p>
                            <p className='font-bold text-left'>{tripdata.route.origin.address.streetAddress}</p>
                        </div>
                        <div className='w-full flex flex-col items-start mt-[5px]'>
                            <div className='w-full flex flex-row justify-between'>
                                <p>Điểm trả</p>
                                <p className='text-[#1447E6] cursor-pointer hover:underline'>Thay đổi</p>
                            </div>
                            <p className='font-bold'>{tripdata.route.destination.name}</p>
                            <p className='font-bold text-left'>{tripdata.route.destination.address.streetAddress}</p>
                        </div>
                    </div>
                    <div className='w-[30%] bg-white flex flex-col items-start p-[10px] mt-[5px] ml-[10px]'>
                        <div className='w-full flex flex-row justify-between mt-[5px]'>
                            <p>Tạm tính</p>
                            <p className='font-bold'>600000</p>
                        </div>
                        <div className='w-full flex flex-row items-center justify-between'>
                            <p>Khuyến mãi</p>
                            <input type="text" className='w-[30%] px-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                            {/* <select className='w-[30%] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                                <option value="">ứdfgử</option>
                                <option value="">ửdtgwẻ</option>
                                <option value="">ưêtgư</option>
                            </select> */}
                        </div>
                        <div className='w-full h-full flex flex-col justify-between mt-[10px] pt-[10px]'  style={{borderTopStyle: 'solid', borderTopWidth: 1, borderTopColor: '#000'}} >
                            <div className='w-full flex flex-row justify-between'>
                                <p>Tổng tiền</p>
                                <p className='font-bold'>600000</p>
                            </div>
                            <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'
                                onClick={() => handlePayment()}
                            >Thanh toán</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Payment
