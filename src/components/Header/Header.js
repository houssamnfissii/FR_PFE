import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink, useNavigate ,Link} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import RegisterHosterForm from "../../pages/HostRegistration";

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

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Add state for controlling RegisterHosterForm visibility
  

  // Function to retrieve user data from local storage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser(username);
    }
  }, []);
  const [registrationData, setRegistrationData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    birth_date: '',
    address: '',
    telephone: '',
    password: '',
    confirm_password: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        toggleModal(); // Close the modal after successful registration
        setIsLoginForm(true);
        setIsModalOpen(isModalOpen);

        
        navigate('/login'); // Redirect to the login page
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(error.message);
    }
  };


  const handleValid = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const content = await response.json();
      console.log(content.token);
      setIsModalOpen(!isModalOpen);
      setUser(content.username);

      // Store token and username in local storage
      localStorage.setItem("token", content.token);
      localStorage.setItem("username", content.username);
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed. Please try again later.");
    }
  };

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
        setIsModalOpen(isModalOpen);
        setUser(null); // Clear user state
        navigate("/home"); // Navigate to the home page or any other page
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
      setError("Logout failed. Please try again later.");
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <header className={`header ${isSticky ? "sticky__header" : ""}`}>
      <Container>
        <Row>
          <div className="nav__wrapper flex flex-wrap items-center justify-between">
            <div className="logo">
              <img
                src={logo}
                alt="logo"
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28"
              />
            </div>
            <div
              className={`navigation ${
                isNavOpen ? "block" : "hidden"
              } sm:block md:block lg:block xl:block mt-4 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0`}
            >
              <ul className="menu flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-5">
                {nav__links.map((link, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={link.path}
                      activeClassName="active__link"
                      exact={true}
                      className="nav__link"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__right flex items-center gap-4">
              <div className="nav__btns flex items-center gap-4">
                {user ? (
                  <>
                    <Button className="btn primary__btn">{user}</Button>
                    <Button
                      className="btn secondary__btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                   <Link to={'/RegisterHosterForm'}>
                   <Button className="btn primary__btn">
                      Register as Hoster
                    </Button>
                   </Link>
                    <Button
                      className="btn secondary__btn"
                      onClick={toggleModal}
                    >
                      <span>{isLoginForm ? "Login" : "Register"}</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Row>
      </Container>
      {isModalOpen && (
        <div
          id="authentication-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-10 rounded-lg shadow-lg">
            {isLoginForm ? (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Sign in to our platform
                </h3>
                <form onSubmit={handleValid}>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-3 w-full border rounded-lg"
                      placeholder="name@company.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-3 w-full border rounded-lg"
                      placeholder="••••••••"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={toggleForm}
                    >
                      You don't have an account?
                    </button>
                  </div>
                    
                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Create an account
                </h3>
                <form onSubmit={handleSubmit}>
                  {/* Registration form inputs */}
                  <div className="mb-4">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="birth_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Birth Date
                    </label>
                    <input
                      type="date"
                      id="birth_date"
                      name="birth_date"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telephone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className="mt-1 p-3 w-full border rounded-lg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
                    >
                      Register
                    </button>
                    <Button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={toggleModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  {/* Error message display */}
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
              </>
            )}
            <button
              className="absolute top-4 right-4 text-gray-400"
              onClick={toggleModal}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
         {showRegisterForm && (
        <div className="register-form-container">
          <RegisterHosterForm setIsModalOpen={setIsModalOpen} toggleForm={toggleForm} />
        </div>
      )}
    </header>
  );
}
