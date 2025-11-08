import React, { useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'

const TicketOccasion = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý bảng giá</h2>
                <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <button className='p-[10px] flex flex-row items-center mr-[10px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
                    <img src={downloadicon} className='size-[20px] mr-[5px]' />
                    <p>Xuất Excel</p>
                    </button>
                    <button className='p-[10px] cursor-pointer text-white bg-[#1447E6] rounded-[10px]'
                    onClick={() => {
                        setIsEdit(false)
                        setIsOpen(true)
                    }}>+ Tạo vé mới</button>
                </div>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="p-3 border-b">Mã vé</th>
                        <th className="p-3 border-b">Tuyến</th>
                        <th className="p-3 border-b">Loại xe</th>
                        <th className="p-3 border-b">Giá vé cơ bản</th>
                        <th className="p-3 border-b">Giá vé áp dụng</th>
                        <th className="p-3 border-b">Bắt đầu</th>
                        <th className="p-3 border-b">Kết thúc</th>
                        {/* <th className="p-3 border-b">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {tickets.map((ticket) => (
                            <tr key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                            <td className="p-3 border-b">{ticket.id}</td>
                            <td className="p-3 border-b">{`${ticket.trip?.route.origin.address.ward.district.province.name} - ${ticket.trip?.route.destination.address.ward.district.province.name}`}</td>
                            <td className="p-3 border-b">{ticket.trip?.vehicle.type}</td>
                            <td className="p-3 border-b">{(Number(ticket.trip?.route.baseFare) * 1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                            <td className="p-3 border-b">{(Number(ticket.trip?.route.baseFare) * Number(ticket.trip?.vehicle.typeFactor) * 1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                            <td className="p-3 border-b">{formatTimestamp(Number(ticket.timeFrom))}</td>
                            <td className="p-3 border-b">{formatTimestamp(Number(ticket.timeTo))}</td>
                            <td className="p-3 border-b space-x-2">
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" 
                                onClick={() => {
                                    setIsOpen(true)
                                    setIsEdit(true)
                                }}>Sửa</button>
                                <button className="p-[5px] cursor-pointer text-blue-600 hover:underline" onClick={() => setIsDelete(true)}>Xóa</button>
                            </td>
                            </tr>
                        ))} */}
                    </tbody>
                    </table>
                </div>
                </div>
                {/* {isOpen && (isEdit ? <TicketModal isEdit={true} setIsOpen={setIsOpen} /> : <TicketModal isEdit={false} setIsOpen={setIsOpen} /> ) }
                {isDelete && <DeleteMocal setIsDelete={setIsDelete} />}  */}
            </div>
    )
}

export default TicketOccasion
