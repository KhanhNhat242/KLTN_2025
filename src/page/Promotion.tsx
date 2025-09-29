import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import Search from '../components/Search'
import Filter from '../components/Filter'
import downloadicon from '../assets/downloadicon.png'
import { useEffect, useState } from 'react'
import PromotionModal from '../components/PromotionModal'
import axios from 'axios'
import PromotionLine from '../components/PromotionLine'

interface Props {
    accesstoken: string,
}

interface Promotion {
    id: number,
    code: string,
    description: string,
    startDate: [],
    endDate: [],
}

const Promotion = ({ accesstoken }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [promotions, setPromotions] = useState<Promotion[]>([])
    const [nav, isNav] = useState<boolean>(false)
    const [currentnav, setCurrentnav] = useState<number>(0)

    const getData = async () => {
        try {
            const res = await axios.get('https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions', {
                params: {
                    'page': '0',
                    'size': '20',
                },
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                },
            })
            // console.log('data: ',res.data)
            setPromotions(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // console.log('token:', accesstoken)
        getData()
        // console.log(temp)
    }, [])

    const handleCollapse = async () => {
        try {
            const line = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${currentnav}/detail`,
                {
                    headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                    },
                }
            )
            console.log('line data', line.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleCollapse()
    }, [currentnav])

    return (
        <div className='w-full flex flex-row'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Danh sách khuyến mãi</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-row'>
                        <Search placeholder='Tìm trong danh sách tuyến' />
                        <Filter type='promotion' />
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
                                <th className="p-3 border-b">Mô tả</th>
                                <th className="p-3 border-b">Ngày bắt đầu</th>
                                <th className="p-3 border-b">Ngày kết thúc</th>
                                <th className="p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promotion) => (
                                <>
                                    <tr key={promotion.id} className="hover:bg-gray-50 border-b-[#ccc] cursor-pointer" 
                                        onClick={() => {
                                            if (currentnav === 0) {
                                                setCurrentnav(promotion.id)
                                            }
                                            else if (currentnav === promotion.id) {
                                                setCurrentnav(0)       
                                            }
                                            handleCollapse()
                                        }}
                                    >
                                        <td className="p-3">{promotion.id}</td>
                                        <td className="p-3">{promotion.code}</td>
                                        <td className="p-3">{promotion.description}</td>
                                        <td className="p-3">{`${promotion.startDate[2]}/${promotion.startDate[1]}/${promotion.startDate[0]}`}</td>
                                        <td className="p-3">{`${promotion.endDate[2]}/${promotion.endDate[1]}/${promotion.endDate[0]}`}</td>
                                        <td className="p-3 space-x-2">
                                            <button className="text-blue-600 hover:underline">Sửa</button>
                                            <button className="text-blue-600 hover:underline">Xóa</button>
                                        </td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td colSpan={6}>
                                            {currentnav === promotion.id && <PromotionLine />}
                                        </td>
                                    </tr>
                                </>
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
