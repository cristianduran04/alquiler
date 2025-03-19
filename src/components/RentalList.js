import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import "../styles/styles.css"; // Importamos los estilos

const RentalList = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "alquileres"), (snapshot) => {
      const rentalData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRentals(rentalData);
    });

    return () => unsubscribe();
  }, []);

  const markAsDelivered = async (id) => {
    const rentalRef = doc(db, "alquileres", id);
    await updateDoc(rentalRef, { entregado: true });
  };

  const togglePaymentStatus = async (id, isPaid) => {
    const rentalRef = doc(db, "alquileres", id);
    await updateDoc(rentalRef, { isPaid: !isPaid });
  };

  return (
    <div className="rental-list">
      <h2>📋 Lista de Alquileres</h2>
      {rentals.length === 0 ? (
        <p>No hay alquileres registrados.</p>
      ) : (
        <div>
          {rentals.map((rental) => (
            <div key={rental.id} className="rental-container">
              <strong>{rental.name}</strong> - 📞 {rental.phone}
              <p>📅 Alquiler: {rental.rentalDate} | 🏠 Devolución: {rental.returnDate}</p>
              <p>💰 Total: <strong>${rental.totalPrice?.toFixed(2) || "0.00"}</strong></p>

              <p className={rental.isPaid ? "paid" : "not-paid"}>
                {rental.isPaid ? "✅ Pagado" : "❌ Pendiente de Pago"}
              </p>
              <button onClick={() => togglePaymentStatus(rental.id, rental.isPaid)}>
                {rental.isPaid ? "💳 Marcar como No Pagado" : "💵 Marcar como Pagado"}
              </button>

              <ul className="rental-items">
                {rental.items.map((item, i) => (
                  <li key={i}>🛠️ {item}</li>
                ))}
              </ul>

              {rental.entregado ? (
                <p className="delivered">✅ Entregado</p>
              ) : (
                <button onClick={() => markAsDelivered(rental.id)}>📦 Marcar como Entregado</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalList;



