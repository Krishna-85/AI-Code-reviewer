import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectName, setProjectName] = useState('')


    function handleSubmit(e){
        e.preventDefault()
        setIsModalOpen(false)

        axios.post('http://localhost:3001/v1/api/projects/create',{
            name:projectName
        }).then(response=>{
            console.log(response.data)
          getProjects()
        })
    }

    function getProjects(){
        axios.get('http://localhost:3001/v1/api/projects/list')
    .then((response)=>{
        setProjects(response.data.projects)
        // console.log(response.data)
    })
    }

useEffect(()=>{
    getProjects()
},[])
   
  return (
     <main>
        <section className='home-view'>
           <div className="projects">
            {
                projects.map((project, index)=>{
                    return (
                        <div  onClick={()=>{navigate(`/project/${project._id}`)}} className="project">
                            <h1>{project.name}</h1>
                        </div>
                    )
                })
            }
              
            <button onClick={()=>{setIsModalOpen(true)}} className="new-project">
                new project
            </button>
           </div>

           { isModalOpen && <div className="modal">
            <form onSubmit={handleSubmit}>
                <input value={projectName} onChange={(e)=>{setProjectName(e.target.value)}} type="text" name="name" placeholder='EnterYour Project name' />
                <input type="submit" value={"create Project"} />
            </form>
           </div>}
        </section>
     </main>
  )
}

export default Home
