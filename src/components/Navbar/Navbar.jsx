
import { useContext } from "react"
import logo from "../../assets/freshcart-logo.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../../contexts/UserContext"
export default function Navbar() {
  let {token,setToken}=useContext(UserContext);

  let navigate = useNavigate()
  function logOut(){
    setToken(null)
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    

<nav className="bg-white border-gray-200 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:justify-start mx-auto p-4">
    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse  md:w-[20%]">
      <img src={logo} className="h-8" alt="Flowbite Logo" />
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="w-full md:flex md:w-[80%] md:justify-between " id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
       
        <li>
          <NavLink to="" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Home</NavLink>
        </li>
        <li>
          <NavLink to="product" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Product</NavLink>
        </li>
        <li>
          <NavLink to="cart" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Cart</NavLink>
        </li>

      </ul>
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
       
        
{
  token ?
  <li>
          <span onClick={logOut} to="Logout" className=" cursor-pointer block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Logout</span>
        </li>
:<>
<li>
          <NavLink to="login" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Login</NavLink>
        </li>
        <li>
          <NavLink to="register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Register</NavLink>
        </li>
</>

}
        

      </ul>
    </div>
  </div>
</nav>


  )
}
