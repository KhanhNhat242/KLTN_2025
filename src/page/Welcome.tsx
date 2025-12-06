import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Welcome = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/log-in')
    }, [])

    return (
        <div>
        <h2>Hello world</h2>
        </div>
    )
}

export default Welcome
