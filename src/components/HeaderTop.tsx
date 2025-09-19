import notificationicon from '../assets/notificationicon.png'
import adminicon from '../assets/adminicon.png'
import Search from './Search'

const HeaderTop = () => {
    return (
      <div className='w-full flex flex-row justify-between'>
        <Search placeholder='Tìm vé, khách hàng, chuyến xe…' />
        <div className='flex flex-row'>
          <img src={notificationicon} className='size-[30px] mr-[10px]' />
          <img src={adminicon} className='size-[30px]' />
        </div>
      </div>
    )
}

export default HeaderTop
