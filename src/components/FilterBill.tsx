import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import trashicon from '../assets/trashicon.png'
import { setBills } from '../redux/billSlice'

const FilterBill = () => {
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const handleFilter = async () => {
        const st = `${startDate}T00:00:00.000Z`
        const et = `${endDate}T23:59:59.000Z`
        console.log(st, et)
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings?bookedAt.greaterThan=${st}&bookedAt.lessThan=${et}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setBills(res.data))
        })
        .catch((error) => {
            alert('Error when filter booking!')
            console.log(error)
        })
    }

    const getData = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings?page=0&size=10&sort=bookedAt%2Cdesc', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setBills(res.data))
        })
        .catch(() => {
            console.log('Get payment-transactions fail!')
        })
    }

    return (
        <div className='flex flex-col'>
            <div className='w-[40vw] h-[10vh] flex flex-row justify-between mx-[20px] my-[20px] shadow-lg shadow-blue-500/50 rounded-[10px] p-[10px]'>
                <div className="h-full flex flex-row items-center">
                    <p>Từ ngày:</p>
                    <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" className='px-[10px] py-[5px] rounded-[5px] ml-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                </div>
                <div className="h-full flex flex-row items-center">
                    <p>Đến ngày:</p>
                    <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" className='px-[10px] py-[5px] rounded-[5px] ml-[5px] mt-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                </div>
                <div className="w-[25%] h-full flex flex-row justify-between items-center">
                    <div className="w-[48%] flex flex-row items-center cursor-pointer hover:text-[#1447E6]" onClick={() => getData()}>
                        <p>Xóa lọc</p>
                        <img src={trashicon} className="size-[20px]" />
                    </div>
                    <button className='w-[48%] h-[5vh] px-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => handleFilter()}>Lọc</button>
                </div>
            </div>
        </div>
    )
}

export default FilterBill
