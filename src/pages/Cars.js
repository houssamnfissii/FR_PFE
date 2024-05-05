import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import SearchCar from '../shared/SearchCar';
import CarCard from '../shared/CarCard';
import CommonSection from '../shared/CommonSection';
import NewsLetter from '../shared/Newsletter';
import ScrollToTopButton from '../components/scroll/ScrollToTopButton';
import CarSection from '../shared/CarSection';
import HeaderV1 from '../components/Header/HeaderV1';
import Footer from '../components/Footer/Footer';

export default function Cars() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Default items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cars/car_offers');
                setCars(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = ({ city, brand, model }) => {
        setSelectedCity(city);
        setSelectedBrand(brand);
        setSelectedModel(model);
        setCurrentPage(1); // Reset to first page when searching
    };

    const filterCars = (city, brand, model) => {
        const filtered = cars.filter(({ car }) => {
            const cityMatch = !city || car.city_name === city;
            const brandMatch = !brand || car.brand_name === brand;
            const modelMatch = !model || car.model_name === model;
            return cityMatch && brandMatch && modelMatch;
        });
        setFilteredCars(filtered);
    };

    useEffect(() => {
        filterCars(selectedCity, selectedBrand, selectedModel); // Call filterCars on initial load and when search parameters change
    }, [cars, selectedCity, selectedBrand, selectedModel]);

    // Calculate pagination parameters
    const totalItems = filteredCars.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Slice data for current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

    // Handle items per page change
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Handle pagination button clicks
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-bold text-indigo-700">Loading cars</h2>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
            </div>
        );
    }

    if (!cars) {
        return <div>No data found</div>;
    }

    return (
        <>
        <HeaderV1/>
            <CarSection title={'Cars'} />
            <section>
                <Container>
                    <Row>
                        <Col lg='12' mx='7' md='12'>
                            <SearchCar onSearch={handleSearch} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='pt-4'>
                <Container>
                    <Row>
                        {currentItems.map((car, index) => (
                            <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={index}>
                                <CarCard offer={car.offer} car={car.car} />
                            </Col>
                        ))}
                        <Col lg='12'>
                            {/* Pagination component */}
                            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                                <div className="p-2 border-t border-gray-300 w-full">
                                    <nav
                                        role="navigation"
                                        aria-label="Pagination Navigation"
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex justify-between items-center flex-1 lg:hidden">
                                            <div className="w-10">
                                                <button
                                                    title="Previous"
                                                    type="button"
                                                    className={`flex items-center justify-center rounded-full relative outline-none hover:bg-gray-500/5 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none text-indigo-700 focus:bg-yellow-500/10 hover:bg-indigo-200 w-10 h-10 ${
                                                        currentPage === 1 ? 'pointer-events-none' : ''
                                                    }`}
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <svg
                                                        className="w-5 h-5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="3"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 19l-7-7 7-7"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 rtl:space-x-reverse">
                                                <select
                                                    className="h-8 text-sm px-2 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none  focus:ring-1 focus:ring-inset focus:ring-yellow-500  bg-white-700 dark:border-white-600 focus:border-gray-500"
                                                    value={itemsPerPage}
                                                    onChange={handleItemsPerPageChange}
                                                >
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select>
                                                <span className="text-sm font-medium dark:text-white">
                                                    per page
                                                </span>
                                            </div>
                                            <div className="w-10">
                                                <button
                                                    title="Next"
                                                    type="button"
                                                    className={`flex items-center justify-center rounded-full relative outline-none hover:bg-gray-500/5 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none  text-indigo-700 focus:bg-yellow-500/10 dark:hover:bg-gray-300/5 w-10 h-10 ${
                                                        currentPage === totalPages ? 'pointer-events-none' : ''
                                                    }`}
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <svg
                                                        className="w-5 h-5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="3"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 5l7 7-7 7"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="hidden flex-1 items-center lg:grid grid-cols-3">
                                            <div className="flex items-center">
                                                <div className="pl-2 text-sm font-medium">
                                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} results
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex items-center space-x-2 filament-tables-pagination-records-per-page-selector rtl:space-x-reverse">
                                                    <label>
                                                        <select
                                                            className="h-8 text-sm pr-8 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-inset focus:ring-yellow-500   border-gray-600"
                                                            value={itemsPerPage}
                                                            onChange={handleItemsPerPageChange}
                                                        >
                                                            <option value="5">5</option>
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                        </select>
                                                        <span className="text-sm font-medium">
                                                            per page
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <div className="py-3 border rounded-lg dark:border-gray-600">
                                                    <ol className="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600">
                                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                                            <li key={pageNumber}>
                                                                <button
                                                                    type="button"
                                                                    className={`relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none ${
                                                                        currentPage === pageNumber ? 'filament-tables-pagination-item-active text-yellow-600' : 'hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                                                                    }`}
                                                                    onClick={() => handlePageChange(pageNumber)}
                                                                >
                                                                    <span>{pageNumber}</span>
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </Col>
                        <ScrollToTopButton />
                    </Row>
                </Container>
            </section>
            <NewsLetter />
            <Footer />
        </>
    );
}
