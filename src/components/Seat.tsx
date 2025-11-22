import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { add, remove } from "../redux/seatListSlice"
import type { Seat } from "../interface/Interface"

interface sl {
    seatno: string,
    status: number,
}

interface Props {
    value: string,
    seats: sl[],
}

const Seat = ({ value, seats }: Props) => {
    const [type, setType] = useState<number>(0)
    const [bg, setBg] = useState<string>('')
    const [txt, setTxt] = useState<string>('')
    const [sl, setSl] = useState<string[]>()

    // const currentBg = 'bg-[#1447E6]'
    // const currentTxt = 'text-white border-b-[#fff]'
    // const redBg = 'bg-[red]'
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('seats', seats)
        const arrSeats: sl[] = Array.isArray(seats) ? seats : Object.values(seats)
        const s1 = arrSeats
            .filter(item => item.status === 1)
            .map(item => item.seatno)
        // console.log('s1', s1)
        setSl(s1)
    }, [seats])

    useEffect(() => {
        console.log('seattttt', sl)
        const result = sl?.find(item => item === value)
        if (result !== undefined) {
            // setType(2)
            setBg('bg-[red]')
            setTxt('text-white')
        }
    }, [sl])

    useEffect(() => {
        console.log(type)
        if (type === 0) {
            setBg('bg-[white]')
            setTxt('text-[#000]')
        }
        else if (type === 1) {
            setBg('bg-[#1447E6]')
            setTxt('text-white')
        }
        // else if (type === 2) {
        //     setBg('bg-[red]')
        //     setTxt('text-white')
        // }
    }, [])

    return (
        <div className={`h-[70px] p-[5px] mt-[10px] rounded-t-[10px] cursor-pointer ${bg}`} style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}} 
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
            <p className={`h-[45px] mb-[10px] text-[18px] ${txt}`} style={{borderStyle: 'solid', borderBottomWidth: 1}}>{value}</p>
        </div>
    )
}

export default Seat
