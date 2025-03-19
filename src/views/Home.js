// src/views/Home.js
import React, { useState } from "react";
import RentalForm from "../components/RentalForm";
import RentalList from "../components/RentalList";

const Home = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="container">
      <h1>Gestión de Alquileres</h1>
      <RentalForm onNewRental={() => setReload(!reload)} />
      <RentalList key={reload} />
    </div>
  );
};

export default Home;
