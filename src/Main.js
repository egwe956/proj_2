import React, {useContext, useDebugValue} from 'react'
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
    
      <p class="text-center fs-2">This app can tell you what is in a photo.</p>
      <div className="row"> 
      <input type='file' accept='image'  className="btn btn-primary" onChange={uploadImage} ref={ctx.fileInputRef}></input></div>
      <div className="row">
      <input type="text" placeholder="or upload image URL" className="col-sm" ref={ctx.textInputRef} onChange={handleOnchange}></input>
      </div>
     
      <div className="container">
          <div className="row justify center"> {ctx.imageURL && <img className="col-3 rounded mx-auto d-block" src={ctx.imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={ctx.imageRef} />}</div>
        


        <div>

        {ctx.results.length > 0 && <div className='row justify center'>
                {ctx.results.map((result, index) => {           
                return (
                                <div className='col-8' key={result.className}> 
                                    {result.className} - probability percentage: {(result.probability * 100).toFixed(2)}%
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
