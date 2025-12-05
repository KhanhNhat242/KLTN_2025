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

const option1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê doanh thu theo ngày trong tháng',
    },
  },
};

const option2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê số lượng vé đã bán',
    },
  },
};

const option3 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê số lượng vé đã bán theo ngày trong tháng',
    },
  },
};

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
const dateLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

const Home = () => {
    const [ds, setDs] = useState<number[]>([])
    const [ds2, setDs2] = useState<number[]>([])
    const [ds3, setDs3] = useState<number[]>([])
    const [dateData, setDateData] = useState<number[]>([])
    const [data, setData] = useState<any>(null)
    const [data2, setData2] = useState<any>(null)
    const [count, setCount] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const bills = useSelector((state: RootState) => state.bill)

    const getData = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings?page=0&size=65', {
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
        const rs2 = Array(12).fill(0)
        // console.log('bills', bills)
        bills.forEach((b) => {
            if (b.id > 1500) {
                const month = new Date(b.bookedAt * 1000).getMonth()
                result[month] += b.totalAmount
                rs2[month] += b.quantity
            }
        })
        // console.log('rrr', result)
        setDs(result)
        setDs2(rs2)
    }

    const handleFilter = () => {
        const result = Array(31).fill(0)
        const rs2 = Array(31).fill(0)

        bills.forEach((b) => {
            if (b.id > 1500) {
                const day = new Date(b.bookedAt * 1000).getDay()
                console.log('amount', b.totalAmount)
                result[day] += b.totalAmount
                rs2[day] += b.quantity
            }
        })
        setDateData(result)
        setDs3(rs2)
    }

    useEffect(() => {
        getData()
        console.log(startDate, endDate)
    }, [])

    useEffect(() => {
        console.log(bills)
        if (count === 0) {
            handleDataset()
        }
        else if (count === 1) {
            handleFilter()
        }
    }, [bills, count])

    useEffect(() => {
        console.log('state1', ds)
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
        if (ds2.length === 12 && bills.length > 0) {
            setData2({
                labels,
                datasets: [
                    {
                        label: "Số vé đã bán",
                        data: ds2,
                        backgroundColor: "purple",
                    },
                ],
            })
        }
    }, [ds, ds2])

    useEffect(() => {
        console.log('state2', dateData)
        if (dateData.length === 31 && bills.length > 0) {
            setData({
                labels: dateLabels,
                datasets: [
                    {
                        label: "Doanh thu",
                        data: dateData,
                        backgroundColor: "#1447E6",
                    },
                ],
            })
        }
        if (ds3.length === 31 && bills.length > 0) {
            setData2({
                labels: dateLabels,
                datasets: [
                    {
                        label: "Số vé đã bán",
                        data: ds3,
                        backgroundColor: "purple",
                    },
                ],
            })
        }
    }, [dateData, ds3])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]  '>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Dashboard</h2>
                <div className='w-full flex flex-col justify-between'>
                    <div className="w-full flex flex-row mb-[20px]">
                        <FilterBill setCount={setCount} setSD={setStartDate} setED={setEndDate} />
                    </div>
                    {/* <h2>Dashboard</h2> */}
                    {data && count === 0 && <Bar options={options} data={data} />}
                    {dateData && count === 1 && <Bar options={option1} data={data} />}
                    {data2 && count === 0 && <Bar options={option2} data={data2} />}
                    {ds3 && count === 1 && <Bar options={option3} data={data2} />}
                </div>
                <div className='mt-[20px]'>
                </div>
                </div>
            </div>
    )
}

export default Home
