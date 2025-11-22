import { useEffect, useState } from 'react'
import drivericon from '../assets/drivericon.png'
import Seat from './Seat'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { reset } from '../redux/seatListSlice'
import axios from 'axios'
import type { Seat as tSeat } from '../interface/Interface'

interface Props {
    isLimousine: boolean,
    tripID: number | undefined,
}

const seats = [
    { seatno: '1A01', status: 0 },
  { seatno: '1A02', status: 0 },
  { seatno: '1A03', status: 0 },
  { seatno: '1A04', status: 0 },

  { seatno: '1B01', status: 0 },
  { seatno: '1B02', status: 0 },
  { seatno: '1B03', status: 0 },
  { seatno: '1B04', status: 0 },

  { seatno: '1C01', status: 0 },
  { seatno: '1C02', status: 0 },
  { seatno: '1C03', status: 0 },
  { seatno: '1C04', status: 0 },

  { seatno: '1D01', status: 0 },
  { seatno: '1D02', status: 0 },
  { seatno: '1D03', status: 0 },

  { seatno: '1E04', status: 0 },

  { seatno: '2A01', status: 0 },
  { seatno: '2A02', status: 0 },
  { seatno: '2A03', status: 0 },
  { seatno: '2A04', status: 0 },

  { seatno: '2B01', status: 0 },
  { seatno: '2B02', status: 0 },
  { seatno: '2B03', status: 0 },
  { seatno: '2B04', status: 0 },

  { seatno: '2C01', status: 0 },
  { seatno: '2C02', status: 0 },
  { seatno: '2C03', status: 0 },
  { seatno: '2C04', status: 0 },

  { seatno: '2D01', status: 0 },
  { seatno: '2D02', status: 0 },
  { seatno: '2D03', status: 0 },

  { seatno: '2E01', status: 0 },
  { seatno: '2E02', status: 0 },
  { seatno: '2E03', status: 0 },
]

const SeatMap = ({ isLimousine, tripID }: Props) => {
    const [seatLock, setSeatLock] = useState<tSeat[]>([])
    const [seatProp, setSeatProp] = useState<string[]>([])

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
                console.log('seat list', res.data.seatLockDTOs)
                setSeatLock(res.data.seatLockDTOs)
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
        console.log(seatList)
    }, [seatList])

    useEffect(() => {
        const s = seatLock.map(sl => sl.seatNo)
        // console.log(s)
        seats.forEach(s1 => {
            s.forEach(s2 => {
                if (s1.seatno === s2) {
                    s1.status = 1
                }
            })
        })
        // setSeatProp(seats.filter(item => item.status === 1).map(item => item.seatno))
        // console.log('seat prop', seatProp)
    }, [seatLock])

    return (
        <div className={`pt-[10px] pl-[10px] pb-[10px] pr-[20px] flex flex-row ${isLimousine ? 'w-[60%]' : 'w-[70%]' }`} style={{borderStyle: 'solid', borderRightColor: '#000', borderRightWidth: 2}}>
            <div className='w-[50%] flex flex-col pr-[10px]' style={{borderStyle: 'solid', borderRightColor: '#ccc', borderRightWidth: 2}}>
                <div className='w-full mb-[10px] flex flex-row justify-between items-center'>
                    <img src={drivericon} className='size-[40px]' />
                    <h2 className='font-bold text-gray'>Tầng dưới</h2>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Seat value='1A01' seats={seats} />
                        <Seat value='1A02' seats={seats} />
                        <Seat value='1A03' seats={seats} />
                        <Seat value='1A04' seats={seats} />
                        <Seat value='1D01' seats={seats} />
                    </div>
                    <div className='flex flex-col'>
                        <Seat value='1B01' seats={seats} />
                        <Seat value='1B02' seats={seats} />
                        <Seat value='1B03' seats={seats} />
                        <Seat value='1B04' seats={seats} />
                        <Seat value='1D02' seats={seats} />
                        <Seat value='1E04' seats={seats} />
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        <Seat value='1C01' seats={seats} />
                        <Seat value='1C02' seats={seats} />
                        <Seat value='1C03' seats={seats} />
                        <Seat value='1C04' seats={seats} />
                        <Seat value='1D03' seats={seats} />
                    </div>
                </div>
            </div>
            <div className='w-[50%] pl-[10px]'>
                <h2 className='h-[40px] font-bold text-right mb-[10px] pt-[10px] text-gray'>Tầng trên</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Seat value='2A01' seats={seats} />
                        <Seat value='2A02' seats={seats} />
                        <Seat value='2A03' seats={seats} />
                        <Seat value='2A04' seats={seats} />
                        <Seat value='2D01' seats={seats} />
                        <Seat value='2E01' seats={seats} />
                    </div>
                    <div className='flex flex-col'>
                        <Seat value='2B01' seats={seats} />
                        <Seat value='2B02' seats={seats} />
                        <Seat value='2B03' seats={seats} />
                        <Seat value='2B04' seats={seats} />
                        <Seat value='2D02' seats={seats} />
                        <Seat value='2E02' seats={seats} />
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        <Seat value='2C01' seats={seats} />
                        <Seat value='2C02' seats={seats} />
                        <Seat value='2C03' seats={seats} />
                        <Seat value='2C04' seats={seats} />
                        <Seat value='2D03' seats={seats} />
                        <Seat value='2E03' seats={seats} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatMap
