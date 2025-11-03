import { useEffect, useState } from 'react'
import type { Province } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setTrips } from '../redux/tripSlice'

const SearchTrip = () => {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [currentPStart, setCurrentPStart] = useState<number>(0)
    const [currentPEnd, setCurrentPEnd] = useState<number>(0)
    const [date, setDate] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const getProvinces = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // console.log(res.data)
            setProvinces(res.data)
        })
        .catch((error) => {
            // alert('Error when get provinces!')
            console.log(error)
        })
    }

    const handleSearch = async () => {
        // const dt = new Date(datetime).toISOString()
        console.log(currentPStart, currentPEnd, date)
        const st = `${date}T00:00:00.000Z`
        const et = `${date}T23:59:59.000Z`

        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips?departureTime.greaterThan=${st}&departureTime.lessThan=${et}&originProvinceCode.equals=${currentPStart}&destinationProvinceCode.equals=${currentPEnd}`, {
            params: {
                'page': '0',
                'size': '200',
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setTrips(res.data))
        })
        .catch((error) => {
            alert('Error when search trip!')
            console.log(error)
        })
    }
    
    useEffect(() => {
        getProvinces()
    }, [])

    // useEffect(() => {
    //     setPStart(provinces.find(p => p.provinceCode === currentPStart))
    //     setPEnd(provinces.find(p => p.provinceCode === currentPEnd))
    //     console.log(pStart, pEnd)
    // }, [currentPStart, currentPEnd])

    return (
        <div className='flex flex-col'>
            <div className='w-[55vw] h-[15vh] flex flex-row justify-between mx-[20px] my-[20px] shadow-lg shadow-blue-500/50 rounded-[10px] p-[10px]'>
                <div className="w-[24%] flex flex-col items-start justify-end">
                    <p>Điểm đi</p>
                    <select className='w-full p-[15px] rounded-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                        onChange={(e) => {
                            setCurrentPStart(Number(e.target.value))
                        }}>
                        { 
                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                                <option key={province.id} value={province.provinceCode}>{province.name}</option>
                            ))
                        } 
                    </select>
                </div>
                <div className="w-[24%] flex flex-col items-start justify-end">
                    <p>Điểm đến</p>
                    <select className='w-full p-[15px] rounded-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                        onChange={(e) => setCurrentPEnd(Number(e.target.value))}>
                        { 
                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                                <option key={province.id} value={province.provinceCode}>{province.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="w-[20%] flex flex-col items-start justify-end">
                    <p>Ngày đi</p>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='w-full p-[15px] rounded-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                </div>
                <div className="w-[25%] h-full flex flex-row items-end">
                    <button className='w-full h-[60%] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => handleSearch()}>Tìm kiếm</button>
                </div>
            </div>
        </div>
    )
}

export default SearchTrip
