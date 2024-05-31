import { Outlet } from "react-router-dom"

import BlogHeader from "../components/BlogHeader"
import BlogSidebar from "../components/BlogSidebar"
import BlogStoreProvider from "../store/blogsstore"



function App() {
  


  return (
    <BlogStoreProvider>
      <BlogHeader />
      <div className='d-flex w-100'>
      <BlogSidebar />
      <Outlet />
      </div>
    </BlogStoreProvider>
  )
}

export default App
