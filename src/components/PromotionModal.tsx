import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
}

const PromotionModal = ({ setIsOpen, isEdit }: Props) => {
    const [id, setId] = useState<number>(0)
    const [code, setCode] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [num, setNum] = useState<number>(0)
    const [count, setCount] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)

    const formatDate = (date: Date | null) => {
        if (!date) return ''
        return date.toISOString().split('T')[0] // lấy phần YYYY-MM-DD
    }

    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const currentTime = new Date()
        console.log('token:', token)
        console.log('create', currentTime.toISOString(), code, description, formatDate(startDate), formatDate(endDate), num, count)

        try {
        const res = await fetch(
             "https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": "41866a2d-cdc1-4547-9eef-f6d3464f7b6b"
                },
                body: JSON.stringify({
                code: code,
                description: description,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                usageLimit: num,
                usedCount: count
                })
            }
            );

            if (!res.ok) {
            throw new Error(`Error ${res.status}`);
            }

            const data = await res.json();
            alert("Create success");
            console.log("Response:", data);
        } catch (error) {
            alert("Error when creating!");
            console.error("Fetch error:", error);
        }

        // await axios.post('https://apigateway.microservices.appf4s.io.vn/services/mspromotion/api/promotions', 
        //     {
        //         'code': code,
        //         'description': description,
        //         'startDate': sd,
        //         'endDate': ed,
        //         'usageLimit': num,
        //         'usedCount': count,
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'accept': '*/*',
        //             'Content-Type': 'application/json',
        //             'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
        //         }
        //     },
        // )
        // .then((res) => {
        //     alert('Create success')
        //     console.log(res)
        // })
        // .catch((error) => {
        //     alert('Error when creating!')
        //     console.log(error)
        // })
    }

    const handleEdit = () => {
        console.log('edit', id, code, description, startDate, endDate, num, count)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin khuyến mãi' : 'Tạo khuyến mãi mới'}</h3>
                            <div className='w-full flex flex-col'>
                                <div className='w-full flex flex-row justify-between'>
                                    { isEdit && 
                                        <div className='w-[48%]'>
                                            <p>Mã loại KM</p>
                                            <input value={id} onChange={(e) => setId(e.target.valueAsNumber)} type='number' placeholder='1111' className='w-[30%] px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                        </div>
                                    }
                                    <div className='w-[48%]'>
                                        <p>CODE</p>
                                        <input value={code} onChange={(e) => setCode(e.target.value)} type="text" className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                <div className='my-[10px]'>
                                    <p>Mô tả</p>
                                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='w-[48%]'>
                                        <p>Ngày bắt đầu</p>
                                        <input value={formatDate(startDate)} onChange={(e) => setStartDate(e.target.valueAsDate ? new Date(e.target.value) : null)} type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                    <div className='w-[48%]'>
                                        <p>Ngày kết thúc</p>
                                        <input value={formatDate(endDate)} onChange={(e) => setEndDate(e.target.valueAsDate  ? new Date(e.target.value) : null)} type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                    <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                        <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                            Hủy bỏ
                        </button>
                        <button onClick={(e) => {
                            if (isEdit === false) {
                                handleCreate(e)
                            }
                            else if (isEdit === true) {
                                handleEdit()
                            }
                            setIsOpen(false)
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
