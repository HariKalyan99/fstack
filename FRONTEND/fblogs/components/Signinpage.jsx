import { useContext } from 'react'
import { blogsStore } from '../store/blogsstore'
import Signup from './Signup';
import Login from './Login';

const Signinpage = () => {
    const {toggleView} = useContext(blogsStore);
  if(toggleView === "signup"){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <Signup />
        </div>
    )
  }else if(toggleView === "login"){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <Login />
        </div>
    )
  }
}

export default Signinpage