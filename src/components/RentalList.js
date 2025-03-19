import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Escuchar cambios en tiempo real en la colección "alquileres"
    const unsubscribe = onSnapshot(collection(db, "alquileres"), (snapshot) => {
      const rentalData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRentals(rentalData);
    });

    return () => unsubscribe(); // Detener la suscripción al desmontar
  }, []);

  return (
    <div className="rental-list">
      <h2>📋 Lista de Alquileres</h2>
      {rentals.length === 0 ? (
        <p>No hay alquileres registrados.</p>
      ) : (
        <ul>
          {rentals.map((rental) => (
            <li key={rental.id} className="rental-item">
              <strong>{rental.name}</strong> - 📞 {rental.phone}
              <p>📅 Alquiler: {rental.rentalDate} | 🏠 Devolución: {rental.returnDate}</p>
              <ul>
                {rental.items.map((item, i) => (
                  <li key={i}>🛠️ {item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentalList;


