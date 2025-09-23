import { useState } from "react"

interface Props {
    status: number,
}

const Seat = ({ status }: Props) => {
    const [type, setType] = useState<number>(status)

    const currentBg = 'bg-[#1447E6]'
    const currentTxt = 'text-white border-b-[#fff]'

    return (
        <div className={`h-[60px] p-[5px] mt-[10px] rounded-t-[10px] cursor-pointer ${type === 1 && currentBg}`} style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}} onClick={() => type === 1 ? setType(0) : setType(1)}>
            <p className={`h-[45px] mb-[10px] text-[18px] ${type === 1 ? currentTxt : 'border-b-[#000]'}`} style={{borderStyle: 'solid', borderBottomWidth: 1}}>A22</p>
        </div>
    )
}

export default Seat
