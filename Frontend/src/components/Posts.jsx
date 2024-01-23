import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Footer from "./Footer";


function Posts() {
    const [allpost,setPost]=useState([]);
   const [isLoading,setLoading]=useState(false);

   const getTasks=async()=>{
    try{
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task`);
        const data=await res.json();
        setPost(data);

    }
    catch(e){console.log(e.message);}
    finally{
        setLoading(false);
    }
   };

   const deletePost=async(id)=>{
    const confirm=window.confirm("Are you syre to delete");
    if(!confirm){
        return;
    }
    try{
        const res=await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/delete/${id}`,{method:"DELETE"})
        if(res.ok){
            await getTasks()
        }
    }
    catch(error){}
   }

   useEffect(()=>{
    getTasks();
   },[]);
  return (<>
    <div className="z-10">
    <div className="w-30">
        
        <button className="bg-green-500 p-2 mt-3 ml-10 mb-4 w-30 flex items-center justify-between hover:rounded-lg"><Link className="flex" to='/addpost'>Create Task <span className="pl-2 mt-1"><GoPlusCircle /></span></Link></button>
    </div>
    <div>{isLoading && <Loading />}
    {!isLoading && allpost.map((post)=>
        {
            return <div className="p-2">
                        <div className="bg-[#C5C6C7] w-3/5 h-auto mx-auto border-2 border-slate-950 rounded-lg md:text-2xl" key={post._id}>
                            <div className="flex justify-between">
                                <h2>Title: {post.title}</h2>
                                <div className="pt-1 pr-8">
                                    <Link to={`/update/${post._id}`}><button className="text-2xl hover:text-blue-700 hover:text-3xl"><FaEdit /></button></Link>
                                    <Link><button className="text-2xl hover:text-red-600 hover:text-3xl"
                                    onClick={()=>{deletePost(post._id)}}><MdDelete /></button></Link>
                                </div>
                            </div>
                            <p>Description: {post.description}</p>
                        </div>
                    </div>
        }
      )}</div>
    </div>
        <Footer/>
    </>
  )
}

export default Posts;
