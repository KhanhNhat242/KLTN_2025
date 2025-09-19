import React from 'react'
import { useNavigate } from 'react-router-dom'
import busicon from '../assets/busicon.png'
import seaticon from '../assets/seaticon.png'
import moneyicon from '../assets/moneyicon.png'
import Header from '../components/Header'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-[80%] h-full p-[10px] mt-[10%] flex flex-row bg-[#ccc]'>
                <div className='w-full h-[30%] flex flex-col items-center cursor-pointer' onClick={() => navigate('/trip')}>
                    <img src={busicon} className='size-[50px] mr-[10px]' />
                    <h2 className='text-[20px] font-bold'>Quản lý thông tin tuyến xe</h2>
                    <p>Quản lý thông tin lịch trình, thời gian, địa điểm lên xe và xuống xe</p>
                </div>
                <div className='w-full h-[20%] flex flex-col items-center cursor-pointer' onClick={() => navigate('/seat')}>
                    <img src={seaticon} className='size-[50px] mr-[10px]' />
                    <h2 className='text-[20px] font-bold'>Quản lý thông tin vị trí chỗ ngồi của các loại xe</h2>
                    <p>Quản lý số lượng vị trí chỗ ngồi, trạng thái chỗ ngồi (đã đặt/còn trống) theo thời gian thực</p>
                </div>
                <div className='w-full h-[20%] flex flex-col items-center cursor-pointer' onClick={() => navigate('/ticket')}>
                    <img src={moneyicon} className='size-[50px] mr-[10px]' />
                    <h2 className='text-[20px] font-bold'>Quản lý đơn giá vé & dịch vụ</h2>
                    <p>Quản lý thông tin giá vé, thông tin khuyến mãi, đơn giá dịch vụ đi kèm</p>
                </div>
            </div>
        </div>
    )
}

export default Home
