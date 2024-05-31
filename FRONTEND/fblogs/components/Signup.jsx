import { useNavigate } from "react-router-dom";
import { blogsStore } from "../store/blogsstore"
import { useContext, useRef } from "react";

const Signup = () => {

    const {displayToggle, signUpUser} = useContext(blogsStore)
    const navigate = useNavigate(blogsStore);

    const fullNameRef = useRef("")
    const usernameRef = useRef("")
    const passwordRef = useRef("")
    const emailRef = useRef("")

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const fullName = fullNameRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        signUpUser({fullName, username, password, email})

        displayToggle("login")
        navigate("/blogs/login")
    }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
        <label id='fullName' >Fullname</label>
        <input type="text" id='fullName' ref={fullNameRef}/>

        <label id='username' >User Name</label>
        <input type="text" id='username' ref={usernameRef}/>


        <label id='password' >Password</label>
        <input type="text" id='password' ref={passwordRef}/>

        <label id='email' >email</label>
        <input type="email" id='email' ref={emailRef}/>

        <button type='submit' className='btn btn-success'>Signup</button>
    </form>
  )
}

export default Signup