import React, {useContext} from 'react'
import spoken from '../node_modules/spoken/build/spoken.js';
import UserContext from "./UserContext";
import Button from './Button.js';

const Main = () => {

    const ctx = useContext(UserContext);

//function that submits the photo to the 
  const uploadImage = (e)=>{
    console.log(e);
    const {files} = e.target
    if(files.length > 0){
      const url= URL.createObjectURL(files[0])
      ctx.setImageURL(url)
    } else{
        ctx.setImageURL(null)
    }
  }


//submit photos from local machine
const handleOnchange = (e) => {
    ctx.setImageURL(e.target.value)
    ctx.setResults([])
}


    return (
        <div className="container">
    
      <h1>This app can tell you what is in a photo.</h1>
      <div className="inputHolder"> 
      <input type='file' accept='image' className="col-sm" className="btn btn-primary" onChange={uploadImage} ref={ctx.fileInputRef}></input></div>
      <input type="text" placeholder="or upload image URL" className="col-sm" ref={ctx.textInputRef} onChange={handleOnchange}></input>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder"> {ctx.imageURL && <img src={ctx.imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={ctx.imageRef} />}</div>
        </div>


        <div>

        {ctx.results.length > 0 && <div className='resultsHolder'>
          
                        {ctx.results.map((result, index) => {           
                            return (
                                <div className='result' key={result.className}> 
                                    <div className='name'>{result.className}</div>
                                    

                                  
                                    {/* // <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span> */}
 </div>


                              
                            )
                        })}
                    </div>}
                </div>
                
        



        {ctx.imageURL && <Button />}
        <div>
           
        </div>
      </div>
      </div>
    )
}

export default Main
