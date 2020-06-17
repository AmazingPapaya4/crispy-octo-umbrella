import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function ReviewCreate(location) {
  const [users, setUsers] = useState(null);
  const [reviewedUser, setReviewedUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/v1/users/");
      response = await response.json();
      setUsers(response);
      setReviewedUser(response[0].id);
    }
    fetchData();
  }, []);

  function handleChange(event) {
    setReviewedUser(Number(event.target.value));
  }

  async function handleClick() {
    // Create new feedback
    const csrfToken = Cookies.get("csrftoken");
    try {
      let response = await fetch("/api/v1/reviews/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee: reviewedUser,
        }),
      });
      response = await response.json();
      // using confirm as temporary feedback and refreshes the page
      let confirmation = confirm("Review created!");
      if (confirmation || !confirmation) {
        history.push("/reviews");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <h1 className="page__title">Create review</h1>
      <label htmlFor="reviewed_user" className="labels">Employee</label>
      <select name="reviewed_user" id="reviewed_user" onChange={handleChange} className="inputs">
        {users && users.map((user) => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button className="button__primary" onClick={handleClick}>Create</button>
    </div>
  );
}
