import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = React.memo(({ onSearch }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cities');
            setCities(response.data.cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    useEffect(() => {
        onSearch({ startDate, endDate, city });
    }, [startDate, endDate, city]); // Update search results whenever startDate, endDate, or city changes

    const handleCancel = () => {
        setCity('');
        setStartDate(null);
        setEndDate(null);
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
                    <option value="" disabled className="text-sm">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city} className="text-sm">
                            {city}
                        </option>
                    ))}
                </select>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="w-full md:w-auto lg:w-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-800 mb-2 md:mb-0 md:mr-2"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="w-full md:w-auto lg:w-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2"
                />

        { (city || startDate || endDate) ? (
                        <button
                            onClick={handleCancel}
                            className="w-full md:w-auto lg:w-96 xl:w-72 mb-2 px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Cancel
                        </button>
                    ) : (
                        <button
                            onClick={handleCancel}
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

export default SearchBar;
