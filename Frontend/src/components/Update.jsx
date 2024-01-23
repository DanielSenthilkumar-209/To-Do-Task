import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer"

function Update(_id) {
    const params=useParams()

const navigate=useNavigate();
const [isLoading,setLoading]=useState(false);
const [title,setTitle]=useState();
const [description,setDescription]=useState();

const getTask=async()=>{
    try{
    const res= await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/find/${params.id}`,
    {
        headers:
        {"Content-Type":"application/json",},
    })
    const data =await res.json()
    setTitle(data.title)
    setDescription(data.description)
}
catch(error){}
    
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!title){
      alert("Please enter title")
      return;
  }
  if(!description){
    alert("Please enter description")
    return;
}
  try{
    setLoading(true);
    const res=await fetch(`http://localhost:4000/task/update/${params.id}`,{
      method:"PUT",
      headers
      :{"Content-Type":"application/json"},
      body:JSON.stringify({title,description})
    }
    );
    navigate("/")
  }
  catch(error){alert("Something went wrong")}
  finally{
    setLoading(false);
    setTitle("")
    setDescription("")
  }
}

useEffect(()=>{
    getTask()
    return ()=>{setTitle("")
setDescription("")}
},[])

return (<>
    <div className="h-screen flex justify-center items-center">
        <div className="h-52 w-4/5 flex flex-col items-center bg-[#1F2833]">
            <h2 className="flex flex-col items-center text-white text-2xl">Update Task</h2>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-9">
                <input className="rounded-lg p-1" 
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}} placeholder="Task Name" />
                <input className="rounded-lg p-1 mt-1" 
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}} placeholder="Task Description" />
            </div>
            <div className="flex">
            <button className="bg-[#66FCF1] rounded-md p-2 mt-3 ml-3 flex items-center justify-between"
            type="submit">Add</button>
            <Link to='/'><button className="bg-[#ff652F] rounded-md p-2 mt-3 ml-3">Cancel</button></Link>
            </div>
            </form>
        </div>
    </div>
    <Footer/>
    </>
)
}

export default Update;
