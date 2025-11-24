import React, { useState } from 'react'
import chatbotlogo from '../assets/chatbotlogo.png'
import closeicon from '../assets/closeicon.png'
import sendicon from '../assets/sendicon.png'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import axios from 'axios'
import { add } from '../redux/messageSlice'

// const messages = [
//     {content: 'Hi bot', isBot: false},
//     {content: 'Message from bot', isBot: true},
// ]

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const dispatch = useDispatch()
    const messages = useSelector((state: RootState) => state.message)
    const token = useSelector((state: RootState) => state.auth.accessToken)

    const handleSendMessage = async () => {
        await axios.post('https://apigateway.microservices.appf4s.io.vn/services/msuser/api/chatbot/chat', {
            "message": message,
            "sessionId": "string",
            "userId": "string"
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            dispatch(add({ content: res.data.message, isBot: true }))
        })
        .catch(() => {
            alert('Error when send message')
        })
    }

    return (
        <div className='flex flex-row items-end'>
            <img src={chatbotlogo} className='size-[80px] cursor-pointer rounded-[50%]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#1447E6'}} 
                onClick={() => {
                    if (isOpen === false) {
                        setIsOpen(true)
                    }
                    else if (isOpen === true) {
                        setIsOpen(false)
                    }
                }}/>
            {
                isOpen && (
                    <div className='w-[25vw] h-[65vh] flex flex-col bg-[#fff] rounded-[10px] ml-[10px]' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#1447E6'}}>
                        <div className='p-[10px] flex flex-row justify-between items-center bg-[#1447E6]'>
                            <h2 className='text-white text-[20px] font-bold'>Chatbot</h2>
                            <img src={closeicon} className='size-[40px] cursor-pointer' onClick={() => setIsOpen(false)} />
                        </div>
                        <div className='w-full h-[52vh] flex flex-col justify-between'>
                            <div className='w-full h-[90%] overflow-y-auto'>
                                {messages.length >= 1 && messages.map((m) => (
                                    <Message content={m.content} isBot={m.isBot} />
                                ))}
                            </div>
                        </div>
                        <div className='w-full p-[10px] relative'>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-full p-[10px] rounded-[10px]' type="text" placeholder='Nhập nội dung tin nhắn' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}/>
                            <img src={sendicon} className='size-[30px] absolute bottom-[16px] right-[20px] cursor-pointer'
                                onClick={() => {
                                    dispatch(add({ content: message, isBot: false }))
                                    handleSendMessage()
                                    setMessage('')
                                }}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Chatbot
