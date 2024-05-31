import  { useContext, useState } from 'react'
import { blogsStore } from '../store/blogsstore'

const EditBlog = ({displayEdit,
    setDisplayEdit,  blog}) => {
        const {edit} = useContext(blogsStore)
    const [fullname, setfullname ]= useState("")
    const [userId, setuserId ]= useState("")
    const [title, settitle ]= useState(blog.title)
    const [body, setbody ]= useState(blog.body)
    const [username, setusername ]= useState("")
    const [tags, settags ]= useState(blog.tags)
    const [reactions, setReactions] = useState(blog.reactions)


    const handleSubmit = (e) => {
        e.preventDefault();

        // const fullnameVal = fullname;
        // const userIdVal = userId;
        const titleVal = title;
        const bodyVal = body;
        // const usernameVal = username;
        const tagsVal = tags;
        // const reactionsVal = reactions
        edit({title: titleVal, body: bodyVal, tags: tagsVal.split(",")}, blog._id);
        setDisplayEdit(!displayEdit)
    }
  return (
    <form className='d-flex flex-column justify-content-center align-items-center gap-2 w-100' onSubmit={(e) => handleSubmit(e)}>
        <label>fullname</label>
        <input type="text" id='fullname' value={fullname} onChange={(e) => setfullname(e.target.value)}/>
        <label>UserId</label>
        <input type="text" id='userId' value={userId} onChange={(e) => setuserId(e.target.value)}/>
        <label>title</label>
        <input type="text" id='title' value={title} onChange={(e) => settitle(e.target.value)}/>
        <label>reactions</label>
        <input type="number" id='reactions' value={reactions} onChange={(e) => setReactions(e.target.value)}/>
        <label>body</label>
        <textarea type="text" id='body' cols={40} rows={5} value={body} onChange={(e) => setbody(e.target.value)}/>
        <label>username</label>
        <input type="text" id='username' value={username} onChange={(e) => setusername(e.target.value)}/>
        <label>tags</label>
        <input type="text" placeholder='enter tags with commas' value={tags} onChange={(e) => settags(e.target.value)}/>
        <button type='submit' className='btn btn-warning'>Edit post</button>
        <button type='button' className='btn btn-info' onClick={() => setDisplayEdit(!displayEdit)}>Don`t edit</button>

    </form>
  )
}

export default EditBlog