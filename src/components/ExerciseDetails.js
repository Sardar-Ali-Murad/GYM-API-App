import React from 'react'
import {useParams,Link} from "react-router-dom"
import {optionsForGym,optionsForYoutue} from "../utils"
import equipment from "../icons/equipment.png"
import target from "../icons/target.png"


const ExerciseDetails = () => {
    let {id}=useParams()
    let [details,setDetails]=React.useState({})
    let [youtube,setYoutube]=React.useState([])

    React.useEffect(()=>{
     const start=async ()=>{
        let detail=await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, optionsForGym)

        let data=await detail.json()

        setDetails(data)
     }

     start()
    },[])

    React.useEffect(()=>{
        const start=async ()=>{
           console.log(details?.name)
    
            let vedios=await 
            fetch(`https://youtube-v31.p.rapidapi.com/search?q=${details?.name}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`, optionsForYoutue)
    
            let youtubedata=await vedios.json()
    
            setYoutube(youtubedata.items)
         }
    
         start()
    },[details] 
    
    )
  return (
    <div style={{marginTop:"100px"}}>
      <div className='details__Front section__padding'>
         <div className='image'>
            <img src={details.gifUrl} style={{width:"300px",height:"300px"}}/>
         </div>

         <div className='content'>
           <h1 className='h__Sans'>{details.name}</h1>
            <div style={{marginTop:"30px",marginBottom:"30px"}}>
               <img src={equipment}/>
               <h2 className='h__Cormorant'>{details.equipment}</h2>
            </div>
            <div style={{marginTop:"30px",marginBottom:"30px"}}>
               <img src={target}/>
               <h2 className='h__Cormorant'>{details.target}</h2>
            </div>
         </div>
      </div>

      <div className='youtube__Vedios '>
         {
            youtube.slice(0,10).map((all)=>{
                return(
                    <div style={{marginRight:"10px"}}>
                           <iframe
      style={{marginRight:"10px"}}
      src={`https://www.youtube.com/embed/${all?.id?.videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <p className='p__Sans'>{all?.snippet?.title}</p>
                    </div>
                )
            })
         }
      </div>
      <Link style={{textDecoration:"none",marginLeft:"40%",marginBottom:"50px",marginTop:"50px"}} to="/" className='custom__Btn'>Back Home</Link>
    </div>
  )
}

export default ExerciseDetails
