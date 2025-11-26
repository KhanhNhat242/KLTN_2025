import { useEffect, useState } from 'react'
import drivericon from '../assets/drivericon.png'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { reset } from '../redux/seatListSlice'
import axios from 'axios'
import Seat from './Seat'
import type { Seat as SeatType } from '../interface/Interface'

interface Props {
    isLimousine: boolean,
    tripID: number | undefined,
}

const seats_col1 = [
    { seatno: '1A01', isLock: false },
    { seatno: '1A02', isLock: false },
    { seatno: '1A03', isLock: false },
    { seatno: '1A04', isLock: false },
    { seatno: '1D01', isLock: false },
]

const seats_col2 = [
    { seatno: '1B01', isLock: false },
    { seatno: '1B02', isLock: false },
    { seatno: '1B03', isLock: false },
    { seatno: '1B04', isLock: false },
    { seatno: '1D02', isLock: false },
    { seatno: '1E04', isLock: false },
]

const seats_col3 = [
    { seatno: '1C01', isLock: false },
    { seatno: '1C02', isLock: false },
    { seatno: '1C03', isLock: false },
    { seatno: '1C04', isLock: false },
    { seatno: '1D03', isLock: false },
]

const seats_col4 = [
    { seatno: '2A01', isLock: false },
    { seatno: '2A02', isLock: false },
    { seatno: '2A03', isLock: false },
    { seatno: '2A04', isLock: false },
    { seatno: '2D01', isLock: false },
    { seatno: '2E01', isLock: false },
]

const seats_col5 = [
    { seatno: '2B01', isLock: false },
    { seatno: '2B02', isLock: false },
    { seatno: '2B03', isLock: false },
    { seatno: '2B04', isLock: false },
    { seatno: '2D02', isLock: false },
    { seatno: '2E02', isLock: false },
]

const seats_col6 = [
    { seatno: '2C01', isLock: false },
    { seatno: '2C02', isLock: false },
    { seatno: '2C03', isLock: false },
    { seatno: '2C04', isLock: false },
    { seatno: '2D03', isLock: false },
    { seatno: '2E03', isLock: false },
]

const SeatMap = ({ isLimousine, tripID }: Props) => {
    const [seatmap, setSeatMap] = useState<SeatType[]>([])
    const [sl, setSl] = useState<string[]>([])
    const [cols, setCols] = useState({
        c1: seats_col1,
        c2: seats_col2,
        c3: seats_col3,
        c4: seats_col4,
        c5: seats_col5,
        c6: seats_col6,
    })

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const seatList = useSelector((state: RootState) => state.seatList)
    const dispatch = useDispatch()

    const getTrip = async () => {
        if (tripID) {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${tripID}/detail`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            })
            .then((res) => {
                // console.log('get trip', res.data.tripDTO)
                // console.log('seat list', res.data.seatLockDTOs)
                setSeatMap(res.data.seatLockDTOs)
            })
            .catch(() => {
                console.log('Get trip fail!')
            })
        }
    }

    useEffect(() => {
        if (seatList.length > 0) {
            dispatch(reset())
        }
        console.log('tripid', tripID)
        getTrip()
    }, [])

    useEffect(() => {
        // console.log('state', seatmap)
        setSl(seatmap.map(s => s.seatNo))
    }, [seatmap])

    useEffect(() => {
        // console.log('state', sl)
        setCols(prev => ({
            c1: prev.c1.map(s => ({ ...s, isLock: sl.includes(s.seatno) })),
            c2: prev.c2.map(s => ({ ...s, isLock: sl.includes(s.seatno) })),
            c3: prev.c3.map(s => ({ ...s, isLock: sl.includes(s.seatno) })),
            c4: prev.c4.map(s => ({ ...s, isLock: sl.includes(s.seatno) })),
            c5: prev.c5.map(s => ({ ...s, isLock: sl.includes(s.seatno) })),
            c6: prev.c6.map(s => ({ ...s, isLock: sl.includes(s.seatno) })),
        }))
        // console.log('column', cols)
    }, [sl])

    return (
        <div className={`pt-[10px] pl-[10px] pb-[10px] pr-[20px] flex flex-row ${isLimousine ? 'w-[60%]' : 'w-[70%]' }`} style={{borderStyle: 'solid', borderRightColor: '#000', borderRightWidth: 2}}>
            <div className='w-[50%] flex flex-col pr-[10px]' style={{borderStyle: 'solid', borderRightColor: '#ccc', borderRightWidth: 2}}>
                <div className='w-full mb-[10px] flex flex-row justify-between items-center'>
                    <img src={drivericon} className='size-[40px]' />
                    <h2 className='font-bold text-gray'>Tầng dưới</h2>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        {cols.c1.map((s) => (
                            <Seat key={s.seatno} value={s.seatno} isLock={s.isLock} />
                        ))}
                    </div>
                    <div className='flex flex-col'>
                        {cols.c2.map((s) => (
                            <Seat key={s.seatno} value={s.seatno} isLock={s.isLock} />
                        ))}
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        {cols.c3.map((s) => (
                            <Seat key={s.seatno} value={s.seatno} isLock={s.isLock} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-[50%] pl-[10px]'>
                <h2 className='h-[40px] font-bold text-right mb-[10px] pt-[10px] text-gray'>Tầng trên</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        {cols.c4.map((s) => (
                            <Seat key={s.seatno} value={s.seatno} isLock={s.isLock} />
                        ))}
                    </div>
                    <div className='flex flex-col'>
                        {cols.c5.map((s) => (
                            <Seat key={s.seatno} value={s.seatno} isLock={s.isLock} />
                        ))}
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        {cols.c6.map((s) => (
                            <Seat key={s.seatno} value={s.seatno} isLock={s.isLock} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatMap
