import * as mobilenet from "@tensorflow-models/mobilenet";
import React, {useState, useEffect, useRef} from 'react'




function App() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null)


  const imageRef = useRef();

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

  useEffect(()=>{
    loadModel()
  },[])

  if(isModelLoading){
    return <h2>Evans is preparing a cup of coffee.. Please wait.</h2>
  }

  console.log(imageURL)
  return (
    <div>
      <h1>Hello World</h1>
      <div className="inputHolder"> <input type='file' accept='image' className="uploadInput" onChange={uploadImage}></input></div>

      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder"> {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}</div>
        </div>
        {imageURL && <button className="button">Identify Image</button>}
      </div>
    </div>

    
   
  
  );
}

export default App;
