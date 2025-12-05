import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { add2, update2 } from '../redux/buyNGetMSlice'
import { add1, update1 } from '../redux/percentOffSlice'
import type { BuyNGetM, PercentOff, PromotionLine } from '../interface/Interface'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    type: number,
    selectedLine?: PromotionLine,
}

interface BuyNGetMProps {
    n: number | undefined,
    setN: React.Dispatch<React.SetStateAction<number | undefined>>,
    m: number | undefined,
    setM: React.Dispatch<React.SetStateAction<number | undefined>>,
    valid: number,
}

interface PercentOffProps {
    percent: number | undefined,
    setPercent: React.Dispatch<React.SetStateAction<number | undefined>>,
    maxOff: number | undefined,
    setMaxOff: React.Dispatch<React.SetStateAction<number | undefined>>,
    minPrice: number | undefined,
    setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>,
    valid: number,
}

const BuyNGetM = ({ n, setN, m, setM, valid }: BuyNGetMProps) => {
    return (
        <div className='w-full flex flex-col'>
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
            {valid === 4 && <p className='text-[red]'>*Số lượng không hợp lệ</p>}
        </div>
    )
}


const PercentOff = ({ percent, setPercent, maxOff, setMaxOff, minPrice, setMinPrice, valid }: PercentOffProps) => {
    return (
        <div>
            <div className='w-[48%]'>
                <p>Phần trăm giảm (%)</p>
                <input value={percent} onChange={(e) => setPercent(e.target.valueAsNumber)} type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
            {valid === 1 && <p className='text-[red]'>*Phần trăm giảm không hợp lệ</p>}
            <div className='w-full flex flex-row justify-between'>
                <div className='w-[48%]'>
                    <p>Giảm tối đa (VND)</p>
                    <input value={maxOff} onChange={(e) => setMaxOff(e.target.valueAsNumber)} type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
                </div>
                <div className='w-[48%]'>
                    <p>Hóa đơn tối thiểu (VND)</p>
                    <input value={minPrice} onChange={(e) => setMinPrice(e.target.valueAsNumber)} type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
                </div>
            </div>
            {(valid === 2 || valid === 3)&& <p className='text-[red]'>*Số tiền không hợp lệ</p>}
        </div>
    )
}

const PromotionDetailModal = ({ setIsOpen, isEdit, type, selectedLine }: Props) => {
    const [n, setN] = useState<number | undefined>(0) 
    const [m, setM] = useState<number | undefined>(0) 
    const [percent, setPercent] = useState<number | undefined>(0) 
    const [maxOff, setMaxOff] = useState<number | undefined>(0) 
    const [minPrice, setMinPrice] = useState<number | undefined>(0) 
    const [valid, setValid] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const id = useSelector((state: RootState) => state.currentSelectedID.id)
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(selectedLine)
        if (type === 1 && isEdit) {
            setPercent(selectedLine?.percent)
            setMaxOff(selectedLine?.maxOff)
            setMinPrice(selectedLine?.minPrice)
        }
        else if (type === 2 && isEdit) {
            setN(selectedLine?.buyN)
            setM(selectedLine?.getM)
        }
    }, [])

    const handleCreate1 = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const ca = new Date()

        if (percent === 0 || Number(percent) >= 100) {
            setValid(1)
            setIsOpen(true)
        }
        else if (maxOff === 0) {
            setValid(2)
            setIsOpen(true)
        }
        else if (minPrice === 0) {
            setValid(3)
            setIsOpen(true)
        }
        else {
            await axios.post(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${id}/percent-off-total`, {
                "percent": percent,
                "maxOff": maxOff,
                "minPrice": minPrice,
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
                console.log('created', res.data)
                dispatch(add1(res.data))
                alert('Create success')
            })
            .catch((error) => {
                alert('Error when creating!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    const handleCreate2 = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const ca = new Date()

        // console.log(id)
        if (n === 0 || m === 0 || Number(n) < Number(m)) {
            setIsOpen(true)
            setValid(4)
        }
        else {
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
                dispatch(add2(res.data))
                alert('Create success')
                console.log(res)
            })
            .catch((error) => {
                alert('Error when creating!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    const handleEdit1 = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const ca = new Date()

        if (percent === 0 || Number(percent) >= 100) {
            setValid(1)
            setIsOpen(true)
        }
        else if (maxOff === 0) {
            setValid(2)
            setIsOpen(true)
        }
        else if (minPrice === 0) {
            setValid(3)
            setIsOpen(true)
        }
        else {
            await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${id}/percent-off-total/${selectedLine?.id}`, 
                {
                    "id": selectedLine?.id,
                    "percent": percent,
                    "maxOff": maxOff,
                    "minPrice": minPrice,
                    "createdAt": ca.toISOString(),
                    "promotion": {}
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then((res) => {
                dispatch(update1(res.data))
                alert('Edit success')
                console.log(res)
            })
            .catch((error) => {
                alert('Error when editing!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    const handleEdit2 = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const ca = new Date()
        // console.log(selectedLine?.id, selectedLine?.buyN, selectedLine?.getM)

        if (n === 0 || m === 0 || Number(n) < Number(m)) {
            setIsOpen(true)
            setValid(4)
        }
        else {
            await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${id}/buy-n-get-m-free/${selectedLine?.id}`, 
                {
                    "id": selectedLine?.id,
                    "buyN": n,
                    "getM": m,
                    "createdAt": ca.toISOString(),
                    "promotion": {}
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then((res) => {
                dispatch(update2(res.data))
                alert('Edit success')
                console.log(res)
            })
            .catch((error) => {
                alert('Error when editing!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa chi tiết khuyến mãi' : 'Tạo chi tiết khuyến mãi'}</h3>
                            <div className='w-full flex flex-col'>
                                { type === 1 ? <PercentOff percent={percent} setPercent={setPercent} maxOff={maxOff} setMaxOff={setMaxOff} minPrice={minPrice} setMinPrice={setMinPrice} valid={valid} /> 
                                : <BuyNGetM n={n} setN={setN} m={m} setM={setM} valid={valid} /> }
                            </div>
                        </div>
                    </div>
                    <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                        <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                            Hủy bỏ
                        </button>
                        <button className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer"
                            onClick={() => {
                                // setIsOpen(false)
                                if (isEdit === false && type === 2) {
                                    handleCreate2(setIsOpen)
                                }
                                else if (isEdit === false && type === 1) {
                                    handleCreate1(setIsOpen)
                                }
                                else if (isEdit === true && type === 1) {
                                    handleEdit1(setIsOpen)
                                }
                                else if (isEdit === true && type === 2) {
                                    handleEdit2(setIsOpen)
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
