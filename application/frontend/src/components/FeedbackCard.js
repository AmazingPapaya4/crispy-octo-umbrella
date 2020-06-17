import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function FeedbackCard({ id }) {
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState("");
  // Fetch feedback data
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/v1/feedbacks/" + id);
      response = await response.json();
      setComment(response.message);
      setFeedback(response);
    }
    fetchData();
  }, []);

  async function handleSubmitFeedback() {
    const csrfToken = Cookies.get("csrftoken");
    try {
      let response = await fetch("/api/v1/feedbacks/" + id + "/", {
        method: "PATCH",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: comment,
        }),
      });
      response = await response.json();
      alert("Thanks for the review!"); // using alert as temporary feedback
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="card">
      <h3 className="card__title">
        Review for {feedback ? feedback.reviewing.username : null}
      </h3>
      {feedback ? (
        <>
          <textarea
            className="card__input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="button__primary"
            onClick={() => handleSubmitFeedback()}
          >
            Submit
          </button>
        </>
      ) : null}
    </div>
  );
}
