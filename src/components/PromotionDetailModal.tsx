import React from 'react'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    type: number,
}

const BuyNGetM = () => {
    return (
        <div className='w-full flex flex-row justify-between'>
            <div className='w-[48%]'>
                <p>Số lượng vé mua</p>
                <input type='number' className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
            <div className='w-[48%]'>
                <p>Số lượng vé được tặng</p>
                <input type='number' className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
        </div>
    )
}


const PercentOff = () => {
    return (
        <div>
            <div className='w-[48%]'>
                <p>Phần trăm giảm</p>
                <input type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
            </div>
            <div className='w-full flex flex-row justify-between'>
                <div className='w-[48%]'>
                    <p>Giảm tối đa</p>
                    <input type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
                </div>
                <div className='w-[48%]'>
                    <p>Hóa đơn tối thiểu</p>
                    <input type="number" className='w-full my-[5px] rounded-[5px] p-[5px] border-1' />
                </div>
            </div>
        </div>
    )
}



const PromotionDetailModal = ({ setIsOpen, isEdit, type }: Props) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <div className="w-[30%] relative bg-white rounded-lg shadow-xl transform transition-all">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 id="dialog-title" className="text-base text-[20px] mb-[10px] font-bold text-gray">{isEdit ? 'Chỉnh sửa chi tiết khuyến mãi' : 'Tạo chi tiết khuyến mãi'}</h3>
                            <div className='w-full flex flex-col'>
                                { type === 1 ? <PercentOff /> : <BuyNGetM /> }
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

export default PromotionDetailModal
