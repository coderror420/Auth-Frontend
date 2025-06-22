import React from "react"
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login"
import SharePage from "./pages/SharePage"
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = ()=>{
  return (
  <StrictMode>
     <div className="">
      <Header/>
      <Outlet/>
     </div>
  </StrictMode>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:  <Login/>,
      },
      {
        path: "/admin",
        element: <ProtectedRoute><AdminPanel/></ProtectedRoute>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/share/:token",
        element: <SharePage />,
      }
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={AppRouter} />
)
