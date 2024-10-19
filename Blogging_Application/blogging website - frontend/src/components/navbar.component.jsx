import { useState } from "react"
import logo from "../imgs/logo.png"
import {Link,Outlet} from "react-router-dom"

const Navbar = () =>{

    const [searchBoxVisibility,setSearchBoxVisibility] = useState(false)


    return(
        <>
           <nav className="navbar">
           <Link to="/" className="flex-none w-10">
            <img src={logo} alt="" className="w-full" />
           </Link>

           <div className={`absolute bg-white w-full left-0 top-full mt-0.5
           border border-grey py-2 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"}`}>
            <input type="text" placeholder="SEARCH" className="w-full md:w-auto bg-grey border border-dark-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-[20%]"/>
            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
           </div>

           <div className="flex items-center ml-auto gap-3 md:gap-6">
            <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => 
             setSearchBoxVisibility(current => !current)
            }>
            <i className="fi fi-rr-search text-xl"></i>
            </button>

            <Link to="/editor" className=" md:flex gap-2 link hidden ">
            <i className="fi fi-rr-file-edit">write</i>
            </Link>

            <Link className="btn-dark py-2" to="/signin">
                sign In
            </Link>
            <Link className="btn-light py-2 hidden md:block" to="/signup">
                sign up
            </Link>

           </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar;