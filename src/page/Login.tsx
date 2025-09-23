import React, { useState } from 'react'
import adminicon from '../assets/adminicon.png'
import emailicon from '../assets/emailicon.png'
import pwdicon from '../assets/pwdicon.png'
import eyeicon from '../assets/eyeicon.png'

const Login = () => {
    const [hide, setHide] = useState<boolean>(true)

    return (
        <div className='w-full h-[100vh] flex flex-col items-center justify-center bg-gray-100'>
            <div className='flex flex-col items-center bg-white rounded-[10px] p-[20px]' style={{borderStyle: 'solid', borderWidth: 2, borderColor: '#ccc'}}>
                <img src={adminicon} className='size-[50px] mb-[10px]' />
                <h2 className='font-bold text-[20px]'>Chào mừng đến với RideHub Admin</h2>
                <p>Vui lòng nhập email và mật khẩu để quản lý</p>
                <div className='w-full flex flex-col mt-[10px]'>
                    <p className='text-left mb-[5px]'>Email</p>
                    <div className='flex flex-row items-center mb-[10px] relative'>
                        <img src={emailicon} className='size-[20px] absolute left-2' />
                        <input type='email' className='w-full py-[5px] px-[30px] rounded-[10px]' style={{borderStyle: 'solid', borderWidth: 2, borderColor: '#ccc'}} />
                    </div>
                    <p className='text-left mb-[5px]'>Mật khẩu</p>
                    <div className=' flex flex-row items-center relative'>
                        <img src={pwdicon} className='size-[20px] left-2 absolute' />
                        <img src={eyeicon} className='size-[20px] absolute right-2 cursor-pointer' onClick={() => setHide(!hide)} />
                        <input type={`${hide ? 'password' : 'text'}`} className='w-full py-[5px] px-[30px] rounded-[10px]' style={{borderStyle: 'solid', borderWidth: 2, borderColor: '#ccc'}}/>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center my-[10px]'>
                    <div className='flex flex-row items-center'>
                        <input type="checkbox" className='size-[15px] mx-[5px]' name="" id="" />
                        <p>Ghi nhớ</p>
                    </div>
                    {/* <p className='text-[#1447E6] font-bold cursor-pointer hover:underline'>Quên mật khẩu?</p> */}
                </div>
                <button className='w-full bg-[#1447E6] text-white py-[10px] rounded-[10px] cursor-pointer'>Đăng nhập ngay</button>
                <p className='mt-[10px]'>Cần tài khoản quản trị? <span className='text-[#1447E6] font-bold cursor-pointer hover:underline'>Liên hệ với RideHub</span></p>
            </div>
        </div>
    )
}

export default Login
