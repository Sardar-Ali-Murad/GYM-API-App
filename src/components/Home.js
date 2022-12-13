import React from 'react'
import "./index.css"

import banner from "../images/banner.png"
// import Logo1 from "../images/Logo-1.png"
// import Logo from "../images/Logo.png"

import HomeExercises from "./HomeExercises"
// import Button from '@mui/material/Button';


const Home = () => {
   

  return (
    <div className='section__padding'>
    <section className="section1">
   <div>
     <nav>
       <a className="home">Home</a>
       <a href='#'>Exercise</a>
     </nav>
     
     <div className="homesecond h__Sans">
       <p className="homepara">Fitness Club</p>
       <h1>Sweet,Smile</h1>
       <h1>And Repeat</h1>
       <p>Check the most effective exercises personalized to you</p>
       <button className="btn btn-outline-primary custom__Btn " style={{marginTop:"16px"}}>See More</button>
     </div>
     
     
   </div>
   
   <div className="homeimage">
     <img alt="" src={banner}/>
   </div>
    </section> 
    
    <h1 className='head h__Cormorant'>Owsomne Exercises for you <br/> To know</h1>
    
    <HomeExercises />
   


</div>
  )
}

export default Home
