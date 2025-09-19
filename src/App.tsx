import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Trip from './page/Trip'
import BusInformation from './page/BusInformation'
import Ticket from './page/Ticket'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/trip' element={<Trip />}/>
          <Route path='/bus-information' element={<BusInformation />}/>
          <Route path='/ticket' element={<Ticket />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
