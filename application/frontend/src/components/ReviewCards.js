import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ReviewCard({ review }) {
  const [targetEmployee, setTargetEmployee] = useState(null);
  const { id, feedbacks, employee } = review;
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/v1/users/" + employee + "/");
      response = await response.json();
      setTargetEmployee(response);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <h3 className="card__title">
        Review #{id} for {targetEmployee ? targetEmployee.username : null}
      </h3>
      {feedbacks.map(({ id, message, assignee_username }) => {
        if (message === "") {
          return;
        }
        return (
          <p key={id}>
            {message} -
            <span style={{ fontStyle: "italic" }}> {assignee_username}</span>
          </p>
        );
      })}
      <button
        className="button__primary"
        onClick={() =>
          history.push({
            pathname: "/reviews/edit",
            state: { review: review },
          })
        }
      >
        Edit
      </button>
    </div>
  );
}
