import * as mobilenet from "@tensorflow-models/mobilenet";
import React, {useState, useEffect, useRef} from 'react'
import UserContext from "./UserContext";
import Main from './Main'
// import './index.css'



function App() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [results, setResults] = useState([])


  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();
  //tensorflow state management
  const loadModel = async () =>{
    setIsModelLoading(true)
    try{
      const model = await mobilenet.load()
      setModel(model)
      setIsModelLoading(false)
    } catch (error) {
      console.log(error)
      setIsModelLoading(false)
    }
  }

  

  useEffect(()=>{
    loadModel()
  },[])

  if(isModelLoading){
    return <div className="container">
      <div className="row align-items-center">
      <p  class="text-center fs-1">Mr AI/ML is preparing a cup of coffee.. Please wait.</p>
      </div>
      </div>
  }
      

  console.log(results)


  
  return (
    <UserContext.Provider
    value={{isModelLoading, setIsModelLoading, model, setModel, imageURL, setImageURL, results, setResults, imageRef, textInputRef, fileInputRef

    }} >

    
    <div><Main /></div>

    
    </UserContext.Provider>
  
  );
}





export default App;
