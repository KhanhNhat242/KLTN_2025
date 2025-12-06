import './App.css'
import { BrowserRouter as Router, Routes, Route as Routee } from 'react-router-dom'
import Home from './page/Home'
import Trip from './page/Trip'
import Bus from './page/Bus'
import Ticket from './page/Ticket'
import Promotion from './page/Promotion'
import BusDetail from './page/BusDetail'
import Login from './page/Login'
import Station from './page/Station'
import Route from './page/Route'
import Payment from './page/Payment'
import { useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken } from './redux/authSlice'
import Schedule from './page/Schedule'
import TicketPrice from './page/TicketPrice'
import Driver from './page/Driver'
import Attendant from './page/Attendant'
import Bill from './page/Bill'
import Booking from './page/Booking'
import Customer from './page/Customer'
import Welcome from './page/Welcome'

function App() {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  const dispatch = useDispatch()

  if (accessToken && refreshToken) {
    dispatch(setAccessToken(accessToken))
    dispatch(setRefreshToken(refreshToken))
  }

  return (
    <>
      <Router>
        <Routes>
          <Routee path='/' element={<Welcome />}/>
          <Routee path='/log-in' element={<Login />}/>
          <Routee path='/home' element={<Home />}/>
          <Routee path='/trip' element={<Trip />}/>
          <Routee path='/bus' element={<Bus />}/>
          <Routee path='/ticket' element={<Ticket />}/>
          <Routee path='/promotion' element={<Promotion />} />
          <Routee path='/bus-detail' element={<BusDetail />} />
          <Routee path='/station' element={<Station />} />
          <Routee path='/route' element={<Route />} />
          <Routee path='/payment' element={<Payment />} />
          <Routee path='/schedule' element={<Schedule />} />
          <Routee path='/ticket-price' element={<TicketPrice />} />
          <Routee path='/driver' element={<Driver />} />
          <Routee path='/attendant' element={<Attendant />} />
          <Routee path='/bill' element={<Bill />} />
          <Routee path='/booking' element={<Booking />} />
          <Routee path='/customer' element={<Customer />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
