import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/tour-details.css";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
// import avatar from "../assets/images/avatar.jpg";
import TimeAgo from "../components/format-date/TimeAgo";
import BookingCar from "../components/Booking/BookingCar";
import ReviewsPagination from "../components/Review";
import HeaderV1 from "../components/Header/HeaderV1";
import Footer from "../components/Footer/Footer";

export default function CarDetails() {
  const { id } = useParams();
  const [CarDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewMsgRef = useRef("");
  const [carRating, setCarRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(2); // Number of reviews per page

  const [selectedImage, setSelectedImage] = useState();

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };



  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cars/${id}`
        );
        setCarDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);
  console.log(CarDetails);

  const addReview =  () => {
    try {
       fetch("http://127.0.0.1:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: 1, //auth id
          offer_id: CarDetails.offer[0].id,
          rating: carRating,
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
    if (CarDetails && carRating && reviewMsgRef) {
      addReview();
    }
  }, [CarDetails, carRating, reviewMsgRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
    reviewMsgRef.current.value = "";
    setCarRating(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-3xl font-bold text-indigo-700">Loading Car</h2>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
      </div>
    );
  }

  if (!CarDetails) {
    return <div>No data found</div>;
  }

  const {
    car,
    model,
    brand,
    offer,
    city

    
  } = CarDetails;




  const { totalRating, avgRating } = calculateAvgRating(offer[0].reviews);
  const carImage =
    offer[0].images.length > 0 && offer[0].images[0].url ? offer[0].images[0].url : "";

  const reviewsToShow = offer[0].reviews
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
  const productionDate = new Date(car.production_date);
  const productionYear = productionDate.getFullYear();

  return (
  <>
  <HeaderV1/>
  <section>
      <Container className="lg:mt-24 mt-12">
        <Row>
          <Col lg="8">
            <div className="tour__content">
            <img
        className="  imgpricipal h-96 rounded-lg cursor-pointer transition duration-300 md:w-1000 md:h-600"
        src={!selectedImage ? carImage : selectedImage}  
        alt=""
      />

      <div className="grid grid-cols-5 gap-4">
        {offer[0].images.map((image, index) => (
          <div key={index}>
            <img
              className="img w-full h-20 md:h-auto rounded-lg cursor-pointer transition duration-300 transform hover:scale-105"
              src={image.url}
              alt=""
              onClick={() => handleImageClick(image.url)}
            />
          </div>
        ))}
      </div>

            

              <div className="tour__info">
                <h2 className="text-3xl font-bold mb-4">{model.name}  - {brand.name}</h2>
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
                    <i className="ri-map-pin-fill"></i>{city.name}
               
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i className="ri-wallet-3-line"></i> {car.price_per_day}DH
                    /per day
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i className="ri-group-line"></i> {car.nbr_places} seats
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-calendar-line"></i> production year: {productionYear}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                  <i class="fa-solid fa-gas-pump"></i>
                     {car.fuel}
                  </span>
                </div>

                <h5 className="text-xl font-bold mb-4">Description</h5>
                <p>{car.description}</p>
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
                        onClick={() => setCarRating(value)}
                        style={{ 'fontSize':35 }}
                      >
                        
                        <i
                         
                          className={
                            value <= (hoveredRating || carRating)
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
            <BookingCar car={car} avgRating={avgRating} offer={offer} totalRating={totalRating} />
          </Col>
        </Row>
      </Container>
    </section>
  <Footer/>
  </>
 
  );
}
