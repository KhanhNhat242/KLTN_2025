import searchicon from '../assets/searchicon.png'

interface Props {
    placeholder: string
}

const Search = ({ placeholder }: Props) => {
  return (
    <div className='w-[20vw] bg-[#E5E7EB] flex flex-row items-center relative rounded-[10px]'>
        <img src={searchicon} className='size-[20px] left-[10px] absolute' />
        <input placeholder={placeholder} className='w-full pt-[10px] pb-[10px] pr-[10px] pl-[40px] rounded-[10px]' />
    </div>
  )
}

export default Search
