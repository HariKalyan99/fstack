import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import axios from 'axios';

export const blogsStore = createContext({
    blogsList: [],
    add: () => {},
    edit: () => {},
    remove: () => {},
    displayToggle: () => {},
    toggleView: ""
  })
//   const newBlogsList = blogsList.filter(x => x.id !== data.id);
        //   setBlogsList(newBlogsList);
function pureReducerFunction(currentState, action){
    let newBlogList = currentState;
    switch(action.type){
        case "INITIAL_BLOGS":
            return newBlogList = action.payload.data;
        case "ADD_BLOGS":
            return newBlogList = [action.payload.data, ...currentState];
        case "EDIT_BLOGS":
            return newBlogList = [action.payload.data, ...currentState.filter(x => x.id !== action.payload.prevId)];
        case "DEL_BLOGS":
            return newBlogList = currentState.filter(x => x.id !== action.payload.id);
        default:
            return newBlogList; 
    }
}

const BlogStoreProvider = ({children}) => {
    const [toggleView, setToggleView] = useState("home");
    // const [blogsList, setBlogsList] = useState([]);
  
    const [addBlogs, setAddBlogs] = useState({});
    const [deleteBlogs, setDeleteBlogs] = useState("");
    const [editBlogs, setEditBlogs] = useState("");


    const [blogsList, dispatchBlogList] = useReducer(pureReducerFunction, [])
  
    useEffect(() => {
      const controller = new AbortController();
      const {signal} = controller;
      const fetchBlogList = async() => {
        try{
          const {data} = await axios.get('http://localhost:8090/posts', {signal});
        dispatchBlogList({
            type: "INITIAL_BLOGS",
            payload:{
                data
            }
        })
        }catch(error){
          console.log("Error", error)
        }
      }
  
      fetchBlogList()
      return () => {
        controller.abort();
      }
      
    }, [])
  
  
    useEffect(() => {
      const addBlogsToDb = async(post) => {
        try{
          const {data} = await axios.post('http://localhost:8090/posts', {
            ...post
          })
          dispatchBlogList({
            type: "ADD_BLOGS",
            payload: {
                data
            }
          })
        }catch(error){
          console.log("Error", error)
        }
      }
      if(addBlogs.title){
        addBlogsToDb(addBlogs)
      }
    }, [addBlogs])
  
  
    useEffect(() => {
      const editBlogsOnDb = async({title, body, tags, reactions, prevId}) => {
        try{
          const {data} = await axios.put(`http://localhost:8090/posts/${prevId}`, {
            title, body, tags, reactions
          })
 
        dispatchBlogList({
            type: "EDIT_BLOGS",
            payload: {
                data,
                prevId
            }
        })
        }catch(error){
          console.log("Error", error)
        }
      }
      
      if(editBlogs.title){
        editBlogsOnDb(editBlogs)
      }
    }, [editBlogs])
  
    useEffect(() => {
      const delBlogsOnDb = async(id) => {
        try{
          const {data} = await axios.delete(`http://localhost:8090/posts/${id}`)
        dispatchBlogList({
            type: "DEL_BLOGS",
            payload: {
                id, data
            }
        })
        }catch(error){
          console.log("Error", error)
        }
      }
      
      if(deleteBlogs){
        delBlogsOnDb(deleteBlogs)
      }
    }, [deleteBlogs])
  
    
    const displayToggle = (value) => {
      setToggleView(value);
    }
  
    
    
    const add = useCallback((post) => {
        setAddBlogs(post);
      }, []) 
    const edit = useCallback((post, prevId) => {
        setEditBlogs({...post, prevId})
      }, [])
    const remove = useCallback( (id) => {
        setDeleteBlogs(id);
      }, [])
  
    return(
        <blogsStore.Provider value={{blogsList, add, remove, edit, displayToggle, toggleView}}>
            {children}
        </blogsStore.Provider>
    )
} 


export default BlogStoreProvider;
