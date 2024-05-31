import { useContext } from "react"
import { blogsStore } from "../store/blogsstore"

const BlogSidebar = () => {
    const {displayToggle, toggleView} = useContext(blogsStore)
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{width: "280px"}}>
    
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item" onClick={() => displayToggle("home")}>
        <a href="#" className={`nav-link text-white ${toggleView === "home" && 'active'}`} aria-current="page">
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          Home
        </a>
      </li>
      <li onClick={() => displayToggle("blogs")}>
        <a href="#" className={`nav-link text-white ${toggleView === "blogs" && 'active'}`}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Dashboard
        </a>
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

export default BlogSidebar