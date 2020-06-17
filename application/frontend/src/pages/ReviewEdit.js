import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function ReviewEdit({ location }) {
  const { review } = location.state;
  const [users, setUsers] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/v1/users/");
      response = await response.json();
      setUsers(response);
      setAssignee(response[0].id);
    }
    fetchData();
  }, []);

  function handleChange(event) {
    setAssignee(Number(event.target.value));
  }

  async function handleClick() {
    // Create new feedback
    const csrfToken = Cookies.get("csrftoken");
    try {
      let response = await fetch("/api/v1/feedbacks/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: review.id,
          assignee: assignee
        }),
      });
      response = await response.json();
      // using confirm as temporary feedback and refreshes the page
      let confirmation = confirm("Assigned!");
      if (confirmation || !confirmation) {
        history.push("/reviews");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <h1 className="page__title">Review #{review.id}</h1>
      <h3>Assigned reviewers</h3>
      <ul style={{width: '100%'}}>
        {review.feedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.assignee_username}</li>
        ))}
      </ul>
      <select name="assignees" id="assignees" onChange={handleChange}>
        {users && users.map((user) => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button className="button__primary" onClick={handleClick}>Assign</button>
    </div>
  );
}
