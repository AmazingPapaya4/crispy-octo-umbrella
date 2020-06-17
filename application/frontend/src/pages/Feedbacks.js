import React from "react";
import FeedbackCard from "../components/FeedbackCard";

export default function Feedbacks({ userData }) {
  return (
    <div className="container">
      <h1 className="page__title">Feedbacks</h1>
      {userData && userData.feedbacks.length
        ? userData.feedbacks.map((feedbackId) => (
            <FeedbackCard id={feedbackId} key={feedbackId}/>
          ))
        : null}
    </div>
  );
}
