import React from 'react'
import {optionsForGym} from "../utils"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";


const HomeExercises = () => {
    let [parts,setParts]=React.useState([])
    let [partExercises,setPartExercises]=React.useState([])
    let [bodyPart,setBodyPart]=React.useState("chest")
    let [loading,SetLoading]=React.useState(true)
    
    let countNumber=Math.ceil(partExercises.length/8)

    const [page, setPage] = React.useState(0);
    const handleChange = (event, value) => {
      setPage(value);
    };
  
    
    
    React.useEffect(()=>{
     const start=async ()=>{
        let partsFetch=await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', optionsForGym)

        let finalParts=await partsFetch.json()

        setParts(finalParts)

        let exerciseByPart=await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, optionsForGym)

        let exercises=await exerciseByPart.json()

        setPartExercises(exercises)
        SetLoading(false)
    }
    
    start()
},[bodyPart])

console.log(bodyPart)



const theme = useTheme();
const [activeStep, setActiveStep] = React.useState(0);
const maxSteps = parts.length;

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

function handlePart(part){
   setBodyPart(part)
   setPage(0)
}  
  return (
    <div>
      
    <div style={{marginBottom:"100px"}}>
    <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography className='h__Sans' style={{textAlign:"center",marginLeft:"48%",fontSize:"23px",color:"red",cursor:"pointer"}} onClick={()=>handlePart(parts[activeStep])}>
            {parts[activeStep]}
            
            </Typography>
      </Paper>
     
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>

    <div className='part__Exercises'>
       {
       loading?   <CircularProgress />: partExercises.slice(page*10,page*10+10).map((all)=>{
           return(
            <Link style={{textDecoration:"none"}} to={`/details/${all.id}`}>
          <Card style={{cursor:"pointer",textDecoration:"none"}}>
               <img src={all?.gifUrl} style={{width:"100%",marginBottom:"20px",height:"200px",width:"200px"}}/>
               <div style={{marginLeft:"30px",marginBottom:"30px"}}>
                   <Button color="secondary">{all?.target}</Button>
                  <Button color="error">{all?.bodyPart}</Button>
               </div>
               <p className='p__Sans' style={{padding:"0px 5px",color:"lightgray",textDecoration:"none",textAlign:"center",marginBottom:"20px"}}>{all?.name}</p>
          </Card>
            </Link>
           ) 
        })
       }
    </div>
         <Pagination style={{marginLeft:"50px",marginBottom:"60px",marginTop:"60px"}} count={countNumber} page={page} onChange={handleChange} />


    </div>
  )
}

export default HomeExercises
