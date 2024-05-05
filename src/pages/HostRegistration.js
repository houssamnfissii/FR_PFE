import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterHosterPage = () => {
  const [errors, setErrors] = useState({});
  const [first_name, SetFirstName] = useState('');
  const [last_name, SetLastName] = useState('');
  const [company_name, SetCompanyName] = useState('');
  const [CIN,setCIN ] = useState('');
  const [birth_date, SetBirthDate] = useState('');
  const [address, SetAddress] = useState('');
  const [telephone, SetTelephone] = useState('');
  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setPasswordCf] = useState('');
 const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/host/registerH",
       {
        first_name:first_name,
        last_name:last_name,
        birth_date:birth_date,
        address:address,
        telephone:telephone,
        email:email,
        password:password,
        Cpassword:Cpassword,
        company_name:company_name,
        CIN:CIN,
       }
      );
      console.log(response.data);
      navigate("/LoginPage");
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors || {});
      }
    }

  };

  return (
    <div className="py-16 lg:mt-24 mt-12">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Register As Host</p>
            <div className="mt-2 flex">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  className="bg-gray-200 text-gray-700 px-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 w-full appearance-none"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={(e)=>SetFirstName(e.target.value)}
                  
                />
                 <p  className="text-red-500 text-sm mb-4">{errors.first_name}</p>
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  className="bg-gray-200 text-gray-700 px-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 w-full appearance-none"
                  type="text"
                  placeholder=" Last Name"
                  name="last_name"
                  onChange={(e)=>SetLastName(e.target.value)}
                />
                 <p  className="text-red-500 text-sm mb-4">{errors.last_name}</p>
              </div>
            </div>
            <div className="mt-2 flex">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Company Name
                </label>
                <input
                  className="bg-gray-200 text-gray-700 px-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 w-full appearance-none"
                  type="text"
                  placeholder=" Company Name"
                  name="company_name"
                  onChange={(e)=>SetCompanyName(e.target.value)}
                  
                />
                 <p  className="text-red-500 text-sm mb-4">{errors.company_name}</p>
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Birth Date
                </label>
                <input
                  className="bg-gray-200 text-gray-700 px-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 w-full appearance-none"
                  type="date"
                  name="birth_date"
                  onChange={(e)=>SetBirthDate(e.target.value)}
                />
                 <p  className="text-red-500 text-sm mb-4">{errors.birth_date}</p>
              </div>
            </div>
            <div className="mt-2 flex">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  CIN
                </label>
                <input
                  className="bg-gray-200 text-gray-700 px-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 w-full appearance-none"
                  type="text"
                  placeholder="KB11111"
                  name="CIN"
                  onChange={(e)=>setCIN(e.target.value)}
                />.
                 <p  className="text-red-500 text-sm mb-4">{errors.CIN}</p>
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 px-4 text-sm font-bold mb-2">
                  phone number
                </label>
                <input
                  className="bg-gray-200 text-gray-700 px-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 w-full appearance-none"
                  type="tel"
                  placeholder="0601746605"
                  name="telephone"
                  onChange={(e)=>SetTelephone(e.target.value)}
                />
                 <p  className="text-red-500 text-sm mb-4">{errors.telephone}</p>
              </div>
            </div>

            <div >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                placeholder="tangier morocco"
                name="address"
                onChange={(e)=>SetAddress(e.target.value)}
              />
               <p  className="text-red-500 text-sm mb-4">{errors.address}</p>
            </div>
            <div >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                placeholder="examples@example.com"
                name="email"
                onChange={(e)=>SetEmail(e.target.value)}
              />
               <p  className="text-red-500 text-sm mb-4">{errors.email}</p>
            </div>
            <div >
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                placeholder="********************************"
                name="password"
                 onChange={(e)=>setPassword(e.target.value)}
              />
               <p  className="text-red-500 text-sm mb-4">{errors.password}</p>
            </div>
            <div >
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                placeholder="********************************"
                name="Cpassword"
                onChange={(e)=>setPasswordCf(e.target.value)}
                
              />
               <p  className="text-red-500 text-sm mb-4">{errors.Cpassword}</p>
            </div>
            <div className="mt-2">
              <button onClick={handleSubmit} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Register
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="/LoginPage" className="text-xs text-gray-500 uppercase">
                or Login
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterHosterPage;
