import adminicon from '../assets/adminicon.png'
import logouticon from '../assets/logouticon.png'
import { useNavigate } from 'react-router-dom'

const HeaderTop = () => {

  const navigate = useNavigate()

  return (
    <div className='w-full flex flex-row justify-end'>
      {/* <Search placeholder='Tìm vé, khách hàng, chuyến xe…' /> */}
      <div className='flex flex-row'>
        <div className='flex flex-row items-center cursor-pointer hover:underline' onClick={() => navigate('/log-in')}>
          <h2>Đăng xuất</h2>
          <img src={logouticon} className='size-[30px] mr-[10px]' />
        </div>
        <img src={adminicon} className='size-[30px]' />
      </div>
    </div>
  )
}

export default HeaderTop
