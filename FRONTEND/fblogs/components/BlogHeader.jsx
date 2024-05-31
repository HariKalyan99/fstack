import { useContext } from "react"
import { blogsStore } from "../store/blogsstore"
import { Link } from "react-router-dom";

const BlogHeader = () => {
    const {displayToggle,toggleView, searchQuery} = useContext(blogsStore);
    const token = localStorage.getItem("token")
  return (
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-end justify-content-lg-end">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
        </a>

        

        {token && toggleView === "blogs" && <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onChange={(e) => searchQuery(e.target.value)}>
          <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
        </form>}

        <div className="text-end">
          {token ? <Link to={"blogs/signup"}>
          <button type="button" className="btn btn-warning" onClick={() => {
            localStorage.clear()
            displayToggle("signup");
          }}>Logout</button>
          </Link> : <>
          <Link to={"/blogs/login"}>
          <button type="button" className="btn btn-outline-light me-2" onClick={() => displayToggle("login")}>Login</button>
          </Link>
          <Link to={"blogs/signup"}>
          <button type="button" className="btn btn-warning" onClick={() => displayToggle("signup")}>Sign-up</button>
          </Link></>}

          
        </div>
      </div>
    </div>
  </header>
  )
}

export default BlogHeader