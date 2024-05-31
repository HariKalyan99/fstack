import { useContext} from "react"
import Blogs from "./Blogs"
import { blogsStore } from "../store/blogsstore"


const BlogDisplay = () => {
    const {blogsList, toggleView} = useContext(blogsStore)
    const token = localStorage.getItem('token');
  
  if(toggleView === 'blogs' && token){
    return (
        <div className="album py-5 bg-body-tertiary">
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {blogsList.map((blog, ind) => <Blogs blog={blog} key={ind} />)}
          </div>
        </div>
      </div>
      )
  }
}

export default BlogDisplay