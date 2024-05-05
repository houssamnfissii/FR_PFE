import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from 'react-router-dom';
import "./header.css";

export default function HeaderV1() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [connecter,setConnecter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [error, setError] = useState("");


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId=localStorage.getItem("userId");
    const userType=localStorage.getItem("userType");
    const userEmail=localStorage.getItem("userEmail");
    
    if (token) {
      setConnecter(true);
      setName(username);
      setEmail(userEmail)
      setType(userType)
      setUserImage(userId)


    }
  }, []);
  useEffect(()=>{
    handleLogout()
    
  },[])
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.removeItem("token"); // Clear token from local storage
        localStorage.removeItem("username"); // Clear username from local storage
        localStorage.removeItem("userId"); // Clear username from local storage
        localStorage.removeItem("userType"); // Clear username from local storage
        localStorage.removeItem("userEmail"); // Clear username from local storage
        localStorage.removeItem("userImage");
        // navigate("/"); // Navigate to the home page or any other page
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
      setError("Logout failed. Please try again later.");
    }
  };
 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const nav__links = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "/hotels",
      display: "Hotels",
    },
    {
      path: "/tours",
      display: "Tours",
    },
    {
      path: "/cars",
      display: "Cars",
    },
    {
      path: "/restaurants",
      display: "Restaurants",
    },
  ];

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 shadow-xl  py-2  fixed top-0 w-full z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/home" className="flex items-center">
            <img src={logo} className="mr-3 h-12 sm:h-20 " alt=" Logo" />
          </Link>
          <div className="flex items-center lg:order-2">
          {
  connecter ? (
    <div className="relative inline-flex items-center">
    <span className="mr-2 text-blue-800 fw-bold">Bonjour  {name}</span>
    <button
      id="avatarButton"
      type="button"
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
      // className="flex items-center justify-center w-10 h-10 rounded-full ring-2"
      onClick={toggleDropdown}
    >
      <img
        className="mr-3 w-10 h-10 sm:h-14 sm:w-14 rounded-full ring-2 ring-blue-800 "
        src="https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--914bcfe0-f610-4610-a77e-6ea53c53f630/_330603286208.app.png?preferwebp=true&width=312"
        alt="User dropdown"
      />
    </button>
    
    {isOpen && (
      <div
        id="userDropdown"
        className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg bg-gray-700 divide-gray-600 mt-72 right-0"
      >
        <div className="px-4 py-3 text-sm text-gray-900">
          <div> {name}</div>
          <div className="font-medium truncate">{email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
          </li>
        </ul>
        <div className="py-1">
          <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
        </div>
      </div>
    )}
  </div>
  ) : (
    <>
      <Link to="/LoginPage" className="hover:text-white hover:bg-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 lg:px-4 lg:py-5 mr-2 focus:outline-none">Log in</Link>
      <Link to="/RegisterHosterForm" className="bg-blue-800 text-white bg-primary-700 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 lg:px-4 lg:py-5 mr-2 focus:outline-none">become a host</Link>
    </>
  )
}

         

            <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded={isMobileMenuOpen}>
              <span className="sr-only">Open main menu</span>
              <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              <svg className={`w-6 h-6 ${isMobileMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${isMobileMenuOpen ? 'block ' : 'hidden'}`} id="mobile-menu-2">
            <ul className="flex flex-col  font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            {nav__links.map((link, index) => (
                <li key={index} className='li'>
                  <NavLink
                    to={link.path}
                    className="navlink block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
