import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCar = React.memo(({ onSearch }) => {
    const [model, setModel] = useState("");
    const [models, setModels] = useState([]);
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState([]);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCities();
        getBrands();
        getModels();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cities');
            setCities(response.data.cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const getBrands = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/brands');
            setBrands(response.data.brands);
        } catch (error) {
            console.error('An error occurred while fetching brands:', error);
        }
    };

    const getModels = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/models');
            setModels(response.data.models);
        } catch (error) {
            console.error('An error occurred while fetching models:', error);
        }
    };
    useEffect(() => {
        onSearch({ city, brand, model });
    }, [city, brand, model]); // Update search results whenever city, brand, or model changes

    const handleCancel = () => {
        setCity('');
        setBrand('');
        setModel('');
        onSearch({ city: '', brand: '', model: '' });
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
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full md:w-64 lg:w-96 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="" disabled>Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full md:w-64 lg:w-96 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="" disabled>Select Model</option>
                    {models.map((model) => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
                        { (city || brand || model) ? (
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

export default SearchCar;
