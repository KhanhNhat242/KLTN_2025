import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import Search from '../components/Search'
import Filter from '../components/Filter'
import downloadicon from '../assets/downloadicon.png'
import { useState } from 'react'
import PromotionModal from '../components/PromotionModal'

const promotion = [
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Birthday of Ridehub 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Many people', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'pause'},
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
    {id: 333, name: 'Lunar new year 2025', type: 'Discount by bill', startDate: '01/20/2025', endDate: '02/15/2025', status: 'active'},
]

const Promotion = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='w-full flex flex-row'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách khuyến mãi</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-row'>
                        <Search placeholder='Tìm trong danh sách tuyến' />
                        <Filter />
                    </div>
                    <div className='flex flex-row'>
                        <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                        <img src={downloadicon} className='size-[20px] mr-[5px]' />
                        <p>Xuất Excel</p>
                        </button>
                        <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' onClick={() => setIsOpen(true)}>+ Tạo khuyến mãi mới</button>
                    </div>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b">Mã vé</th>
                                <th className="p-3 border-b">Tên khuyến mãi</th>
                                <th className="p-3 border-b">Loại khuyến mãi</th>
                                <th className="p-3 border-b">Ngày bắt đầu</th>
                                <th className="p-3 border-b">Ngày kết thúc</th>
                                <th className="p-3 border-b">Trạng thái</th>
                                <th className="p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotion.map((promotion) => (
                                <tr key={promotion.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{promotion.id}</td>
                                    <td className="p-3 border-b">{promotion.name}</td>
                                    <td className="p-3 border-b">{promotion.type}</td>
                                    <td className="p-3 border-b">{promotion.startDate}</td>
                                    <td className="p-3 border-b">{promotion.endDate}</td>
                                    <td className="p-3 border-b">{promotion.status}</td>
                                    <td className="p-3 border-b space-x-2">
                                        <button className="text-blue-600 hover:underline">Sửa</button>
                                        <button className="text-blue-600 hover:underline">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <button onClick={() => setIsOpen(true)}>opennnnn</button> */}
                {isOpen && <PromotionModal setIsOpen={setIsOpen} />}
            </div>
        </div>
    )
}

export default Promotion
