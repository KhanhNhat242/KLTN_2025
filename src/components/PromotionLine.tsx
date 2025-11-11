import { useState } from 'react'
import DeleteModal from './DeleteModal'
import PromotionDetailModal from './PromotionDetailModal'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { type BuyNGetM, type BuyNGetM as BuyNGetMInterface, type PercentOff, type PromotionLine} from '../interface/Interface'
import { type PercentOff as PercentOffInterface} from '../interface/Interface'

interface BuyNGetMProps {
    buyngetms: BuyNGetMInterface[],
}

interface PercentOffProps {
    percentoffs: PercentOffInterface[],
}

const PercentOff = ({percentoffs}: PercentOffProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedLine, setSelectedLine] = useState<PercentOff>()

    return (
        <>
            <table className='ml-[100px]'>
                <thead>
                    <tr>
                        <th className='px-[10px]'>ID</th>
                        <th className='px-[10px]'>Phần trăm giảm</th>
                        <th className='px-[10px]'>Giảm tối đa</th>
                        <th className='px-[10px]'>Hóa đơn tối thiểu</th>
                        <th className='px-[10px]'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        percentoffs.map((percentoff) => (
                            <tr>
                                <td className='px-[10px]'>{percentoff.id}</td>
                                <td className='px-[10px]'>{percentoff.percent}</td>
                                <td className='px-[10px]'>{percentoff.maxOff}</td>
                                <td className='px-[10px]'>{percentoff.minPrice}</td>
                                <td className="space-x-2">
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedLine(percentoff)
                                            setIsOpen(true)
                                            setIsEdit(true)
                                            console.log(isOpen, isEdit)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedLine(percentoff)
                                            setIsDelete(true)
                                        }
                                        }>Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            { isOpen && (isEdit ? <PromotionDetailModal selectedLine={selectedLine} isEdit={true} setIsOpen={setIsOpen} type={1} /> : <PromotionDetailModal isEdit={false} setIsOpen={setIsOpen} type={1} /> ) }
            { isDelete && <DeleteModal setIsDelete={setIsDelete} percentoff={selectedLine} /> }
        </>
    )
}

const BuyNGetM = ({buyngetms}: BuyNGetMProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedLine, setSelectedLine] = useState<BuyNGetM>()

    return (
        <>
            <table className='ml-[100px]'>
                <thead>
                    <tr>
                        <th className='px-[10px]'>ID</th>
                        <th className='px-[10px]'>Vé mua</th>
                        <th className='px-[10px]'>Vé được tặng</th>
                        <th className='px-[10px]'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buyngetms.map((buyngetm) => (
                            <tr>
                                <td className='px-[10px]'>{buyngetm.id}</td>
                                <td className='px-[10px]'>{buyngetm.buyN}</td>
                                <td className='px-[10px]'>{buyngetm.getM}</td>
                                <td className="space-x-2">
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                    onClick={() => {
                                        setSelectedLine(buyngetm)
                                        setIsOpen(true)
                                        setIsEdit(true)
                                    }}>Sửa</button>
                                    <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                        onClick={() => {
                                            setSelectedLine(buyngetm)
                                            setIsDelete(true)
                                        }
                                        }>Xóa</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
            { isOpen && (isEdit ? <PromotionDetailModal isEdit={true} selectedLine={selectedLine} setIsOpen={setIsOpen} type={2} /> : <PromotionDetailModal isEdit={false} setIsOpen={setIsOpen} type={2} /> ) }
            { isDelete && <DeleteModal setIsDelete={setIsDelete} buyngetm={selectedLine} /> }
        </>
    )
}

const PromotionLine = () => {
    const [count, setCount] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [type, setType] = useState<number>(0)

    const buyngetms = useSelector((state: RootState) => state.buyNgetMs)
    const percentoffs = useSelector((state: RootState) => state.percentOffS)

    // useEffect(() => {
    //     console.log(buyngetms, percentoffs)
    // })

    return (
        <div className='w-full border-t-[#ccc]'>
            <div>
                <div className='w-[45%] flex flex-row justify-between cursor-pointer py-[5px] hover:bg-gray-50' 
                    onClick={() => {
                        if (count === 0 || count === 2) {
                            setCount(1)
                        }
                        else if(count === 1) {
                            setCount(0)
                        }}}>
                    <div>
                        <p className='pl-[40px]'>- Mua N vé tặng M vé</p>
                        <p className='pl-[60px]'>Số lượng: {buyngetms.length}</p>
                    </div>
                    <button className="h-full ml-[50px] p-[5px] cursor-pointer text-white bg-[#1447E6] rounded-[5px] hover:underline" 
                        onClick={() => {
                            setIsOpen(true)
                            setType(2)
                        }}
                    >+ Chi tiết khuyến mãi</button>
                </div>
                { (count === 1 && buyngetms.length > 0) && <BuyNGetM buyngetms={buyngetms} /> }
            </div>
            <div>
                <div className='w-[45%] flex flex-row justify-between cursor-pointer py-[5px] hover:bg-gray-50' 
                    onClick={() => {
                        if (count === 0 || count === 1) {
                            setCount(2)
                        }
                        else if(count === 2) {
                            setCount(0)
                        }}}>
                    <div>
                        <p className='pl-[40px]'>- Chiết khấu theo phần trăm hóa đơn</p>
                        <p className='pl-[60px]'>Số lượng: {percentoffs.length}</p>
                    </div>
                    <button className="h-full ml-[50px] p-[5px] cursor-pointer text-white bg-[#1447E6] rounded-[5px] hover:underline" 
                        onClick={() => {
                            setIsOpen(true)
                            setType(1)
                        }}
                    >+ Chi tiết khuyến mãi</button>
                </div>
                { (count === 2 && percentoffs.length > 0) && <PercentOff percentoffs={percentoffs} /> }
                { isOpen && <PromotionDetailModal setIsOpen={setIsOpen} isEdit={false} type={type} /> }
            </div>
        </div>
    )
}

export default PromotionLine
