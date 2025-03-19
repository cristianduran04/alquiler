import React, { useState } from "react";
import RentalForm from "./components/RentalForm";
import RentalList from "./components/RentalList";
import "./styles/styles.css";

function App() {
  const [rentals, setRentals] = useState([]);

  const addRental = (rental) => {
    setRentals([...rentals, rental]);
  };

  return (
    <div className="container">
      <h1>Alquiler de Mobiliario 🎉</h1>
      <RentalForm addRental={addRental} />
      <RentalList rentals={rentals} />
    </div>
  );
}

export default App;

