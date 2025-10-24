import { useState } from "react"
import { useDispatch } from "react-redux"
import { add, remove } from "../redux/seatListSlice"

interface Props {
    status: number,
    value: string,
}

const Seat = ({ status, value }: Props) => {
    const [type, setType] = useState<number>(status)

    const currentBg = 'bg-[#1447E6]'
    const currentTxt = 'text-white border-b-[#fff]'
    const dispatch = useDispatch()

    

    return (
        <div className={`h-[60px] p-[5px] mt-[10px] rounded-t-[10px] cursor-pointer ${type === 1 && currentBg}`} style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}} 
            onClick={() => {
                if (type === 1) {
                    setType(0) 
                    dispatch(remove(value))
                }
                else if (type === 0) {
                    setType(1)
                    dispatch(add(value))
                }
            }
        }>
            <p className={`h-[45px] mb-[10px] text-[18px] ${type === 1 ? currentTxt : 'border-b-[#000]'}`} style={{borderStyle: 'solid', borderBottomWidth: 1}}>{value}</p>
        </div>
    )
}

export default Seat
