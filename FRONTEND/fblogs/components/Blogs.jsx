import { useContext, useState } from "react"
import EditBlog from "./EditBlog";
import { blogsStore } from "../store/blogsstore";

const Blogs = ({blog}) => {
    const {remove} = useContext(blogsStore)
    const [displayEdit, setDisplayEdit] = useState(false);
  return (
    <div className="col w-100">
          {displayEdit ? <EditBlog displayEdit={displayEdit}
setDisplayEdit={setDisplayEdit} blog={blog}/> : <div className="card shadow-sm">
            <div className="card-body ">
              <h3 className="card-text">{blog.title}</h3>
              <p className="card-text">{blog.body}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  {blog.tags.map((tag, ind) => <button type="button" key={ind} className="btn btn-sm btn-outline-secondary">{tag}</button>)}
                </div>
                <small className="text-body-secondary">9 mins</small>
              </div>
            </div>
            <div>
                <button type="button" className="btn btn-danger m-5 px-3" onClick={() => setDisplayEdit(!displayEdit)}>Edit</button>
                <button type="button" className="btn btn-danger m-5 px-3" onClick={() => remove(blog._id)}>Delete</button>
            </div>
          </div>}
        </div>
  )
}

export default Blogs