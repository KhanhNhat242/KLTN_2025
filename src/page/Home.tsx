import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useEffect } from "react"

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/log-in')
    }, [])

    return (
        <div className="w-full flex flex-row">
            <Header />
            <p>hello world</p>
        </div>
    )
}

export default Home
