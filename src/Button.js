
import React, {useContext}  from 'react'
import UserContext from "./UserContext";
import spoken from '../node_modules/spoken/build/spoken.js';


const Button = () => {
    const ctx = useContext(UserContext);

      //function that calls the tensorflow library
const identify = async () =>{
    const results = await ctx.model.classify(ctx.imageRef.current)
    ctx.setResults(results)
    spoken.say("The picture most likely contains a " + results[0].className + "or it might contain a" + results[1].className )

  }
    return (
      <React.Fragment>
        <button type="button" className="btn btn-dark" className="btn btn-primary" onClick={identify}>Identify Image</button>
      </React.Fragment>
    )
}

export default Button
