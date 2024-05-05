import React, { useState, useEffect } from 'react';
import axios from 'axios';


const SearchHotel = React.memo(({ onSearch }) => {
    const [roomType, setRoomType] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [nbrStars, setNbrStars] = useState("");
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCities();
        getRoomTypes();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cities');
            setCities(response.data.cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const getRoomTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/roomtypes/name');
            setRoomTypes(response.data);
        } catch (error) {
            console.error('An error occurred while fetching room types:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [city, nbrStars, roomType]);
    console.log(city)

    const handleSearch = () => {
        onSearch({ city, nbr_stars: nbrStars, roomType });
    };

    const handleReset = () => {
        setCity('');
        setNbrStars('');
        setRoomType('');
        onSearch({ city: '', nbr_stars: '', roomType: '' });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center">
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full md:w-64 lg:w-96 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full md:w-64 lg:w-96 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="" disabled>Select room type</option>
                    {roomTypes.map((elem, index) => (
                        <option key={index} value={elem}>{elem}</option>
                    ))}
                </select>
                <select
                    value={nbrStars}
                    onChange={(e) => setNbrStars(parseInt(e.target.value))}
                    className="w-full md:w-64 lg:w-96 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="">Select number of stars</option>
                    <option value="1">1 star </option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                </select>
                        { (city || roomType || nbrStars) ? (
                        <button
                            onClick={handleReset}
                            className="w-full md:w-auto lg:w-96 xl:w-72 mb-2 px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                            >
                            Cancel
                        </button>
                    ) : (
                        <button
                            onClick={handleReset}
                            disabled={true}
                            className="w-full md:w-auto lg:w-96 xl:w-72 mb-2 px-4 py-3 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Cancel
                        </button>
                    )}
            </div>
        </div>
    );
});

export default SearchHotel;
