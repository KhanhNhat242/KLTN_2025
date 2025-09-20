import React from 'react'

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const PromotionModal = ({ setIsOpen }: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsOpen(false)}></div>
            <div className="w-[50%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 id="dialog-title" className="text-base text-[20px] font-bold text-gray">Tạo khuyến mãi mới</h3>
                        <div className='w-full flex flex-row mt-[10px] mb-[10px]'>
                            <div>
                                <p>Mã loại KM</p>
                                <input placeholder='1111' />
                            </div>
                            <div>
                                <p>Loại khuyến mãi</p>
                                <select>
                                    <option value="">Giảm giá theo số tiền hóa đơn</option>
                                    <option value="">Mua 3 vé tặng 1 vé</option>
                                </select>
                            </div>
                            <div>
                                <p>Ghi chú</p>
                                <input placeholder='' />
                            </div>
                        </div>
                        <table className='w-full border border-gray-200 text-left'>
                            <thead>
                                <tr>
                                    <th className="p-3 border-b">SL MIN</th>
                                    <th className="p-3 border-b">SL MAX</th>
                                    <th className="p-3 border-b">Tiền giảm</th>
                                    <th className="p-3 border-b">Tối đa</th>
                                    <th className="p-3 border-b">Ghi chú</th>
                                    <th className="p-3 border-b">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3 border-b">1</td>
                                    <td className="p-3 border-b">1</td>
                                    <td className="p-3 border-b">50000</td>
                                    <td className="p-3 border-b">70000</td>
                                    <td className="p-3 border-b">Giảm 20000/vé</td>
                                    <td className="p-3 border-b">
                                        <button className="text-blue-600 hover:underline">Sửa</button>
                                        <button className="text-blue-600 hover:underline ml-[10px]">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsOpen(false)} className="w-[10%] p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button onClick={() => setIsOpen(false)} className="w-[10%] p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer">
                        Xác nhận
                    </button>
                </div>
            </div>
            </div>
    )
}

export default PromotionModal
