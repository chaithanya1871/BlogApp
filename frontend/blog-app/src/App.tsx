import {RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


// const POSTS = [{
//   id:1,
//   name:"post 1"
// },{
//   id:2,
//   name:"post 2"
// }]

function App() {
//   function generateRandomId() {
//     const array = new Uint32Array(1);
//     window.crypto.getRandomValues(array);
//     return array[0];
//   }
  
//   const queryClient = useQueryClient();
//   function wait(duration:number){
//     return new Promise(resolve=> resolve(setTimeout(resolve,duration)))
//   }

//   const newPostMutation = useMutation({
//     mutationFn:(title:string)=>{
//       return wait(1000).then(()=>POSTS.push({
//         id:generateRandomId(),
//         name:title

//       }))
//     },
//     onSuccess:()=>{
//       queryClient.invalidateQueries({ queryKey: ["posts"] })
//     }
//   })
//   const postQuery = useQuery({
//     queryKey:["posts"],
//     queryFn:()=> wait(1000).then(()=>[...POSTS]),
//   })
//   if (postQuery.isPending) return <div>Loading</div>
//   if (postQuery.isError) return <div>Error occurrd</div>;
   
//   return (
//     <div>
//       {postQuery.data.map(post=>(
//         <p key={post.id}>{post.name}</p>
//       ))}
//       <button onClick={()=>{
//         newPostMutation.mutate("new post")
//       }}>Add new</button>
//     </div>
//   )
 return (
 <>
  <ToastContainer position="bottom-right" autoClose={1500} style={{ fontSize: "0.7rem" }} />
  <RouterProvider router={routes}/>
 
 </>
  )
}
    
 

export default App;
