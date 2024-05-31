import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const blogsStore = createContext({
    blogsList: [],
    add: () => {},
    edit: () => {},
    remove: () => {},
    displayToggle: () => {},
    toggleView: "",
    signUpUser: () => {},
    loginUser: () => {},
    searchQuery: () => {}
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
            return newBlogList = [action.payload.data, ...currentState.filter(x => x._id !== action.payload.prevId)];
        case "DEL_BLOGS":
            return newBlogList = currentState.filter(x => x._id !== action.payload.id);
        case "SEARCH_BLOGS":
            return newBlogList = action.payload.data;
        default:
            return newBlogList; 
    }
}

const BlogStoreProvider = ({children}) => {
  const navigate = useNavigate()
    const [toggleView, setToggleView] = useState("home");
    // const [blogsList, setBlogsList] = useState([]);
  
    const [addBlogs, setAddBlogs] = useState({});
    const [deleteBlogs, setDeleteBlogs] = useState("");
    const [editBlogs, setEditBlogs] = useState("");


    const [blogsList, dispatchBlogList] = useReducer(pureReducerFunction, [])

    const [signUp, setSignUp] = useState("");
    const [login, setLogin] = useState(""); 

    const [usernamefromDB, setUsernamefromDB] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      const controller = new AbortController();
      const {signal} = controller;
      const fetchBlogList = async() => {
        try{
          const {data} = await axios.get('http://127.0.0.1:8084/feeds', {signal});
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
          const {data} = await axios.post('http://127.0.0.1:8084/feeds/new', {
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
          const {data} = await axios.put(`http://127.0.0.1:8084/feeds/${prevId}`, {
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
          const {data} = await axios.delete(`http://127.0.0.1:8084/feeds/${id}`)
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
      
      if(deleteBlogs.length > 0){
        delBlogsOnDb(deleteBlogs)
      }
    }, [deleteBlogs])

    useEffect(() => {
        const fetchSignup = async(user) => {
            try{
                const {data} = await axios.post('http://127.0.0.1:8084/auth/signup', {
                    ...user
                })
                setUsernamefromDB(data.username)
            }catch(error){
                console.log("Error", error)
            }
        }

        if(signUp.username) {
            fetchSignup(signUp)
        }
    }, [signUp])


    useEffect(() => {
      const fetchLogin = async(user) => {
          if(usernamefromDB == user.username){
            try{
              const {data} = await axios.post('http://127.0.0.1:8084/auth/login', {
                  ...user
              })
              localStorage.setItem('token', data.token);
              displayToggle("home")
              navigate("/blogs-create")
          }catch(error){
              console.log("Error", error)
          }
          }
      }

      if(login.username) {
        fetchLogin(login)
      }
  }, [login])

  useEffect(() => {
    let interval;
    try{
      interval = async(title) => {
        const {data} = await axios.get(`http://127.0.0.1:8084/feeds/search?title=${title}`);
        dispatchBlogList({
          type: "SEARCH_BLOGS",
          payload: {
            data
          }
        })
      }
      
    }catch(error){
      console.log("Error", error)
    }

    let timer = setTimeout(() => {
        interval(searchTerm);
      }, 600)


    return () => {
      clearInterval(timer);
    }
  }, [searchTerm])
  
    
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


      const signUpUser = (user) => {
        setSignUp(user);
      }

      const loginUser = (user) => {
        setLogin(user);
      }

      const searchQuery = (term) => {
        console.log(term)
        setSearchTerm(term)
      }
  
    return(
        <blogsStore.Provider value={{blogsList, add, remove, edit, displayToggle, toggleView, signUpUser, loginUser, searchQuery}}>
            {children}
        </blogsStore.Provider>
    )
} 


export default BlogStoreProvider;
