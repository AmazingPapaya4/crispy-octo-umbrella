import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function EmployeeCreate(location) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  async function handleClick() {
    const csrfToken = Cookies.get("csrftoken");
    try {
      let response = await fetch("/api/v1/users/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullname,
          email: email,
          is_admin: isAdmin,
          username: username,
        }),
      });
      response = await response.json();
      // using confirm as temporary feedback and refreshes the page
      let confirmation = confirm("Employee created!");
      if (confirmation || !confirmation) {
        history.push("/employees");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <h1 className="page__title">Create employee</h1>
      <label className="labels">Full Name</label>
      <input
        className="inputs"
        placeholder="Yamada Taro"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />

      <label className="labels">Email</label>
      <input
        className="inputs"
        placeholder="yamada.taro@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="labels">Username</label>
      <input
        className="inputs"
        placeholder="yamada.taro"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="labels">Administrator</label>
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <input
          placeholder="yamada.taro@gmail.com"
          type="checkbox"
          onChange={(e) => setIsAdmin(e.target.value)}
        />
      </div>

      <button className="button__primary" onClick={handleClick}>
        Create
      </button>
    </div>
  );
}
