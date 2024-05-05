import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/tour-details.css";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
// import avatar from "../assets/images/avatar.jpg";
import TimeAgo from "../components/format-date/TimeAgo";
import Booking from "../components/Booking/Booking";
import { MdDescription, MdLocalDining } from "react-icons/md";
import { BiTable } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import BookingResto from "../components/Booking/BookingResto";
// import { Carousel } from "@material-tailwind/react";
import ReviewsPagination from "../components/Review";
// import HeaderV1 from "../components/Header/HeaderV1";
import Footer from "../components/Footer/Footer";

export default function RestaurantDetails() {
  const { id } = useParams();
  const [RestaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewMsgRef = useRef("");
  const [RestaurantRating, setRestaurantRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(2); // Number of reviews per page


  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/restaurants/${id}`
        );
        setRestaurantDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);
  console.log(RestaurantDetails);

  const addReview = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: 1, //auth id
          offer_id: RestaurantDetails.offer[0].id,
          rating: RestaurantRating,
          body: reviewMsgRef.current.value,
        }),
      })
        .then((resp) => resp.json())
        .then((newQuestion) => console.log(newQuestion));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    if (RestaurantDetails && RestaurantRating && reviewMsgRef) {
      addReview();
    }
  }, [RestaurantDetails, RestaurantRating, reviewMsgRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
    reviewMsgRef.current.value = "";
    setRestaurantRating(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 lg:mt-24 mt-12">
        <h2 className="text-3xl font-bold text-indigo-700">Loading Restaurant</h2>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
      </div>
    );
  }

  if (!RestaurantDetails) {
    return <div>No data found</div>;
  }

  const {
    restaurant,
    offer,
    tables,

    
  } = RestaurantDetails;




  const { totalRating, avgRating } = calculateAvgRating(offer[0].reviews);
 

  const reviewsToShow = offer[0].reviews
    // Logic for pagination
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviewsToShow.slice(
      indexOfFirstReview,
      indexOfLastReview
    );
  
    const totalPages = Math.ceil(reviewsToShow.length / reviewsPerPage);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  


  return (
   <>
   {/* <HeaderV1/> */}
   <section>
      <Container className="lg:mt-24 mt-12"> 
        <Row>
          <Col lg="8">
            <div className="tour__content">
            {/* <Carousel
                className="rounded-xl"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
              >
                { offer[0].images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    className=" imgpricipal h-full w-full object-cover"
                    alt={`image ${index + 1}`}
                  />
                ))}
              </Carousel> */}
              <div className="tour__info">
                <h2 className="text-3xl font-bold mb-4">{restaurant.name}  - {restaurant.cuisine.name}</h2>
                <div className="flex flex-wrap items-center gap-5">
                  <span className="tour__rating flex items-center gap-1">
                    <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>{" "}
                    {calculateAvgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({offer[0].reviews?.length})</span>
                    )}
                  </span>
                  <span>
                    <i className="ri-map-pin-fill"></i>{restaurant.city.name}
               
                  </span>
                </div>
                <div className="tour__extra-details">
                  {/* <span className="text-xs sm:text-sm lg:text-base">
                    <i className="ri-wallet-3-line"></i> Starting from {prixParnight}DH 
                    /per night
                  </span> */}
                  <span className="text-xs sm:text-sm lg:text-base">
                  <IoFastFoodOutline className="text-xl" /> {restaurant.nbr_tables} avaible tables 
                  </span>
                </div>
                <h5 className="text-xl font-bold mb-4">Description</h5>
                <p>{restaurant.description}</p>
              </div>
              <div className="tour__info">
                <h5 className="text-xl font-bold mb-4">Host Informations</h5>
                <div className="tour__activities">
                <span className="text-xs sm:text-sm lg:text-base">
                <i class="ri-user-line"></i> {offer[0].host.first_name} {offer[0].host.last_name}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                  <i class="ri-phone-line"></i>
                    {offer[0].host.telephone}
                  </span>
                </div>
              </div>

              <div className="tour__reviews mt-4">
                <h4 className="text-xl font-bold mb-4">
                  ({offer[0].reviews?.length} reviews)
                </h4>
                {/* Hide this form when user submits a review */}
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex align-align-items-center gap-3 mb-4 rating__group ">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        onMouseEnter={() => setHoveredRating(value)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRestaurantRating(value)}
                        style={{ 'fontSize':35 }}
                      >
                        
                        <i
                         
                          className={
                            value <= (hoveredRating || RestaurantRating)
                              ? "ri-star-s-fill"
                              : "ri-star-s-line"
                          }
                          style={{ color: value <= hoveredRating ? "yellow" : "" }}
                        ></i>
                      </span>
                    ))}
                  </div>
                  <div className="review__input">
                    <input
                      type="text"
                      placeholder="share your thoughts"
                      ref={reviewMsgRef}
                      required
                    />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user__reviews">
                  {currentReviews?.map((review) => (
                    <div className="review__item">
                      {/* <img src={avatar} alt="" /> */}

                      <div className="w-100">
                        <div className="d-flex align-align-items-center justify-content-between">
                          <div>
                            <h5 className="text-sm font-bold ">
                              {review.client.first_name}
                            </h5>
                            {
                              <span className="text-sm">
                                {" "}
                                <TimeAgo timestamp={review.created_at} />
                              </span>
                            }
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i class="ri-star-fill"></i>
                          </span>
                        </div>
                        <h6> {review.body}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
                <div className="pagination  d-flex justify-center align-items-center">
                  <ReviewsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                  />
                </div>
              </div>
              {/* Tour reviews section end */}
            </div>
          </Col>
          <Col lg="4">
            <BookingResto RestaurantDe={restaurant} offer={offer} tables={tables} totalRating={totalRating} id={id} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
   <Footer/>
   </>

 
  );
}
