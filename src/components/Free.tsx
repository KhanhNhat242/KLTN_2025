import React from 'react'

interface Props {
    source: string,
    txt: string,
}

const Free = ({ source, txt }: Props) => {
  return (
    <div className='flex flex-row pl-[5px] pr-[5px] rounded-[5px] mr-[5px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}>
      <img src={source} alt='img' className='mr-[2px]' />
      <p>{txt}</p>
    </div>
  )
}

export default Free
