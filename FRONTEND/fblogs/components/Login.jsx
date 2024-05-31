import { useContext, useRef } from "react";

import { blogsStore } from "../store/blogsstore";

const Login = () => {
  const { loginUser} = useContext(blogsStore);
  


  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    loginUser({username, password})
    
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
       

        <label id='username' >User Name</label>
        <input type="text" id='username' ref={usernameRef}/>


        <label id='password' >Password</label>
        <input type="text" id='password' ref={passwordRef}/>

       

        <button type='submit' className='btn btn-success'>Login</button>
    </form>
  )
}

export default Login