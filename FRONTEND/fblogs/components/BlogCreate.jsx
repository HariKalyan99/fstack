import  { useContext, useRef } from 'react'
// import {v4 as uuidv4} from 'uuid'
import { blogsStore } from '../store/blogsstore'
import { useNavigate } from 'react-router-dom'

const BlogCreate = () => {

    const {add, toggleView, displayToggle} = useContext(blogsStore)

    const fullnameRef = useRef("")
    const userIdRef = useRef("")
    const titleRef = useRef("")
    const reactionsRef = useRef("")
    const bodyRef = useRef("")
    const usernameRef = useRef("")
    const tagsRef = useRef("")
    const token = localStorage.getItem('token');
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        add({title: titleRef.current.value, body: bodyRef.current.value, tags: tagsRef.current.value.split(",")})
        userIdRef.current.value = ""
        titleRef.current.value = ""
        bodyRef.current.value = ""
        tagsRef.current.value = ""
        reactionsRef.current.value = ""
        displayToggle("blogs");
        navigate("/blogs-display")

    }
  if(toggleView === "home" && token){
    return (
        <form className='d-flex flex-column justify-content-center align-items-center gap-2 w-100' onSubmit={(e) => handleSubmit(e)}>
            <label>fullname</label>
            <input type="text" id='fullname' ref={fullnameRef}/>
            
            <label>UserId</label>
            <input type="text" id='userId' ref={userIdRef}/>
            
            <label>title</label>
            <input type="text" id='title' ref={titleRef}/>
            
            <label>reactions</label>
            <input type="number" id='reactions' ref={reactionsRef}/>
            
            <label>body</label>
            <textarea type="text" id='body' cols={40} rows={5} ref={bodyRef}/>
            
            <label>username</label>
            <input type="text" id='username' ref={usernameRef}/>
            
            <label>tags</label>
            <input type="text" placeholder='enter tags with commas' ref={tagsRef}/>
            <button type='submit' className='btn btn-warning'>Add post</button>
            
        </form>
      )
  }
}

export default BlogCreate