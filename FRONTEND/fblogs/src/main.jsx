import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BlogCreate from '../components/BlogCreate.jsx';
import BlogDisplay from '../components/BlogDisplay.jsx';
import App from '../routes/App.jsx';
import Signinpage from '../components/Signinpage.jsx';

const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    {path: "/blogs/signup", element: <Signinpage />},
    {path: "/blogs/login", element: <Signinpage />},
    {path: "/blogs-create", element: <BlogCreate />},
    {path: "/blogs-display",element: <BlogDisplay />}
  ]}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
