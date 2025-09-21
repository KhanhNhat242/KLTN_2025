import React, { useState } from 'react'

interface Props {
    status: number,
}

const Seat = ({ status }: Props) => {
    const [type, setType] = useState<number>(status)

    const currentBg = 'bg-[#1447E6]'
    const currentTxt = 'text-white'

    return (
        <div className={`h-[55px] mt-[10px] rounded-t-[10px] cursor-pointer ${type === 1 && currentBg}`} style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}} onClick={() => type === 1 ? setType(0) : setType(1)}>
            <p className={`p-[4px] ${type === 1 && currentTxt}`}>A22</p>
            <p className={`font-bol ${type === 1 && currentTxt}`}>____</p>
        </div>
    )
}

export default Seat
