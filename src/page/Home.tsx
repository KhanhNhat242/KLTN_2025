import axios from "axios"
import Header from "../components/Header"
import HeaderTop from "../components/HeaderTop"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { setBills } from "../redux/billSlice"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import FilterBill from "../components/FilterBill"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê doanh thu theo tháng',
    },
  },
};

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

const Home = () => {
    const [ds, setDs] = useState<number[]>([])
    const [data, setData] = useState<any>(null)
    const [quantity, setQuantity] = useState<number>(0)
    const [currentRevenue, setCurrentRevenue] = useState<number>(0)

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const bills = useSelector((state: RootState) => state.bill)

    const getData = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(setBills(res.data))
        })
        .catch(() => {
            console.log('Get data fail!')
        })
    }

    const handleDataset = () => {
        const result = Array(12).fill(0)
        const today = new Date().toISOString().slice(0, 10)
        let q = 0
        let c = 0
        bills.forEach((b) => {
            if (b.id > 1500) {
                const month = new Date(b.bookedAt * 1000).getMonth()
                // console.log('amount', b.totalAmount)
                result[month] += b.totalAmount*1000
                q = q + b.quantity
                const date = new Date(b.bookedAt * 1000).toISOString().slice(0, 10)
                if (date === today) {
                    c = c + b.totalAmount
                }
            }
        })
        // console.log('rrr', result)
        setDs(result)
        setQuantity(q)
        setCurrentRevenue(c)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        console.log(bills)
        handleDataset()
    }, [bills])

    useEffect(() => {
        console.log('state', ds)
        if (ds.length === 12 && bills.length > 0) {
            setData({
                labels,
                datasets: [
                    {
                        label: "Doanh thu",
                        data: ds,
                        backgroundColor: "#1447E6",
                    },
                ],
            })
        }
    }, [ds])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]  '>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Dashboard</h2>
                <div className='w-full flex flex-col justify-between'>
                    <div className="w-full flex flex-row mb-[20px]">
                        {/* <div className="p-[20px] rounded-[10px] shadow-lg shadow-[#ccc]-500/50">
                            <p>Doanh thu hôm nay</p>
                            <h2 className="text-[20px] text-[green] font-bold">{(currentRevenue*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h2>
                        </div>
                        <div className="p-[20px] rounded-[10px] mx-[20px] shadow-lg shadow-[#ccc]-500/50">
                            <p>Số vé đã bán</p>
                            <h2 className="text-[20px] text-[blue] font-bold">{quantity} vé</h2>
                        </div> */}
                        <FilterBill />
                    </div>
                    {/* <h2>Dashboard</h2> */}
                    {data && <Bar options={options} data={data} />}
                </div>
                <div className='mt-[20px]'>
                </div>
                </div>
            </div>
    )
}

export default Home
