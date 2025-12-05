import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { add, remove } from "../redux/seatListSlice"

interface Props {
    value: string,
    isLock: boolean,
}

const Seat = ({ value, isLock }: Props) => {
    const [type, setType] = useState<number>(0)
    const [bg, setBg] = useState<string>('')
    const [txt, setTxt] = useState<string>('')

    // const currentBg = 'bg-[#1447E6]'
    // const currentTxt = 'text-white border-b-[#fff]'
    // const redBg = 'bg-[red]'
    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log('lock', isLock)
    //     if (isLock === true) {
    //         setBg('bg-[red]')
    //         setTxt('text-white')
    //     }
    // }, [])

    useEffect(() => {
        if (type === 0) {
            setBg('bg-[white]')
            setTxt('text-[#000]')
        }
        else if (type === 1) {
            setBg('bg-[#1447E6]')
            setTxt('text-white')
        }
    }, [type])

    return (
        <div className={`h-[70px] p-[5px] mt-[10px] rounded-t-[10px] cursor-pointer ${isLock ? 'bg-[red]' : bg}`} style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}} 
            onClick={() => {
                if (type === 1) {
                    setType(0) 
                    dispatch(remove(value))
                }
                else if (type === 0 && isLock === false) {
                    setType(1)
                    dispatch(add(value))
                }
            }
        }>
            <p className={`h-[45px] mb-[10px] text-[18px] ${isLock ? 'text-[white]': txt}`} style={{borderStyle: 'solid', borderBottomWidth: 1}}>{value}</p>
        </div>
    )
}

export default Seat
