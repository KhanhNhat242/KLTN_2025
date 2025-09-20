import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import wifiicon from '../assets/wifiicon.png'
import batteryicon from '../assets/batteryicon.png'
import airconditionericon from '../assets/airconditionericon.png'
import towelicon from '../assets/towelicon.png'
import hammericon from '../assets/hammericon.png'
import blanketicon from '../assets/blanketicon.png'
import bottleicon from '../assets/bottleicon.png'
import Free from '../components/Free'

const BusDetail = () => {
  return (
    <div className='w-full flex flex-row'>
        <Header />
        <div className='w-full p-[10px] bg-gray-100'>
            <HeaderTop />
            <h2 className='text-[20px] text-left font-bold mt-[10px]'>Danh sách khuyến mãi</h2>
            <p className='text-left mb-[10px]'>Tuyến: HCM – An Giang</p>
            <div className='w-full flex flex-row'>
                <div className='w-[30%] bg-white mr-[10px] p-[10px] rounded-[10px]'>
                    <div className='w-full flex flex-row justify-between' style={{borderStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: 2}}>
                        <h2 className='font-bold pb-[10px]'>Thông tin xe</h2>
                        <p>Hoạt động</p>
                    </div>
                    <div className='w-full flex flex-row justify-between pt-[10px]'>
                        <p>Tài xế chính:</p>
                        <p className='font-bold'>Nguyễn Văn A</p>
                    </div>
                    <div className='w-full flex flex-row justify-between'>
                        <p>Biển số:</p>
                        <p className='font-bold'>51B-12333</p>
                    </div>
                    <div className='w-full flex flex-row justify-between'>
                        <p>Loại xe:</p>
                        <p className='font-bold'>Limousine</p>
                    </div>
                    <div className='w-full flex flex-row justify-between'>
                        <p>Số ghế:</p>
                        <p className='font-bold'>10</p>
                    </div>
                    <div className='w-full flex flex-row justify-between'>
                        <p>Ngày cập nhật gần nhất:</p>
                        <p className='font-bold'>12/03/2025</p>
                    </div>
                    <div className='mt-[10px] p-[10px] bg-gray-100 rounded-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                        <h2 className='text-left font-bold pb-[5px]' style={{borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>Tiện ích</h2>
                        <div className='flex flex-row pt-[10px]'>
                            <Free txt='Wifi' source={wifiicon} />
                            <Free txt='Sạc điện thoại' source={batteryicon} />
                            <Free txt='Điều hòa' source={airconditionericon} />
                        </div>
                        <div className='flex flex-row mt-[5px] mb-[5px]'>
                            <Free txt='Khăn lạnh' source={towelicon} />
                            <Free txt='Búa phá kính' source={hammericon} />
                        </div>
                        <div className='flex flex-row'>
                            <Free txt='Chăn đắp' source={blanketicon} />
                            <Free txt='Nước uống' source={bottleicon} />
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Sơ đồ ghế</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BusDetail
