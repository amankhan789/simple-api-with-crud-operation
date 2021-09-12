import React,{useState} from 'react';
import axios from "axios";

function Login() {
    const [userName,setUserName]=useState();
    const [userPassword, setUserPassword] = useState();


    const register = (e) => {
        
        e.preventDefault()
        axios({
            method: "post",
            url: "http://localhost:3001/register",
            data: { email: userName,
                password: userPassword,},
            headers: { "Accept":"Application/json",
            "Content-Type":"Application/json",},
          })
          .then((result=>{
              alert("User Registered")
          }))
          .catch(er=>{
              alert(er)
          })
    }
    
      

return(
    <>
    <form align="center">
    <div className="Register">
        <h1>registration</h1>
        <label htmlFor="">email</label>
        <input type="text"  name= "userName" value={userName} onChange={e=> setUserName(e.target.value)} />
        <h1>password</h1>
        <label htmlFor=""> password </label><br/>
        <input type="text"  password="userPassword" value={userPassword} onChange={e=> setUserPassword(e.target.value)} />
        <button onClick={e=>register(e) }>Register</button>
     </div ><br/>


    
     <div className="login">
        <h1>Login</h1>
        <label htmlFor="">email</label>
        <input type="text" onChange={e=> setUserName(e.target.value)} />
        <h1>password</h1>
        <label htmlFor=""> password </label><br/>
        <input type="text" onChange={e=> setUserPassword(e.target.value)} />
        <button onClick={e=>Login(e)}> Login</button>
     </div >
     <br/>

     </form>
 
</>

)
}

export default Login;