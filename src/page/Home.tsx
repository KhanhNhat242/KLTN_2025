import Header from "../components/Header"
import SearchTrip from "../components/SearchTrip"
import starticon from '../assets/starticon.png'
import endicon from '../assets/endicon.png'
import trashicon from '../assets/trashicon.png'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import type { Trip } from "../interface/Interface"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [currentSelect, setCurrentSelect] = useState<number>(0)
    const [tripsFilter, setTripsFilter] = useState<Trip[]>([])

    const isLogin = useSelector((state: RootState) => state.auth.isLogin)
    const trips = useSelector((state: RootState) => state.trips)
    const navigate = useNavigate()

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${hours}:${minutes}`
    }

    const formatTimestampCompare = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return {
            hour: hours,
            minute: minutes,
        }
    }

    const handleFilter = () => {
        if (currentSelect !== 0) {
            if (currentSelect === 1) {
                setTripsFilter(
                    trips.filter((t) => Number(formatTimestampCompare(Number(t.departureTime)).hour) > 0 && Number(formatTimestampCompare(Number(t.departureTime)).hour) < 6)
                )
            }
            else if (currentSelect === 2) {
                setTripsFilter(
                    trips.filter((t) => Number(formatTimestampCompare(Number(t.departureTime)).hour) >= 6 && Number(formatTimestampCompare(Number(t.departureTime)).hour) < 12)
                )
            }
            else if (currentSelect === 3) {
                setTripsFilter(
                    trips.filter((t) => Number(formatTimestampCompare(Number(t.departureTime)).hour) >= 12 && Number(formatTimestampCompare(Number(t.departureTime)).hour) < 18)
                )
            }
            else if (currentSelect === 4) {
                setTripsFilter(
                    trips.filter((t) => Number(formatTimestampCompare(Number(t.departureTime)).hour) >= 18 && Number(formatTimestampCompare(Number(t.departureTime)).hour) < 24)
                )
            }
            else if (currentSelect === 5) {
                const now = new Date()
                setTripsFilter(
                    trips.filter((t) => now.getHours() >= Number(formatTimestampCompare(Number(t.departureTime)).hour) && now.getHours() <= Number(formatTimestampCompare(Number(t.arrivalTime)).hour)))
            }
            else if (currentSelect === 6) {
                const now = new Date()
                setTripsFilter(
                    trips.filter((t) => now.getHours() > Number(formatTimestampCompare(Number(t.arrivalTime)).hour)))
            }
            else if (currentSelect === 7) {
                const now = new Date()
                setTripsFilter(
                    trips.filter((t) => now.getHours() < Number(formatTimestampCompare(Number(t.departureTime)).hour)))
            }
        }
    }

    useEffect(() => {
        console.log(isLogin)
        if (isLogin === false) {
            navigate('/log-in')
        }
    }, [])

    useEffect(() => {
        handleFilter()
    }, [currentSelect])

    return (
        <div className="w-full flex flex-row">
            <Header />
            <div>
                <SearchTrip />
                <div className="grid grid-cols-2">
                    {currentSelect === 0 ? trips.map((trip) => (
                        <div key={trip.id} className="flex flex-col items-end p-[10px] mx-[20px] shadow-lg shadow-gray-500/50 rounded-[10px]">
                            <div className="w-full flex flex-col justify-between">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <h2 className="font-medium text-[20px]">{formatTimestamp(Number(trip.departureTime))}</h2>
                                    <div className="w-[80%] flex flex-row items-center mx-[5px]">
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
                            <button className='w-[8vw] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => navigate('/payment', { state: {tripID: trip.id, vehicleID: trip.vehicle.id} })}>Chọn chuyến</button>
                        </div>
                    ))
                : tripsFilter.map((trip) => (
                        <div key={trip.id} className="flex flex-col items-end p-[10px] mx-[20px] shadow-lg shadow-gray-500/50 rounded-[10px]">
                            <div className="w-full flex flex-col justify-between">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <h2 className="font-medium text-[20px]">{formatTimestamp(Number(trip.departureTime))}</h2>
                                    <div className="w-[80%] flex flex-row items-center mx-[5px]">
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
                            <button className='w-[8vw] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => navigate('/payment', { state: {tripData: trip, vehicleID: trip.vehicle.id} })}>Chọn chuyến</button>
                        </div>
                    )
                )
                }
                </div>
            </div>
            <div className="w-[25vw] h-[40vh] mt-[10px] flex flex-col p-[10px] shadow-lg shadow-gray-500/50 rounded-[10px]">
                <div className="w-full flex flex-row justify-between items-center mb-[10px]">
                    <h2 className="font-bold text-[20px]">Bộ lọc tìm kiếm</h2>
                    <div className="flex flex-row items-center cursor-pointer hover:text-[#1447E6]" onClick={() => setCurrentSelect(0)}>
                        <p>Xóa lọc</p>
                        <img src={trashicon} className="size-[20px]" />
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <h2 className="font-medium text-[18px]">Giờ đi</h2>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 1} value={1} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Sáng sớm 00:00 - 06:00</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 2} value={2} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Nuổi sáng 6:00 - 12:00</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 3} value={3} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Buổi chiều 12:00 - 18:00</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 4} value={4} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Buổi tối 18:00 - 00:00</p>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <p className="font-medium text-[18px]">Trạng thái</p>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 5} value={5} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Đang diễn ra</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 6} value={6} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Đã kết thúc</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input type="radio" name="time" className="size-[15px] cursor-pointer hover:color-[#1447E6]" checked={currentSelect === 7} value={7} onChange={(e) => setCurrentSelect(Number(e.target.value))} />
                        <p className="ml-[5px] text-[18px]">Chưa bắt đầu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
