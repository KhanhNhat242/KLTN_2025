import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { add, update } from '../redux/promotionsSlice'
import type { Promotion as PromotionInterface } from '../interface/Interface'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    promo?: PromotionInterface,
}

const PromotionModal = ({ setIsOpen, isEdit, promo }: Props) => {
    const [code, setCode] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [num, setNum] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [valid, setValid] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const formatDate = (dateArr: number[]): string => {
        const [year, month, day] = dateArr;

        const mm = String(month).padStart(2, "0");
        const dd = String(day).padStart(2, "0");

        return `${year}-${mm}-${dd}`;
    }

    const handleCreate = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {

        // console.log('create', code, description, formatDate(startDate), formatDate(endDate), num, count)
        console.log('create', code, description, startDate, endDate, num, count)
        const ca = new Date()
        const ua = new Date()

        if (code === '') {
            setIsOpen(true)
            setValid(1)
        }
        else if (description === '') {
            setIsOpen(true)
            setValid(2)
        }
        else if (startDate > endDate) {
            setIsOpen(true)
            setValid(3)
        }
        else if (num === 0 || num < count) {
            setIsOpen(true)
            setValid(4)
        }
        else {
            await axios.post('https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions', 
                {
                    'code': code,
                    'description': description,
                    'startDate': startDate,
                    'endDate': endDate,
                    'usageLimit': num,
                    'usedCount': count,
                    'createdAt': ca.toISOString(),
                    'updatedAt': ua.toISOString(),
                    'isDeleted': true,
                    'deletedAt': '2025-10-02T13:59:26.338Z',
                    'deletedBy': '3fa85f64-5717-4562-b3fc-2c963f66afa6'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                    }
                },
            )
            .then((res) => {
                dispatch(add(res.data))
                alert('Create success')
                // console.log(res)
            })
            .catch((error) => {
                alert('Error when creating!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    const handleEdit = async (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const ca = new Date()
        const ua = new Date()

        console.log('edit', code, description, startDate, endDate, num, count)

        if (code === '') {
            setIsOpen(true)
            setValid(1)
        }
        else if (description === '') {
            setIsOpen(true)
            setValid(2)
        }
        else if (startDate > endDate) {
            setIsOpen(true)
            setValid(3)
        }
        else if (num === 0 || num < count) {
            setIsOpen(true)
            setValid(4)
        }
        else {
            await axios.put(`https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions/${promo?.id}`,
                {
                    'id': promo?.id,
                    'code': code,
                    'description': description,
                    'startDate': startDate,
                    'endDate': endDate,
                    'usageLimit': num,
                    'usedCount': count,
                    'createdAt': ca.toISOString(),
                    'updatedAt': ua.toISOString(),
                    'isDeleted': true,
                    'deletedAt': '2025-10-02T13:59:26.338Z',
                    'deletedBy': '3fa85f64-5717-4562-b3fc-2c963f66afa6'
                }, 
                {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                dispatch(update(res.data))
                alert('Edit success')
                // console.log(res)
            })
            .catch((error) => {
                alert('Error when editing!')
                console.log(error)
            })
            setIsOpen(false)
        }
    }

    useEffect(() => {
        // console.log(promo)
        if (isEdit && promo) {
            setCode(promo?.code)
            setDescription(promo?.description)
            setStartDate(formatDate(promo.startDate))
            setEndDate(formatDate(promo.endDate))
            setNum(promo?.usageLimit)
            setCount(promo?.usedCount)
        }
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin khuyến mãi' : 'Tạo khuyến mãi mới'}</h3>
                            <div className='w-full flex flex-col'>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='w-[48%]'>
                                        <p>CODE</p>
                                        <input value={code} onChange={(e) => setCode(e.target.value)} type="text" className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                {valid === 1 && <p className='text-[red]'>*CODE không hợp lệ</p>}
                                <div className='my-[10px]'>
                                    <p>Mô tả</p>
                                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                                {valid === 2 && <p className='text-[red]'>*Mô tả không hợp lệ</p>}
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='w-[48%]'>
                                        <p>Ngày bắt đầu</p>
                                        {/* <input value={formatDate(startDate)} onChange={(e) => setStartDate(e.target.valueAsDate ? new Date(e.target.value) : null)} type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} /> */}
                                        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                    <div className='w-[48%]'>
                                        <p>Ngày kết thúc</p>
                                        {/* <input value={formatDate(endDate)} onChange={(e) => setEndDate(e.target.valueAsDate  ? new Date(e.target.value) : null)} type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} /> */}
                                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                {valid === 3 && <p className='text-[red]'>*Thời gian không hợp lệ</p>}
                                <div className='w-full flex flex-row justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <p>Số lượng</p>
                                        <input value={num} onChange={(e) => setNum(e.target.valueAsNumber)} type="number" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                    <div className='w-[48%]'>
                                        <p>Đã sử dụng</p>
                                        <input value={count} onChange={(e) => setCount(e.target.valueAsNumber)} type="number" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' placeholder='0' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                {valid === 4 && <p className='text-[red]'>*Số lượng không hợp lệ</p>}
                            </div>
                        </div>
                    </div>
                    <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                        <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                            Hủy bỏ
                        </button>
                        <button onClick={() => {
                            if (isEdit === false) {
                                handleCreate(setIsOpen)
                            }
                            else if (isEdit === true) {
                                console.log(promo)
                                handleEdit(setIsOpen)
                            }
                            // setIsOpen(false)
                        }
                        } className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer">
                            Xác nhận
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default PromotionModal
