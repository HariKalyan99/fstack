import { useContext } from "react"
import { blogsStore } from "../store/blogsstore"
import { Link } from "react-router-dom"

const BlogSidebar = () => {
    const {displayToggle, toggleView} = useContext(blogsStore);
    if(localStorage.getItem('token')){
      return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{width: "280px"}}>
        
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" onClick={() => displayToggle("home")}>
            <Link to="/blogs-create" className={`nav-link text-white ${toggleView === "home" && 'active'}`} aria-current="page">
              Home
            </Link>
          </li>
          <li onClick={() => displayToggle("blogs")}>
            <Link to="/blogs-display" className={`nav-link text-white ${toggleView === "blogs" && 'active'}`}>
              Dashboard
            </Link>
          </li>
          
          
        </ul>
        <hr />
        <div className="dropdown">
          
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
      )
    }
  
}

export default BlogSidebar