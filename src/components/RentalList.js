import React from "react";

const RentalList = ({ rentals }) => {
  return (
    <div className="rental-list">
      <h2>Lista de Alquileres</h2>
      {rentals.length === 0 ? (
        <p>No hay alquileres registrados.</p>
      ) : (
        rentals.map((rental, index) => (
          <div key={index} className="rental-item">
            <div>
              <strong>{rental.name}</strong> - 📞 {rental.phone}
              <p>📅 Alquiler: {rental.rentalDate} | 🏠 Devolución: {rental.returnDate}</p>
              <ul>
                {rental.items.map((item, i) => (
                  <li key={i}>🛠️ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RentalList;

