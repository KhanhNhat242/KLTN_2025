import React, { useEffect, useState } from 'react'
import type { Province } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setRoutes } from '../redux/routeSlice'
import type { RootState } from '../redux/store'

const SearchRoute = () => {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [currentPStart, setCurrentPStart] = useState<number>(0)
    const [currentPEnd, setCurrentPEnd] = useState<number>(0)

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
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/routes?originProvinceCode.equals=${currentPStart}&destinationProvinceCode.equals=${currentPEnd}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            } 
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setRoutes(res.data))
        })
        .catch((error) => {
            // alert('Error when get provinces!')
            console.log(error)
        })
    }

    useEffect(() => {
        getProvinces()
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='w-[40vw] h-[15vh] flex flex-row justify-between items-end mx-[20px] my-[20px] shadow-lg shadow-blue-500/50 rounded-[10px] p-[10px]'>
                <div className="w-[30%] flex flex-col items-start justify-end">
                    <p>Điểm đi</p>
                    <select className='w-full p-[15px] rounded-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                        onChange={(e) => {
                            setCurrentPStart(Number(e.target.value))
                        }}>
                        <option>Chọn điểm đi</option>
                        { 
                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => {
                                if (province.id >= 1500)
                                return <option key={province.id} value={province.provinceCode}>{province.name}</option>
                            })
                        } 
                    </select>
                </div>
                <div className="w-[30%] flex flex-col items-start justify-end">
                    <p>Điểm đến</p>
                    <select className='w-full p-[15px] rounded-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                        onChange={(e) => setCurrentPEnd(Number(e.target.value))}>
                        <option>Chọn điểm đến</option>
                        { 
                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => {
                                if (province.id >= 1500)
                                return <option key={province.id} value={province.provinceCode}>{province.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="w-[30%] h-full flex flex-row items-end">
                    <button className='w-full h-[6vh] p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => handleSearch()}>Tìm kiếm</button>
                </div>
            </div>
        </div>
    )
}

export default SearchRoute
