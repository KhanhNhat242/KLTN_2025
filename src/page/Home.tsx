import Header from "../components/Header"
import HeaderTop from "../components/HeaderTop"


const Home = () => {
    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Tổng quan</h2>
                <div className='w-full flex flex-row justify-between'>
                    <h2>Dashboard</h2>
                </div>
                <div className='mt-[20px]'>
                </div>
                </div>
            </div>
    )
}

export default Home
