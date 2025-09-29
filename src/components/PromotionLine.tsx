import React from 'react'



const PromotionLine = () => {
    return (
        <div className='w-full  border-t-[#ccc]'>
            <div className='cursor-pointer py-[5px] hover:bg-gray-50'>
                <p className='pl-[40px]'>- Mua N vé tặng M vé</p>
                <p className='pl-[60px]'>Số lượng: 0</p>
            </div>
            <div className='cursor-pointer py-[5px] hover:bg-gray-50'>
                <p className='pl-[40px]'>- Chiết khấu theo phần trăm hóa đơn</p>
                <p className='pl-[60px]'>Số lượng: 0</p>
            </div>
        </div>
    )
}

export default PromotionLine
