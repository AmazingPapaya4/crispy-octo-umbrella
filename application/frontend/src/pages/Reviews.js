import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewCard from "../components/ReviewCards";

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  // Fetch feedback data
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/v1/reviews/");
      response = await response.json();
      setReviews(response);
      console.log(response)
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="page__title">Reviews</h1>
      <Link to="/reviews/new">
        <button className="button__primary">New</button>
      </Link>
      {reviews && reviews.length
        ? reviews.map((review) => <ReviewCard review={review} key={review.id}/>)
        : null}
    </div>
  );
}
