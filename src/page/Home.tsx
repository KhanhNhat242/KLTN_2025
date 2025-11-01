import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SearchTrip from "../components/SearchTrip"
import starticon from '../assets/starticon.png'
import endicon from '../assets/endicon.png'
import trashicon from '../assets/trashicon.png'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

const Home = () => {

    const navigate = useNavigate()

    const isLogin = useSelector((state: RootState) => state.auth.isLogin)
    const trips = useSelector((state: RootState) => state.trips)

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${hours}:${minutes}`
    }

    useEffect(() => {
        console.log(isLogin)
        // if (!isLogin) {
        //     navigate('/log-in')
        // }
    }, [])

    return (
        <div className="w-full flex flex-row">
            <Header />
            <div>
                <SearchTrip />
                {trips.map((trip) => (
                    <div className="w-[50vw] flex flex-col p-[10px] mx-[20px] shadow-lg shadow-gray-500/50 rounded-[10px]">
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[70%] flex flex-col">
                            <div className="w-full flex flex-row items-center justify-between">
                                <h2 className="font-medium text-[20px]">{formatTimestamp(Number(trip.departureTime))}</h2>
                                <div className="w-[80%] flex flex-row items-center">
                                    <img src={starticon} />
                                    <span className="w-full h-[1px]" style={{borderColor: '#ccc', borderStyle: 'dotted', borderWidth: '1px'}}></span>
                                    <img src={endicon} />
                                </div>
                                <h2 className="font-medium text-[20px]">{formatTimestamp(Number(trip.arrivalTime))}</h2>
                            </div>
                            <div className="w-full flex flex-row justify-between my-[10px]">
                                <p className="font-medium text-[20px]">{trip.route.origin.name}</p>
                                <p className="font-medium text-[20px]">{trip.route.destination.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p>Limousine</p>
                            <h2 className="font-bold text-[#1447E6] text-[22px]">300000đ</h2>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center">
                        <p className="cursor-pointer hover:text-[#1447E6]">Chọn ghế</p>
                        <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'>Chọn chuyến</button>
                    </div>
                </div>
                ))}
            </div>
            <div className="w-[25vw] h-[50vh] mt-[10px] flex flex-col p-[10px] shadow-lg shadow-gray-500/50 rounded-[10px]">
                <div className="w-full flex flex-row justify-between items-center mb-[10px]">
                    <h2 className="font-bold text-[20px]">Bộ lọc tìm kiếm</h2>
                    <div className="flex flex-row items-center cursor-pointer hover:text-[#1447E6]">
                        <p>Xóa lọc</p>
                        <img src={trashicon} className="size-[20px]" />
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <h2 className="font-medium text-[18px]">Giờ đi</h2>
                    <div className="w-full flex flex-row items-center">
                        <input type="checkbox" className="size-[15px] cursor-pointer hover:color-[#1447E6]" />
                        <p className="ml-[5px] text-[18px]">Sáng sớm 00:00 - 06:00</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="checkbox" className="size-[15px] cursor-pointer hover:color-[#1447E6]" />
                        <p className="ml-[5px] text-[18px]">Nuổi sáng 6:00 - 12:00</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="checkbox" className="size-[15px] cursor-pointer hover:color-[#1447E6]" />
                        <p className="ml-[5px] text-[18px]">Buổi chiều 12:00 - 18:00</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="checkbox" className="size-[15px] cursor-pointer hover:color-[#1447E6]" />
                        <p className="ml-[5px] text-[18px]">Buổi tối 18:00 - 00:00</p>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start mt-[10px]">
                    <h2 className="font-medium text-[18px]">Loại xe</h2>
                    <div className="w-full flex flex-row">
                        <p className="px-[10px] py-[5px] rounded-[5px]" style={{borderColor: '#ccc', borderStyle: 'solid', borderWidth: '1px'}}>Thường</p>
                        <p className="px-[10px] py-[5px] rounded-[5px] mx-[10px]" style={{borderColor: '#ccc', borderStyle: 'solid', borderWidth: '1px'}}>VIP</p>
                        <p className="px-[10px] py-[5px] rounded-[5px]" style={{borderColor: '#ccc', borderStyle: 'solid', borderWidth: '1px'}}>Limousine</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
