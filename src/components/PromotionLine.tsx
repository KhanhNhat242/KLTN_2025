import { useEffect, useState } from 'react'
import DeleteModal from './DeleteModal'
import PromotionDetailModal from './PromotionDetailModal'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import {type PromotionLine} from '../interface/Interface'

const PromotionLine = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [type, setType] = useState<number>(0)
    const [selectedLine, setSelectedLine] = useState<PromotionLine>()

    const buyngetms = useSelector((state: RootState) => state.buyNgetMs)
    const percentoffs = useSelector((state: RootState) => state.percentOffS)

    useEffect(() => {
        console.log(buyngetms, percentoffs)
    })

    return (
        <div className='w-full pl-[20px]'>
            <div className='w-full flex flex-row justify-between'>
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Chi tiết khuyến mãi</h2>
                <div>
                    <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'
                        onClick={() => {
                            setType(1)
                            setIsOpen(true)
                            setIsEdit(false)
                        }}
                    >+ Tạo KM chiết khấu</button>
                    <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px] ml-[10px]' 
                        onClick={() => {
                            setType(2)
                            setIsOpen(true)
                            setIsEdit(false)
                        }}
                    >+ Tạo KM Mua n tặng m</button>
                </div>
            </div>
            <table className="w-full border border-gray-200 rounded-[10px] text-left">
              <thead className="bg-[white]">
                <tr>
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Loại khuyến mãi</th>
                  <th className="p-3 border-b">Mô tả</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buyngetms.map((b) => (
                    <tr key={b.id} className="cursor-pointer hover:bg-gray-50">
                      <td className="p-3 border-b">{`B${b.id}`}</td>
                      <td className="p-3 border-b">Mua N vé tặng M vé</td>
                      <td className="p-3 border-b">{`Mua ${b.buyN} được tặng ${b.getM} vé`}</td>
                      <td className="p-3 border-b space-x-2">
                        <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                          onClick={() => {
                            setType(2)
                            setSelectedLine(b)
                            setIsOpen(true)
                            setIsEdit(true)
                          }}>Sửa</button>
                        <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                      </td>
                    </tr>
                ))}
                {percentoffs.map((p) => (
                    <tr key={p.id} className="cursor-pointer hover:bg-gray-50">
                      <td className="p-3 border-b">{`P${p.id}`}</td>
                      <td className="p-3 border-b">Chiết khấu theo phần trăm hóa đơn</td>
                      <td className="p-3 border-b">{`Giảm ${p.percent}% cho hóa đơn tối thiểu ${(p.minPrice).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}, giảm tối đa ${(p.maxOff).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}`}</td>
                      <td className="p-3 border-b space-x-2">
                        <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                          onClick={() => {
                            setSelectedLine(p)
                            setType(1)
                            setIsOpen(true)
                            setIsEdit(true)
                          }}>Sửa</button>
                        <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            {isOpen && (isEdit ? <PromotionDetailModal isEdit={true} setIsOpen={setIsOpen} type={type} selectedLine={selectedLine} /> : <PromotionDetailModal isEdit={false} setIsOpen={setIsOpen} type={type} /> ) }
            {isDelete && <DeleteModal setIsDelete={setIsDelete} />} 
          </div>
    )
}

export default PromotionLine
