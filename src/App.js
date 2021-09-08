import * as mobilenet from "@tensorflow-models/mobilenet";
import React, {useState, useEffect, useRef} from 'react'
import UserContext from "./UserContext";
import Button from "./Button";
import './index.css'
// import Voice from "./Voice"
import spoken from '../node_modules/spoken/build/spoken.js';



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

  

//function that submits the photo to the 
  const uploadImage = (e)=>{
    console.log(e);
    const {files} = e.target
    if(files.length > 0){
      const url= URL.createObjectURL(files[0])
      setImageURL(url)
    } else{
      setImageURL(null)
    }
  }


//submit photos from local machine
const handleOnchange = (e) => {
  setImageURL(e.target.value)
  setResults([])
}
  useEffect(()=>{
    loadModel()
  },[])

  if(isModelLoading){
    return <h2>Mr AI/ML is preparing a cup of coffee.. Please wait.</h2>
  }

  console.log(results)


  
  return (
    <UserContext.Provider
    value={{isModelLoading, setIsModelLoading, model, setModel, imageURL, setImageURL, results, setResults, imageRef, textInputRef, fileInputRef

    }} >

    
    <div> 
    
      <h1>This app can tell you what is in a photo.</h1>
      <div className="inputHolder"> <input type='file' accept='image' className="uploadInput" onChange={uploadImage} ref={fileInputRef}></input></div>
      <input type="text" placeholder="or upload image URL" ref={textInputRef} onChange={handleOnchange}></input>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder"> {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}</div>
        </div>


        <div>

        {results.length > 0 && <div className='resultsHolder'>
          
                        {results.map((result, index) => {
                            spoken.say(result.className)

                            return (
                                <div className='result' key="className"> 
                                    <div className='name'>{result.className}</div>
                                    

                                  
                                    {/* // <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span> */}
 </div>

                              
                            )
                        })}
                    </div>}
                </div>
                
        



        {imageURL && <Button />}
        <div>
           
        </div>
      </div>
    </div>

    
    </UserContext.Provider>
  
  );
}





export default App;
