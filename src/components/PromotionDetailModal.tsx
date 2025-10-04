import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    type: number,
}

interface BuyNGetMProps {
    n: number,
    setN: React.Dispatch<React.SetStateAction<number>>,
    m: number,
    setM: React.Dispatch<React.SetStateAction<number>>,
}

interface PercentOffProps {
    percent: number,
    setPercent: React.Dispatch<React.SetStateAction<number>>,
    maxOff: number,
    setMaxOff: React.Dispatch<React.SetStateAction<number>>,
    minPrice: number,
    setMinPrice: React.Dispatch<React.SetStateAction<number>>,
}

const BuyNGetM = ({ n, setN, m, setM }: BuyNGetMProps) => {
    return (
        <div className='w-full flex flex-row justify-between'>
            <div className='w-[48%]'>
                <p>Số lượng vé mua</p>
                <input type='number' value={n} onChange={(e) => setN(e.target.valueAsNumber)} className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
            <div className='w-[48%]'>
                <p>Số lượng vé được tặng</p>
                <input type='number' value={m} onChange={(e) => setM(e.target.valueAsNumber)} className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
        </div>
    )
}


const PercentOff = ({ percent, setPercent, maxOff, setMaxOff, minPrice, setMinPrice }: PercentOffProps) => {
    return (
        <div>
            <div className='w-[48%]'>
                <p>Phần trăm giảm</p>
                <input value={percent} onChange={(e) => setPercent(e.target.valueAsNumber)} type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
            <div className='w-full flex flex-row justify-between'>
                <div className='w-[48%]'>
                    <p>Giảm tối đa</p>
                    <input value={maxOff} onChange={(e) => setMaxOff(e.target.valueAsNumber)} type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
                </div>
                <div className='w-[48%]'>
                    <p>Hóa đơn tối thiểu</p>
                    <input value={minPrice} onChange={(e) => setMinPrice(e.target.valueAsNumber)} type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
                </div>
            </div>
        </div>
    )
}

const PromotionDetailModal = ({ setIsOpen, isEdit, type }: Props) => {
    const [n, setN] = useState<number>(0) 
    const [m, setM] = useState<number>(0) 
    const [percent, setPercent] = useState<number>(0) 
    const [maxOff, setMaxOff] = useState<number>(0) 
    const [minPrice, setMinPrice] = useState<number>(0) 

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const id = useSelector((state: RootState) => state.currentSelectedID.id)

    const handleCreate1 = async () => {
        const ca = new Date()


    }

    const handleCreate2 = async () => {
        const ca = new Date()

        console.log(id)
        await axios.post(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${id}/buy-n-get-m-free`, {
            "buyN": n,
            "getM": m,
            "promotion": {},
            "createdAt": ca.toISOString(),
        }, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }
        },)
        .then((res) => {
            alert('Create success')
            console.log(res)
        })
        .catch((error) => {
            alert('Error when creating!')
            console.log(error)
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa chi tiết khuyến mãi' : 'Tạo chi tiết khuyến mãi'}</h3>
                            <div className='w-full flex flex-col'>
                                { type === 1 ? <PercentOff percent={percent} setPercent={setPercent} maxOff={maxOff} setMaxOff={setMaxOff} minPrice={minPrice} setMinPrice={setMinPrice}  /> 
                                : <BuyNGetM n={n} setN={setN} m={m} setM={setM} /> }
                            </div>
                        </div>
                    </div>
                    <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                        <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                            Hủy bỏ
                        </button>
                        <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                            onClick={() => {
                                setIsOpen(false)
                                if (isEdit === false && type === 2) {
                                    handleCreate2()
                                }
                                else if (isEdit === false && type === 1) {
                                    handleCreate1()
                                }
                            }
                        }>
                            Xác nhận
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default PromotionDetailModal
