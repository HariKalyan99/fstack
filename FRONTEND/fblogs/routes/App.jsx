import BlogCreate from "../components/BlogCreate"
import BlogDisplay from "../components/BlogDisplay"
import BlogHeader from "../components/BlogHeader"
import BlogSidebar from "../components/BlogSidebar"
import BlogStoreProvider from "../store/blogsstore"



function App() {
  


  return (
    <BlogStoreProvider>
      <BlogHeader />
      <div className='d-flex w-100'>
      <BlogSidebar />
      <BlogDisplay />  
      <BlogCreate />
      </div>
    </BlogStoreProvider>
  )
}

export default App
