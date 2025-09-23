import React, { useEffect, useState } from 'react'
import filtericon from '../assets/filtericon.png'

interface Props {
  type: string,
}

const Filter = ({ type }: Props) => {
  const [status, setStatus] = useState([''])

  useEffect(() => {
    if (type === 'trip') {
      setStatus([
        'Tất cả',
        'Hoạt động',
        'Tạm dừng',
        'Sắp khai trương',
        'Đã ngưng',
      ])
    }
    else if (type === 'bus-information') {
      setStatus([
        'Tất cả',
        'Hoạt động',
        'Bảo trì',
        'Đã ngưng',
      ])
    }
    else if (type === 'ticket') {
      setStatus([
        'Tất cả',
        'Đã trả',
        'Giữ chỗ',
        'Thất bại',
      ])
    }
  }, [])

  return (
    <form className='flex flex-row items-center rounded-[10px] p-[10px] ml-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
        <img src={filtericon} className='size=[50px]' />
        <select>
          {status.map((status) => (
            <option value="">{status}</option>
          ))}
            {/* <option>Tất cả</option>
            <option>Hoạt động</option>
            <option>Tạm dừng</option> */}
        </select>
    </form>
  )
}

export default Filter
