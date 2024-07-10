import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const navigate = useNavigate()

    useEffect(()=>{
      const accessToken = localStorage.getItem("login-token")
      // console.log(accessToken);
      if(accessToken){
        navigate("/list")
      } else {
        navigate("/")
      }
    },[])
    return (
      <div>
        <Outlet/>
      </div>
    )
}

export default ProtectedRoutes
