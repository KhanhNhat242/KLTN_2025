import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import Search from '../components/Search'
import downloadicon from '../assets/downloadicon.png'
import { useEffect, useState } from 'react'
import PromotionModal from '../components/PromotionModal'
import axios from 'axios'
import PromotionLine from '../components/PromotionLine'
import { type RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import DeleteMocal from '../components/DeleteModal'
import { setPromotions } from '../redux/promotionsSlice'
import type {Promotion, Promotion as PromotionInterface} from '../interface/Interface'
import { setCurrentID } from '../redux/currentSelectedSlice'
import { setBuyNGetMs } from '../redux/buyNGetMSlice'
import { setPercentOffs } from '../redux/percentOffSlice'
// import type { PromotionLine as PromotionLineInterface } from '../interface/Interface'

const Promotion = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentnav, setCurrentnav] = useState<number | undefined>(0)
    const [currentFilter, setCurrentFilter] = useState<string>('all')
    const [promotionsFilter, setPromotionsFilter] = useState<Promotion[]>([])

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const promotions = useSelector((state: RootState) => state.promotions)
    const [selectedPromo, setSelectedPromo] = useState<PromotionInterface>()

    const getData = async () => {
            await axios.get('https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions', {
                params: {
                    'page': '0',
                    'size': '40',
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                },
            })
            .then((res) => {
                dispatch(setPromotions(res.data))
                console.log(promotions)
            })
            .catch(() => {
                console.log('Get data fail!')
            })
            // console.log('data: ',res.data)
            // setPromotions(res.data)
        
    }
    
    const handleCollapse = async () => {
        try {
            const line = await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${currentnav}/detail`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                    },
                }
            )
            // console.log('line data', line.data.percentOffs)
            // console.log('line data', line.data.buyNGetMS)
            // setNum1(line.data.buyNGetMS.length)
            // setNum2(line.data.percentOffs.length)
            
            dispatch(setBuyNGetMs(line.data.buyNGetMS))
            dispatch(setPercentOffs(line.data.percentOffs))
            // setBuyngetms(line.data.buyNGetMS)
            // setPercentoffs(line.data.percentOffs)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFilter = async () => {
        const date = new Date()
        const cd = date.toISOString().split("T")[0]
        if (currentFilter === 'happening') {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions?startDate.equals=${cd}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                },
            })
            .then((res) => {
                setPromotionsFilter(res.data)
            })
            .catch(() => {
                console.log('Filter fail!')
            })
        }
        else if (currentFilter === 'ended') {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions?endDate.lessThan=${cd}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                },
            })
            .then((res) => {
                setPromotionsFilter(res.data)
            })
            .catch(() => {
                console.log('Filter fail!')
            })
        }
        else if (currentFilter === 'notStarted') {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions?startDate.greaterThan=${cd}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
                },
            })
            .then((res) => {
                setPromotionsFilter(res.data)
            })
            .catch(() => {
                console.log('Filter fail!')
            })
        }    
    }

    useEffect(() => {
        // console.log('token:', accesstoken)
        if (token) {
            getData()
        }
        // console.log(temp)
    }, [token])

    
    useEffect(() => {
        if (token && currentnav !== 0) {
            handleCollapse()
        }
        console.log(currentnav)

    }, [currentnav, token])

    useEffect(() => {
        handleFilter()
    }, [currentFilter])

    return (
        <div className='w-full flex flex-row'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý khuyến mãi</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-row'>
                        <Search placeholder='Tìm trong danh sách tuyến' />
                        <select className='flex flex-row items-center rounded-[10px] p-[10px] ml-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                            onChange={(e) => setCurrentFilter(e.target.value)}>
                            <option value="all">Tất cả</option>
                            <option value="happening">Đang diễn ra</option>
                            <option value="ended">Đã kết thúc</option>
                            <option value="notStarted">Chưa diễn ra</option>
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <button className='p-[10px] flex flex-row items-center mx-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                            <img src={downloadicon} className='size-[20px] mr-[5px]' />
                            <p>Xuất Excel</p>
                        </button>
                        <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]' 
                            onClick={() => {
                                setIsEdit(false)
                                setIsOpen(true)
                            }
                            }>+ Tạo khuyến mãi mới</button>
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
                                <th className="border-b">Số lượng giới hạn</th>
                                <th className="border-b">Số lượng đã sử dụng</th>
                                <th className="p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFilter === 'all' ? promotions.map((promo) => {
                                return (
                                    <>
                                        <tr key={promo.id} className="hover:bg-gray-50 border-b-[#ccc] cursor-pointer" 
                                            onClick={() => {
                                                if (currentnav === 0) {
                                                    setCurrentnav(promo.id)
                                                    dispatch(setCurrentID(promo.id))
                                                }
                                                else if (currentnav === promo.id) {
                                                    setCurrentnav(0)       
                                                }}}>
                                            <td className="p-3">{promo.id}</td>
                                            <td className="p-3">{promo.code}</td>
                                            <td className="p-3">{promo.description}</td>
                                            <td className="p-3">{`${promo.startDate[2]}/${promo.startDate[1]}/${promo.startDate[0]}`}</td>
                                            <td className="p-3">{`${promo.endDate[2]}/${promo.endDate[1]}/${promo.endDate[0]}`}</td>
                                            <td>{promo.usageLimit}</td>
                                            <td>{promo.usedCount}</td>
                                            <td className="p-3 space-x-2">
                                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                                onClick={() => {
                                                    setSelectedPromo(promo)
                                                    setIsOpen(true)
                                                    setIsEdit(true)
                                                }}>Sửa</button>
                                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                                            </td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td colSpan={6}>
                                                {currentnav === promo.id && <PromotionLine />}
                                            </td>
                                        </tr>
                                    </>
                            )}) : promotionsFilter.map((promo) => {
                                return (
                                    <>
                                        <tr key={promo.id} className="hover:bg-gray-50 border-b-[#ccc] cursor-pointer" 
                                            onClick={() => {
                                                if (currentnav === 0) {
                                                    setCurrentnav(promo.id)
                                                    dispatch(setCurrentID(promo.id))
                                                }
                                                else if (currentnav === promo.id) {
                                                    setCurrentnav(0)       
                                                }}}>
                                            <td className="p-3">{promo.id}</td>
                                            <td className="p-3">{promo.code}</td>
                                            <td className="p-3">{promo.description}</td>
                                            <td className="p-3">{`${promo.startDate[2]}/${promo.startDate[1]}/${promo.startDate[0]}`}</td>
                                            <td className="p-3">{`${promo.endDate[2]}/${promo.endDate[1]}/${promo.endDate[0]}`}</td>
                                            <td>{promo.usageLimit}</td>
                                            <td>{promo.usedCount}</td>
                                            <td className="p-3 space-x-2">
                                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                                onClick={() => {
                                                    setSelectedPromo(promo)
                                                    setIsOpen(true)
                                                    setIsEdit(true)
                                                }}>Sửa</button>
                                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                                            </td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td colSpan={6}>
                                                {currentnav === promo.id && <PromotionLine />}
                                            </td>
                                        </tr>
                                    </>
                            )})
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            { isOpen && (isEdit ? <PromotionModal isEdit={true} setIsOpen={setIsOpen} promo={selectedPromo} /> : <PromotionModal isEdit={false} setIsOpen={setIsOpen} /> ) }
            { isDelete && <DeleteMocal setIsDelete={setIsDelete} /> }
        </div>
    )
}

export default Promotion
