import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"
import Login from '../pages/Login'
import { ToastContainer } from "react-toastify"
import { useContext } from "react"
import { authContext } from "../context/auth.context"
import Loading from "../Components/Loading"
import Overview from "../pages/Overview"
import Public from "./Public"
import Private from "./Private"
import Nav from '../Components/shared/Nav'
import Footer from "../Components/shared/Footer"
import Users from "../pages/Users"
import UploadPortfolio from '../pages/UploadPortfolio'
import ManagePortfolio from "../pages/ManagePortfolio"
import Profile from "../pages/Profile"
import ImageChange from "../pages/ImageChange"





function App() {

    const {loader} = useContext(authContext)

    const DynamicLayout = ()=>{
        return(
            <>  
                <Nav />
                <Outlet />
                <Footer />
            </>
        )
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <DynamicLayout />,
            children: [
                {
                    path: '/',
                    element: (
                        <Public>
                            <Login />
                        </Public>
                    )
                },
                {
                    path: 'dashboard-overview',
                    element: (
                        <Private>
                            <Overview />
                        </Private>
                    )
                },
                {
                    path: 'users',
                    element: (
                        <Private>
                            <Users />
                        </Private>
                    )
                },
                {
                    path: 'upload-portfolio',
                    element: (
                        <Private>
                            <UploadPortfolio />
                        </Private>
                    )
                },
                {
                    path: 'manage-portfolio',
                    element: (
                        <Private>
                            <ManagePortfolio />
                        </Private>
                    )
                },
                {
                    path: 'user-profile',
                    element: (
                        <Private>
                            <Profile />
                        </Private>
                    )
                },
                {
                    path: "change-image",
                    element: (
                        <Private>
                            <ImageChange />
                        </Private>
                    )
                }

            ]
        }
    ])
   

    return(
        <>  
        {
            loader ?
            (
                
                <RouterProvider router={router} />

            
            ) : <Loading />
        }

            

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}             
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
  
}

export default App
