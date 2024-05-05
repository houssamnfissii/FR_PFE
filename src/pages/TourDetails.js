import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/tour-details.css";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import TimeAgo from "../components/format-date/TimeAgo";
import Booking from "../components/Booking/Booking";
// import { Carousel } from "@material-tailwind/react";
import ReviewsPagination from "../components/Review";
import HeaderV1 from "../components/Header/HeaderV1";
import Footer from "../components/Footer/Footer";
export default function TourDetails() {
  const { id } = useParams();

  const [tourDetails, setTourDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(2); // Number of reviews per page

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/${id}`
        );
        setTourDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const addReview = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: 1, //auth id
          offer_id: tourDetails.offer.id,
          rating: tourRating,
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
    if (tourDetails && tourRating && reviewMsgRef) {
      addReview();
    }
  }, [tourDetails, tourRating, reviewMsgRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
    reviewMsgRef.current.value = "";
    setTourRating(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 lg:mt-24">
        <h2 className="text-3xl font-bold text-indigo-700">Loading Tours</h2>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
      </div>
    );
  }

  if (!tourDetails) {
    return <div>No data found</div>;
  }

  const {
    offer,
    cities,
    activities,
    transports,
    tour_title,
    desc,
    staffs,
    nbr_people,
    price_per_person,
    create_at,
    end_date,
    start_date,
  } = tourDetails;

  const { totalRating, avgRating } = calculateAvgRating(offer.reviews);
  const reviewsToShow = offer.reviews

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
 <HeaderV1/>
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
                {offer.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    className=" imgpricipal h-full w-full object-cover"
                    alt={`image ${index + 1}`}
                  />
                ))}
              </Carousel> */}

              <div className="tour__info">
                <h2 className="text-3xl font-bold mb-4">{tour_title}</h2>
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
                      <span>({offer.reviews?.length})</span>
                    )}
                  </span>
                  <span>
                    <i className="ri-map-pin-fill"></i>{" "}
                    {Object.values(cities).map((city, index) => (
                      <span key={index}>
                        {city}
                        {index < Object.values(cities).length - 1 && (
                          <i className="ri-arrow-right-circle-fill "></i>
                        )}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i className="ri-wallet-3-line"></i> {price_per_person}DH
                    /per person
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i className="ri-group-line"></i> {nbr_people} people
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-calendar-line"></i> Start : {start_date}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-calendar-check-line"></i>
                    End : {end_date}
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-bus-wifi-line"></i>{" "}
                    {transports[0].type ? transports[0].type : ""}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-user-3-line"></i>
                    {staffs[0].role ? staffs[0].role : ""}
                  </span>
                </div>

                <h5 className="text-xl font-bold mb-4">Description</h5>
                <p>{desc}</p>
              </div>
              <div className="tour__info">
                <h5 className="text-xl font-bold mb-4">Activity</h5>
                <div className="tour__activities">
                  <ol>
                    {activities.map((activity, index) => (
                      <li key={index}>
                        <h3 className="text-xl text-green-500">
                          <i class="ri-check-double-line"></i>
                          {activity.name}
                        </h3>
                        <ul>
                          <p>{activity.description}</p>
                        </ul>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="tour__info">
                <h5 className="text-xl font-bold mb-4">Host Informations</h5>
                <div className="tour__activities">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-user-line"></i> {offer.host.first_name}{" "}
                    {offer.host.last_name}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i class="ri-phone-line"></i>
                    {offer.host.telephone}
                  </span>
                </div>
              </div>

              <div className="tour__reviews mt-4">
                <h4 className="text-xl font-bold mb-4">
                  ({offer.reviews?.length} reviews)
                </h4>
                {/* Hide this form when user submits a review */}
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex align-align-items-center gap-3 mb-4 rating__group ">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        onMouseEnter={() => setHoveredRating(value)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setTourRating(value)}
                        style={{ fontSize: 35 }}
                      >
                        <i
                          className={
                            value <= (hoveredRating || tourRating)
                              ? "ri-star-s-fill"
                              : "ri-star-s-line"
                          }
                          style={{
                            color: value <= hoveredRating ? "yellow" : "",
                          }}
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
            <Booking tour={tourDetails} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>

 <Footer/>
 </>
  );
}
