import React from 'react'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const PromotionModal = ({ setIsOpen }: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">Tạo khuyến mãi mới</h3>
                            <div className='w-full flex flex-col'>
                                <div className='ư-full flex flex-row justify-between'>
                                    <div className='w-[48%]'>
                                        <p>Mã loại KM</p>
                                        <input type='number' placeholder='1111' className='w-[30%] px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                    <div className='w-[48%]'>
                                        <p>Tên khuyến mãi</p>
                                        <input type="text" className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                <div className='my-[10px]'>
                                    <p>Mô tả</p>
                                    <input type="text" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='w-[48%]'>
                                        <p>Ngày bắt đầu</p>
                                        <input type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                    <div className='w-[48%]'>
                                        <p>Ngày kết thúc</p>
                                        <input type="date" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                <div className='w-full flex flex-row justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <p>SL vé tối thiểu</p>
                                        <input type="number" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                    <div className='w-[48%]'>
                                        <p>SL vé tối đa</p>
                                        <input type="number" name="" id=""  className='w-full px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} />
                                    </div>
                                </div>
                                <div className='w-full flex flex-row items-center my-[10px]'>
                                    <p className='mr-[5px]'>Loại khuyến mãi:</p>
                                    <select  className='px-[5px] py-[3px] rounded-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}} >
                                        <option value="">Giảm giá theo số tiền hóa đơn</option>
                                        <option value="">Mua 3 vé tặng 1 vé</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                        <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                            Hủy bỏ
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default PromotionModal
