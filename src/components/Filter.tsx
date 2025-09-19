import React from 'react'
import filtericon from '../assets/filtericon.png'

const Filter = () => {
  return (
    <form className='flex flex-row items-center rounded-[10px] p-[10px] ml-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
        <img src={filtericon} className='size=[50px]' />
        <select>
            <option>Tất cả</option>
            <option>Hoạt động</option>
            <option>Tạm dừng</option>
        </select>
    </form>
  )
}

export default Filter
