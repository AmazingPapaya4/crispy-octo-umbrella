import React, { useState, useEffect } from "react";

export default function EmployeeCard({ employee }) {
  const { id, username, email, is_admin } = employee;
  return (
    <div className="card">
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <input id="is_admin" type="checkbox" checked={is_admin} onChange={() => alert("not implemented")}/><label htmlFor="is_admin"> Is admin</label>
    </div>
  );
}
