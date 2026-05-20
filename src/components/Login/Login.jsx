import axios from 'axios'
import { useFormik } from 'formik'
import {  useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as Yup from "yup"
import { UserContext } from '../../contexts/UserContext'


export default function Login() {
  let {token ,setToken}=useContext(UserContext);
  let navigate = useNavigate()
  let [error ,setError]= useState("");
  let [success ,setSuccess ]= useState("");
  let [loading,setLoading]=useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().min(6, "name must be at least 6  chars").required("pass is required")
  })


   function handelSubmit(values) {
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' ,values)
   .then(({data})=>{
    setLoading(false)
    setSuccess(data.message)
    setError("")
    console.log(data)
    setToken(data.token)
    setTimeout(() => {
      localStorage.setItem("token",data.token)
      navigate("/")
    }, 1000);
    // console.log(data)

   })

   .catch(({response})=>{
    setLoading(false)
    setSuccess("")
    setError(response.data.message)
    // console.log(error)
   })

  }
  let formik = useFormik({
    initialValues: {

      email: "",
      password: ""

    },
    validationSchema,
    onSubmit: handelSubmit
  })
  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <h3 className='my-1.5 text-2xl font-bold text-blue-900'>Log in:</h3>
          {
              error ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {error}
                </div>
                : null
            }
            {
              success ?
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                  {success}
                </div>
                : null
            }

          <div className="relative z-0 w-full my-5 group">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {
              formik.errors.email && formik.touched.email ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {formik.errors.email}
                </div>
                : null
            }
          </div>

          <div className="relative z-0 w-full my-5 group">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" value={formik.values.password} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password </label>
            {
              formik.errors.password && formik.touched.password ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                  {formik.errors.password}
                </div>
                : null
            }
          </div>
         
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {
            loading?<i className='fas fa-spinner fa-spin'></i>
            :"Submit"
          }</button>
        </form>

      </div>
    </>
  )
}
