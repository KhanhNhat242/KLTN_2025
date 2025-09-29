import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Trip from './page/Trip'
import BusInformation from './page/BusInformation'
import Ticket from './page/Ticket'
import Promotion from './page/Promotion'
import BusDetail from './page/BusDetail'
import Login from './page/Login'
import { useState } from 'react'

function App() {
  const [accesstoken, setAccesstoken] = useState<string>('')

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/log-in' element={<Login setAccesstoken={setAccesstoken} />}/>
          <Route path='/trip' element={<Trip />}/>
          <Route path='/bus-information' element={<BusInformation />}/>
          <Route path='/ticket' element={<Ticket />}/>
          <Route path='/promotion' element={<Promotion accesstoken={accesstoken} />} />
          <Route path='/bus-detail' element={<BusDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
