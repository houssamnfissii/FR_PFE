import React from 'react';
import { FaBehance, FaClock, FaFacebookF, FaInstagram, FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import logo from '../../assets/images/logo.png';
import galleryImg1 from '../../assets/images/gallery-011.jpg'
import galleryImg2 from '../../assets/images/gallery-022.jpg'
import galleryImg3 from '../../assets/images/gallery-033.jpg'
import galleryImg4 from '../../assets/images/gallery-044.jpg'
import galleryImg5 from '../../assets/images/gallery-055.jpg'
import galleryImg6 from '../../assets/images/gallery-066.jpg'
import galleryImg7 from '../../assets/images/gallery-077.jpg'
import galleryImg8 from '../../assets/images/gallery-088.jpg'

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto py-12 mx-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img src={logo} alt="Logo" className="mx-auto mb-4 w-24" />
            <p className="text-gray-400 text-lg leading-relaxed">
            Unlock Morocco's Wonders with Effortless Booking of Cars, Hotels, Tours, and Food Experiences.
            </p>
            <h5 className="font-semibold text-xl mt-6 mb-3 text-blac ">Follow us on</h5>
            <div className="flex justify-center space-x-4">
              <FaFacebookF size={20} className=' hover:text-indigo-700 cursor-pointer' />
              <FaBehance size={20} className=' hover:text-indigo-700 cursor-pointer' />
              <FaInstagram size={20} className=' hover:text-indigo-700 cursor-pointer'/>
              <FaWhatsapp size={20} className=' hover:text-indigo-700 cursor-pointer'/>
              <FaLinkedin size={20} className=' hover:text-indigo-700 cursor-pointer'/>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-xl mb-4  text-black">Our Offers</h5>
            <ul className="text-gray-400">
              <li className="mb-2 hover:text-indigo-700 cursor-pointer">Adventure Tours</li>
              <li className="mb-2 hover:text-indigo-700 cursor-pointer">luxe Hotels</li>
              <li className="mb-2 hover:text-indigo-700 cursor-pointer">A lot of activities </li>
              <li className="mb-2 hover:text-indigo-700 cursor-pointer">Speed Cars</li>
              <li className="mb-2 hover:text-indigo-700 cursor-pointer">Food Restaurants</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xl mb-4  text-black">Contact Info</h5>
            <ul className="text-gray-400">
              <li className="mb-2 flex items-center  hover:text-indigo-700 cursor-pointer">
                <FaPhone size={20} className="mr-2" />
                +212 0612345678
              </li>
              <li className="mb-2 flex items-center  hover:text-indigo-700 cursor-pointer">
                <FaClock size={20} className="mr-2" />
               {Date()}
              </li>
              <li className="mb-2 flex items-center  hover:text-indigo-700 cursor-pointer">
                <FaLocationPin size={20} className="mr-2" />
                25/2 Vokte Street Building, Melbourne City
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xl mb-4  text-black">Gallery</h5>
            <div className="grid grid-cols-3 gap-2">
              <img src={galleryImg1} alt="Gallery 1" className="rounded-lg w-full" />
              <img src={galleryImg2} alt="Gallery 2" className="rounded-lg w-full" />
              <img src={galleryImg3} alt="Gallery 3" className="rounded-lg w-full" />
              <img src={galleryImg4} alt="Gallery 4" className="rounded-lg w-full" />
              <img src={galleryImg5} alt="Gallery 5" className="rounded-lg w-full" />
              <img src={galleryImg6} alt="Gallery 6" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-6 bg-white">
        <p className="text-gray-400">© 2024. All Rights Reserved By MoroccanExplorer</p>
      </div>
    </footer>
  );
}
