import { useDispatch } from "react-redux"
import type { Attendant, Bus, BuyNGetM, Driver, PercentOff, Promotion, Route, Schedule, Station, Trip } from "../interface/Interface"
import { remove as remove1 } from "../redux/stationSlice"
import { remove as remove2 } from "../redux/routeSlice"
import { remove as remove3 } from "../redux/busSlice"
import { remove as remove4 } from "../redux/tripSlice"
import { remove as remove5 } from "../redux/scheduleSlice"
import { remove as remove6 } from "../redux/promotionsSlice"
import { remove as remove7 } from "../redux/buyNGetMSlice"
import { remove as remove8 } from "../redux/percentOffSlice"
import { remove as remove9 } from "../redux/driverSlice"
import { remove as remove10 } from "../redux/attendantSlice"

interface Props {
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>,
    station?: Station,
    route?: Route,
    vehicle?: Bus,
    trip?: Trip,
    schedule?: Schedule,
    promotion?: Promotion,
    buyngetm?: BuyNGetM,
    percentoff?: PercentOff,
    driver?: Driver,
    attendant?: Attendant,
}

const DeleteModal = ({ setIsDelete, station, route, vehicle, trip, schedule, promotion, buyngetm, percentoff, driver, attendant}: Props) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        if (station) {
            dispatch(remove1(station.id))
        }
        else if (route) {
            dispatch(remove2(route.id))
        }
        else if (vehicle) {
            dispatch(remove3(vehicle.id))
        }
        else if (trip) {
            dispatch(remove4(trip.id))
        }
        else if (schedule) {
            dispatch(remove5(schedule.id))
        }
        else if (promotion) {
            dispatch(remove6(promotion.id))
        }
        else if (buyngetm) {
            dispatch(remove7(buyngetm.id))
        }
        else if (percentoff) {
            dispatch(remove8(percentoff.id))
        }
        else if (driver) {
            dispatch(remove9(driver.id))
        }
        else if (attendant) {
            dispatch(remove10(attendant.id))
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsDelete(false)}></div>
            <div className="w-[25%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white sm:p-6 sm:pb-4">
                    <div className="mt-3">
                        <h3 id="dialog-title" className="text-left text-[20px] mb-[10px] font-bold text-gray">Bạn có chắc chắn muốn xóa thông tin này?</h3>
                        {/* <div className='w-full flex flex-col'>
                            
                        </div> */}
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsDelete(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                        onClick={() => {
                            handleDelete()
                            setIsDelete(false)
                            }
                        }>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
