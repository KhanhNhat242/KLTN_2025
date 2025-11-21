import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Trip from './page/Trip'
import Bus from './page/Bus'
import Ticket from './page/Ticket'
import Promotion from './page/Promotion'
import BusDetail from './page/BusDetail'
import Login from './page/Login'
import Station from './page/Station'
import Routee from './page/Route'
import Payment from './page/Payment'
import { useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken } from './redux/authSlice'
import Schedule from './page/Schedule'
import TicketPrice from './page/TicketPrice'
import Driver from './page/Driver'
import Attendant from './page/Attendant'
import Employees from './page/Employees'

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
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/bus-detail" element={<BusDetail />} />
          <Route path="/station" element={<Station />} />
          <Route path="/route" element={<Routee />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/ticket-price" element={<TicketPrice />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/attendant" element={<Attendant />} />
          <Route path="/employee" element={<Employees />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
