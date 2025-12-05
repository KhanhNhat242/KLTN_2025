import React from 'react'
import chatbotlogo from '../assets/chatbotlogo.png'

interface Props {
    content: string,
    isBot: boolean,
}

const Message = ({ content, isBot }: Props) => {
    return (
        <>
            {
                isBot ? (
                    <div className='w-[90%] flex flex-row items-end my-[20px]'>
                        <img src={chatbotlogo} className='size-[50px]' />
                        <p className='rounded-[10px] mb-[10px] mr-[10px] p-[10px] text-left' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#1447E6'}}>{content}</p>
                    </div>
                ) : (
                    <div className='w-full flex flex-row justify-end my-[20px]'>
                        <p className='bg-[#1447E6] rounded-[10px] p-[10px] text-white text-right mr-[10px] ml-[50px]'>{content}</p>
                    </div>
                )
            }
        </>
    )
}

export default Message
