import logo from './logo.svg';
import './App.css';

import {Home,ExerciseDetails} from "./components/index.js"
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {

  return (
    <div>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/details/:id" element={<ExerciseDetails/>}/>
       </Routes>
      </BrowserRouter>
      
        
    </div>
  );
}

export default App;
