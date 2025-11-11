import mainlogo from '../assets/mainlogo.png'
import dashboardicon from '../assets/dashboardicon.png'
import tripicon from '../assets/tripicon.png'
import ticketicon from '../assets/ticketicon.png'
import customericon from '../assets/customericon.png'
import paymenticon from '../assets/paymenticon.png'
import promotionicon from '../assets/promotionicon.png'
import stafficon from '../assets/stafficon.png'
import upcollapseicon from '../assets/upcollapseicon.png'
import downcollapseicon from '../assets/downcollapseicon.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Trip = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full flex flex-col items-start pl-[30px]'>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/route')}>Tuyến xe</p>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/bus')}>Danh sách xe</p>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/station')}>Trạm đón/trả</p>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/trip')}>Lịch trình (Trips)</p>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/schedule')}>Lịch trình (Chu kỳ)</p>
        </div>
    )
}

const Ticket = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full flex flex-col items-start pl-[30px]'>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/ticket-price')}>Quản lý bảng giá vé</p>
            <p className='p-[5px] cursor-pointer' onClick={() => navigate('/ticket')}>Quản lý vé (Hóa đơn)</p>
        </div>
    )
}

const Header = () => {
    const [count, setCount] = useState<number>(0)
    const navigate = useNavigate()

    return (
        <div className='w-[20%] h-[100vh] flex flex-col justify-start items-start bg-white ml-[10px]'>
            <img src={mainlogo} alt="admin-logo" className='w-[50%] h-[50px] p-[10px]' />
            <div className='w-full'>
                <div className='w-full flex flex-row items-center p-[10px] cursor-pointer' onClick={() => navigate('/')}>
                    <img src={dashboardicon} className='mr-[10px]' />
                    <p>Tổng quát</p>
                </div>
                <div className='w-full flex flex-row justify-between items-center p-[10px] cursor-pointer' onClick={() => count === 2 ? setCount(0) : setCount(2)}>
                    <div className='flex flex-row'>
                        <img src={tripicon} className='mr-[10px]' />
                        <p>Chuyến xe</p>
                    </div>
                    <img src={count === 2 ? upcollapseicon : downcollapseicon} />
                </div>
                {count === 2 && <Trip />}
                <div className='w-full flex flex-row justify-between items-center p-[10px] cursor-pointer'  onClick={() => count === 3 ? setCount(0) : setCount(3)}>
                    <div className='flex flex-row'>
                        <img src={ticketicon} className='mr-[10px]' />
                        <p>Quản lý vé</p>
                    </div>
                    <img src={count === 3 ? upcollapseicon : downcollapseicon} />
                </div>
                {count === 3 && <Ticket />}
                <div className='w-full flex flex-row justify-between items-center p-[10px] cursor-pointer'>
                    <div className='flex flex-row'>
                        <img src={customericon} className='mr-[10px]' />
                        <p>Khách hàng</p>
                    </div>
                    <img src={downcollapseicon} />
                </div>
                <div className='w-full flex flex-row justify-between items-center p-[10px] cursor-pointer'>
                    <div className='flex flex-row' onClick={() => navigate('/payment')}>
                        <img src={paymenticon} className='mr-[10px]' />
                        <p>Thanh toán</p>
                    </div>
                    <img src={downcollapseicon} />
                </div>
                <div className='w-full flex flex-row justify-between items-center p-[10px] cursor-pointer' onClick={() => navigate('/promotion')}>
                    <div className='flex flex-row'>
                        <img src={promotionicon} className='mr-[10px]' />
                        <p>Giá vé & Khuyến mãi</p>
                    </div>
                    {/* <img src={downcollapseicon} /> */}
                </div>
                <div className='w-full flex flex-row justify-between items-center p-[10px] cursor-pointer'>
                    <div className='flex flex-row'>
                        <img src={stafficon} className='mr-[10px]' />
                        <p>Nhân viên</p>
                    </div>
                    <img src={downcollapseicon} />
                </div>
            </div>
        </div>
    )
}

export default Header
