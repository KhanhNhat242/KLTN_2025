import { useEffect } from 'react'
import drivericon from '../assets/drivericon.png'
import Seat from './Seat'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

interface Props {
    isLimousine: boolean
}

const SeatMap = ({ isLimousine }: Props) => {
    // const [seatList, setSeatList] = useState<string[]>([])

    const seatList = useSelector((state: RootState) => state.seatList)

    useEffect(() => {
        console.log(seatList)
    }, [seatList])

    return (
        <div className={`pt-[10px] pl-[10px] pb-[10px] pr-[20px] flex flex-row ${isLimousine ? 'w-[60%]' : 'w-[70%]' }`} style={{borderStyle: 'solid', borderRightColor: '#000', borderRightWidth: 2}}>
            <div className='w-[50%] flex flex-col pr-[10px]' style={{borderStyle: 'solid', borderRightColor: '#ccc', borderRightWidth: 2}}>
                <div className='w-full mb-[10px] flex flex-row justify-between items-center'>
                    <img src={drivericon} className='size-[40px]' />
                    <h2 className='font-bold text-gray'>Tầng dưới</h2>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Seat value='1A01' status={0} />
                        <Seat value='1A02' status={0} />
                        <Seat value='1A03' status={0} />
                        <Seat value='1A04' status={0} />
                        <Seat value='1D01' status={0} />
                    </div>
                    <div className='flex flex-col'>
                        <Seat value='1B01' status={0} />
                        <Seat value='1B02' status={0} />
                        <Seat value='1B03' status={0} />
                        <Seat value='1B04' status={0} />
                        <Seat value='1D02' status={0} />
                        <Seat value='1E04' status={0} />
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        <Seat value='1C01' status={0} />
                        <Seat value='1C02' status={0} />
                        <Seat value='1C03' status={0} />
                        <Seat value='1C04' status={0} />
                        <Seat value='1D03' status={0} />
                    </div>
                </div>
            </div>
            <div className='w-[50%] pl-[10px]'>
                <h2 className='h-[40px] font-bold text-right mb-[10px] pt-[10px] text-gray'>Tầng trên</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Seat value='2A01' status={0} />
                        <Seat value='2A02' status={0} />
                        <Seat value='2A03' status={0} />
                        <Seat value='2A04' status={0} />
                        <Seat value='D04' status={0} />
                        <Seat value='2E01' status={0} />
                    </div>
                    <div className='flex flex-col'>
                        <Seat value='2B01' status={0} />
                        <Seat value='2B02' status={0} />
                        <Seat value='2B03' status={0} />
                        <Seat value='2B04' status={0} />
                        <Seat value='2D02' status={0} />
                        <Seat value='2E02' status={0} />
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        <Seat value='2C01' status={0} />
                        <Seat value='2C02' status={0} />
                        <Seat value='2C03' status={0} />
                        <Seat value='2C04' status={0} />
                        <Seat value='D04' status={0} />
                        <Seat value='2E03' status={0} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatMap
