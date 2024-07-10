import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Utils/Api'

const Login = () => {
  const navigate = useNavigate()
  const [formData , setFormData] = useState({
    email : "",
    password : ""
  })

  const mutation = useMutation({
    mutationKey : ['login'],
    mutationFn : login,
    onSuccess : (data)=>{
      if(data.status === 201){
        toast.error ("Invalid Cardential")
      } 
      if (data.status === 200){
        toast.success (`Welcome ${data.data.name}`)
      }
      localStorage.setItem("login-token" , JSON.stringify(data.data.token))
      navigate("/list")
    }
  })


  const handleChange=(e)=>{
    const {name , value} = e.target
    setFormData({...formData , [name] : value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    mutation.mutate(formData)
  }
  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-blue-200 to-indigo-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md p-6 bg-white shadow-md rounded-md">
      <h2 className="mt-4 mb-6 text-center text-3xl font-bold text-gray-900">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border border-blue-300 shadow-sm mt-4 mb-4 h-10  focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border border-blue-300 shadow-sm focus:border-indigo-500 mt-4 mb-4 h-10  focus:ring-indigo-500"
          />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="remember" class="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 mb-4"
          >
            Login
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <Link to={"/"} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
