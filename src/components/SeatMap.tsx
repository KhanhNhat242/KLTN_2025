import drivericon from '../assets/drivericon.png'
import Seat from './Seat'

interface Props {
    isLimousine: boolean
}

const SeatMap = ({ isLimousine }: Props) => {

    return (
        <div className={`pt-[10px] pl-[10px] pb-[10px] pr-[20px] flex flex-row ${isLimousine ? 'w-[30%]' : 'w-[40%]' }`} style={{borderStyle: 'solid', borderRightColor: '#000', borderRightWidth: 2}}>
            <div className='w-[50%] flex flex-col pr-[10px]' style={{borderStyle: 'solid', borderRightColor: '#ccc', borderRightWidth: 2}}>
                <div className='w-full mb-[10px] flex flex-row justify-between items-center'>
                    <img src={drivericon} className='size-[40px]' />
                    <h2 className='font-bold text-gray'>Tầng dưới</h2>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                    </div>
                    <div className='flex flex-col'>
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                    </div>
                </div>
            </div>
            <div className='w-[50%] pl-[10px]'>
                <h2 className='h-[40px] font-bold text-right mb-[10px] pt-[10px] text-gray'>Tầng trên</h2>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                    </div>
                    <div className='flex flex-col'>
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                    </div>
                    <div className={`flex flex-col ${isLimousine && 'hidden'}`}>
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                        <Seat status={0} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatMap
