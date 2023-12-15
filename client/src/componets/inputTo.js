import React,{ Fragment, useState } from "react";

const InputTodo = () =>{
const [description , setDescription] = useState("")
const onSubmitForm = async(e)  =>{
    e.preventDefault();
    try {
    const body = {description};
    const response = await fetch("http://localhost:5000/todos",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
    })
    console.log(response);        
    window.location ="/";  
    } catch (err) {
        console.error()
    }
}
    return(
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List </h1>
            <form className="d-flex justify-content-center " onSubmit={onSubmitForm} style={{
        borderRadius: "50px 0 0 50px",
        marginLeft: '20px', // Increase the left margin for more space
        marginRight: '20px', // Increase the right margin for more space
      }}>
                <input type="text" className="form-control mt-5 "  value={description} onChange={e=> setDescription(e.target.value)} /> 
                <button type="submit" className=" btn btn-success mt-5">Add</button>
            </form>
        </Fragment>
    )
}
export default InputTodo;