import React, { useEffect, useState } from 'react'
import './project.css'
import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'
const Project = () => {
 
    const params = useParams()
    const [projectId, setProjectId] = useState(params.projectId)

const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [currentmessage, setcurrentMessage] = useState("")


    function appendMessage(msg){
       setMessages([...messages, msg])
    }


    useEffect(()=>{
        const tempSocket = io("http://localhost:3001",{
            query:{
                projectId
            }
        })

        tempSocket.on('message', msg=>{
            appendMessage(msg)
        })

        setSocket(tempSocket)
    },[])

  return (
    <main>
        <section className="project-view">
            <div className="conversation">
                {messages.map((message, index)=>{
                    return(
                        <div className="message">
                            <p>{message}</p>
                        </div>
                    )
                })}
                <div className="input-group">
                    <input value={currentmessage} onChange={(e)=>{setcurrentMessage(e.target.value)}} type="text" placeholder='Enter message' />
                    <button onClick={()=>{
                        socket.emit('message', currentmessage)
                     appendMessage(currentmessage)
                     setcurrentMessage("")
                    }}><i className="ri-send-plane-fill"></i></button>
                </div>
            </div>
            <div className="code"></div>
            <div className="review"></div>
        </section>
    </main>
  )
}

export default Project
