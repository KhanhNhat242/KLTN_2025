import { useState } from 'react'

interface PercentOff {
    id: number,
    percent: number,
    maxOff: number,
    minPrice: number,
}

interface BuyNGetM {
    id: number,
    buyN: number,
    getM: number,
}

interface Props {
    buyNGetMS: BuyNGetM[],
    percentOffs: PercentOff[],
    num1: number,
    num2: number,
}

interface BuyngetmsProps {
    buyngetms: BuyNGetM[]
}

interface PercentoffsProps {
    percentoffs: PercentOff[]
}

const PercentOff = ({ percentoffs }: PercentoffsProps) => (
    <table className='ml-[100px]'>
        <thead>
            <tr>
                <th className='px-[10px]'>ID</th>
                <th className='px-[10px]'>Phần trăm giảm</th>
                <th className='px-[10px]'>Giảm tối đa</th>
                <th className='px-[10px]'>Hóa đơn tối thiểu</th>
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
                    </tr>
                ))
            }
        </tbody>
    </table>
)

const BuyNGetM = ({ buyngetms }: BuyngetmsProps) => (
    <table className='ml-[100px]'>
        <thead>
            <tr>
                <th className='px-[10px]'>ID</th>
                <th className='px-[10px]'>Vé mua</th>
                <th className='px-[10px]'>Vé được tặng</th>
            </tr>
        </thead>
        <tbody>
            {
                buyngetms.map((buyngetm) => (
                    <tr>
                        <td className='px-[10px]'>{buyngetm.id}</td>
                        <td className='px-[10px]'>{buyngetm.buyN}</td>
                        <td className='px-[10px]'>{buyngetm.getM}</td>
                    </tr>
            ))}
        </tbody>
    </table>
)

const PromotionLine = ({ buyNGetMS, percentOffs, num1, num2 }: Props) => {
    const [count, setCount] = useState<number>(0)

    return (
        <div className='w-full border-t-[#ccc]'>
            <div className='cursor-pointer py-[5px] hover:bg-gray-50' 
                onClick={() => {
                    if ((count === 0 || count === 2) && buyNGetMS !== undefined) {
                        setCount(1)
                    }
                    else if(count === 1) {
                        setCount(0)
                    }}}>
                <p className='pl-[40px]'>- Mua N vé tặng M vé</p>
                <p className='pl-[60px]'>Số lượng: {num1}</p>
            </div>
            { (count === 1 && num1 !== 0) && <BuyNGetM buyngetms={buyNGetMS} /> }
            <div className='cursor-pointer py-[5px] hover:bg-gray-50' 
                onClick={() => {
                    if ((count === 0 || count === 1) && percentOffs !== undefined) {
                        setCount(2)
                    }
                    else if(count === 2) {
                        setCount(0)
                    }}}>
                <p className='pl-[40px]'>- Chiết khấu theo phần trăm hóa đơn</p>
                <p className='pl-[60px]'>Số lượng: {num2}</p>
            </div>
            { (count === 2 && num2 !== 0) && <PercentOff percentoffs={percentOffs} /> }
        </div>
    )
}

export default PromotionLine
