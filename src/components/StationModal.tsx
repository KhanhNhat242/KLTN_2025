import React, { useEffect, useState } from 'react'
import type { District, Province, Ward } from '../interface/Interface'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
}

const StationModal = ({ setIsOpen, isEdit }: Props) => {
    const [name, setName] = useState<string>('')
    const [isActive, setIsActive] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [provinces, setProvinces] = useState<Province[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [street, setStreet] = useState<string>('')
    const [currentPID, setCurrentPID] = useState<number>(0)
    const [currentDID, setCurrentDID] = useState<number>(0)
    const [currentWName, setCurrentWName] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()

    const getProvinces = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msroute/api/provinces', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
            }  
        })
        .then((res) => {
            // console.log(res.data)
            setProvinces(res.data)
        })
        .catch((error) => {
            alert('Error when get provinces!')
            console.log(error)
        })
    }

    const getDistricts = async () => {
        console.log(currentPID)
        if (currentPID !== 0) {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/districts?provinceId.equals=${currentPID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            }
               )
            .then((res) => {
                // console.log(res.data)
                setDistricts(res.data)
            })
            .catch((error) => {
                alert('Error when get districts!')
                console.log(error)
            })
        }
    }

    const getWards = async () => {
        if (currentDID !== 0) {
            await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/wards?districtId.equals=${currentDID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                }  
            })
            .then((res) => {
                // console.log(res.data)
                setWards(res.data)
            })
            .catch((error) => {
                alert('Error when get wards!')
                console.log(error)
            })
        }
    }

    const handleCreate = async () => {
        // const now = new Date().toISOString()

        console.log(currentWName, currentDID, currentPID)

    }

    useEffect(() => {
        getProvinces()
    }, [])

    useEffect(() => {
        getDistricts()
    }, [currentPID])

    useEffect(() => {
        getWards()
    }, [currentDID])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa thông tin trạm' : 'Tạo trạm mới'}</h3>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-row justify-between'>
                                <div className='w-[48%]'>
                                    <p>Tên trạm</p>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text"  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                                <div className='w-[48%]'>
                                    <p>Trạng thái</p>
                                    <select defaultValue={isActive} onChange={(e) => setIsActive(e.target.value)} name="" id="" className='w-full p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                                        <option value='ACTIVE'>Đang hoạt động</option>
                                        <option value='NOT_ACTIVE'>Ngưng hoạt động</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full justify-between my-[5px]'>
                                <p>Mô tả</p>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" className='w-full' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}></textarea>
                            </div>
                            <div className='w-full justify-between my-[5px]'>
                                <p>Địa chỉ:</p>
                                <div className='w-[48%] flex flex-row items-center my-[5px]'>
                                    <p className='mr-[7px]'>Tỉnh</p>
                                    <select name="" id="" className='w-full ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                        onChange={(e) => setCurrentPID(Number(e.target.value))}>
                                        <option value="">Tất cả</option>
                                        {
                                            provinces.sort((a, b) => a.name.localeCompare(b.name)).map((province) => (
                                                <option key={province.id} value={province.id}>{province.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='w-[48%] flex flex-row items-center'>
                                        <p>Quận</p>
                                        <select name="" id="" className='w-full ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                            onChange={(e) => setCurrentDID(Number(e.target.value))}
                                        >
                                            <option value="">Tất cả</option>
                                            {
                                                districts.sort((a, b) => a.name.localeCompare(b.name)).map((district) => (
                                                    <option key={district.id} value={district.id}>{district.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='w-[48%] flex flex-row items-center'>
                                        <p>Phường</p>
                                        <select name="" id="" className='w-full ml-[5px] p-[5px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                                            onChange={(e) => setCurrentWName(e.target.value)}
                                        >
                                            <option value="">Tất cả</option>
                                            {
                                                wards.sort((a, b) => a.name.localeCompare(b.name)).map((ward) => (
                                                    <option key={ward.id} value={ward.id}>{ward.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='w-full flex flex-row justify-between items-center my-[5px]'>
                                    <p className='mr-[7px]'>Số nhà, tên đường</p>
                                    <input value={street} onChange={(e) => setStreet(e.target.value)} type="text"  className='w-[68%] px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                            </div>
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
                            if (!isEdit) {
                                handleCreate()
                            }
                        }}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StationModal
