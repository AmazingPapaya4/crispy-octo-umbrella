import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";

export default function Employees() {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/v1/users/");
      response = await response.json();
      setEmployees(response);
      console.log(response)
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="page__title">Employees</h1>
      <Link to="/employees/new">
        <button className="button__primary">New</button>
      </Link>
      {employees && employees.length
        ? employees.map((employee) => (
          <EmployeeCard employee={employee} key={employee.id} />
        ))
        : null}
    </div>
  );
}
