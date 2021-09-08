
import React, {useContext}  from 'react'
import UserContext from "./UserContext";


const Button = () => {
    const ctx = useContext(UserContext);

      //function that calls the tensorflow library
const identify = async () =>{
    const results = await ctx.model.classify(ctx.imageRef.current)
    ctx.setResults(results)
  }
    return (
        <button className="button" onClick={identify}>Identify Image</button>
    )
}

export default Button
