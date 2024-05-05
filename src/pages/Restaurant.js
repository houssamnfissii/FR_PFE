import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import RestoCard from "../shared/RestoCard";
import NewsLetter from "../shared/Newsletter";
import ScrollToTopButton from "../components/scroll/ScrollToTopButton";
import RestoSection from "../shared/RestoSection";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import HeaderV1 from "../components/Header/HeaderV1";
import Footer from "../components/Footer/Footer";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cities, setCities] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage, setItemsPerPage] = useState(6); // Items per page state
  const [loading, setLoading] = useState(true);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Pagination Logic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/restaurants/restaurant_offers"
        );
        setRestaurants(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cities");
        setCities(response.data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/cuisines/cuisines/cuisines"
        );
        console.log(response.data.cuisine);
        setCuisines(response.data.cuisine);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };

    fetchData();
    fetchCities();
    fetchCuisines();
  }, []);

  useEffect(() => {
    const filterRestaurants = () => {
      const filtered = restaurants.filter(({ restaurant }) => {
        const cityMatch =
          !selectedCity || restaurant.city_name === selectedCity;
        const cuisineMatch =
          !selectedCuisine || restaurant.cuisine_name === selectedCuisine;
        return cityMatch && cuisineMatch;
      });
      setFilteredRestaurants(filtered);
    };

    filterRestaurants();
    setFiltersApplied(selectedCity || selectedCuisine ? true : false);
  }, [restaurants, selectedCity, selectedCuisine]);

  // Calculate pagination parameters
  const totalItems = filteredRestaurants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Slice data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle pagination button clicks
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <HeaderV1/>
      <RestoSection title={"Restaurants"} />
      <section>
        <Container>
          <Row className="bg-white p-4 rounded-lg shadow-lg">
            <Col lg="4" md="6">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                style={{ fontSize: "16px" }}
              >
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </Col>
            <Col lg="4" md="6">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                style={{ fontSize: "16px" }}
              >
                <option value="">Select a cuisine</option>
                {cuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </Col>
            <Col lg="4" md="6">
              {filtersApplied ? (
                <button
                  onClick={() => {
                    setSelectedCity("");
                    setSelectedCuisine("");
                  }}
                  className="w-full  mb-2 px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedCity("");
                    setSelectedCuisine("");
                  }}
                  disabled={true}
                  className="w-full  mb-2 px-4 py-3 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  Cancel
                </button>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-4">
        <Container>
          <Row>
            {currentItems.map((res, index) => (
              <Col
                lg="4"
                mx="7"
                xl="3"
                md="6"
                className="mb-3 mb-lg-3"
                key={index}
              >
                <RestoCard restaurant={res.restaurant} offer={res.offer} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                <div class="p-2 border-t border-gray-300  w-full">
                  <nav
                    role="navigation"
                    aria-label="Pagination Navigation"
                    class="flex items-center justify-between"
                  >
                    <div class="flex justify-between items-center flex-1 lg:hidden">
                      <div class="w-10">
                        <button
                          title="Previous"
                          type="button"
                          class={`flex items-center justify-center rounded-full relative outline-none hover:bg-gray-500/5 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none text-indigo-700 focus:bg-yellow-500/10 hover:bg-indigo-200 w-10 h-10 ${
                            currentPage === 1 ? "pointer-events-none" : ""
                          }`}
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          <span class="sr-only">Previous</span>
                          <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div class="flex items-center gap-2 rtl:space-x-reverse">
                        <select
                          class="h-8 text-sm px-2 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none  focus:ring-1 focus:ring-inset focus:ring-yellow-500  bg-white-700 dark:border-white-600 focus:border-gray-500"
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
                        >
                          <option value="6">6</option>
                          <option value="12">12</option>
                          <option value="18">18</option>
                          <option value="24">24</option>
                        </select>
                        <span class="text-sm font-medium dark:text-white">
                          per page
                        </span>
                      </div>
                      <div class="w-10">
                        <button
                          title="Next"
                          type="button"
                          class={`flex items-center justify-center rounded-full relative outline-none hover:bg-gray-500/5 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none  text-indigo-700 focus:bg-yellow-500/10 dark:hover:bg-gray-300/5 w-10 h-10 ${
                            currentPage === totalPages
                              ? "pointer-events-none"
                              : ""
                          }`}
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          <span class="sr-only">Next</span>
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div class="hidden flex-1 items-center lg:grid grid-cols-3">
                      <div class="flex items-center">
                        <div class="pl-2 text-sm font-medium">
                          Showing {indexOfFirstItem + 1} to{" "}
                          {Math.min(indexOfLastItem, totalItems)} of{" "}
                          {totalItems} results
                        </div>
                      </div>
                      <div class="flex items-center justify-center">
                        <div class="flex items-center space-x-2 filament-tables-pagination-records-per-page-selector rtl:space-x-reverse">
                          <label>
                            <select
                              class="h-8 text-sm pr-8 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-inset focus:ring-yellow-500   border-gray-600"
                              value={itemsPerPage}
                              onChange={handleItemsPerPageChange}
                            >
                              <option value="8">8</option>
                              <option value="12">12</option>
                              <option value="18">18</option>
                              <option value="24">24</option>
                            </select>
                            <span class="text-sm font-medium">per page</span>
                          </label>
                        </div>
                      </div>
                      <div class="flex items-center justify-end">
                        <div class="py-3 border rounded-lg dark:border-gray-600">
                          <ol class="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600">
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((pageNumber) => (
                              <li key={pageNumber}>
                                <button
                                  type="button"
                                  class={`relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none ${
                                    currentPage === pageNumber
                                      ? "filament-tables-pagination-item-active text-yellow-600"
                                      : "hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition"
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
      <Footer/>
    </>
  );
}
