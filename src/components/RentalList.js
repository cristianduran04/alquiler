import React, { useEffect, useState } from "react";
import { db } from "../services/firebase"; 
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

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

  // Marcar alquiler como entregado
  const markAsDelivered = async (id) => {
    const rentalRef = doc(db, "alquileres", id);
    await updateDoc(rentalRef, { entregado: true });
  };

  // Marcar alquiler como pagado o no pagado
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
        <ul>
          {rentals.map((rental) => (
            <li key={rental.id} className="rental-item">
              <strong>{rental.name}</strong> - 📞 {rental.phone}
              <p>📅 Alquiler: {rental.rentalDate} | 🏠 Devolución: {rental.returnDate}</p>
              <p>💰 Total: <strong>${rental.totalPrice?.toFixed(2) || "0.00"}</strong></p>

              {/* Mostrar estado de pago */}
              <p className={rental.isPaid ? "paid" : "not-paid"}>
                {rental.isPaid ? "✅ Pagado" : "❌ Pendiente de Pago"}
              </p>
              <button onClick={() => togglePaymentStatus(rental.id, rental.isPaid)}>
                {rental.isPaid ? "💳 Marcar como No Pagado" : "💵 Marcar como Pagado"}
              </button>

              {/* Mostrar lista de ítems */}
              <ul>
                {rental.items.map((item, i) => (
                  <li key={i}>🛠️ {item}</li>
                ))}
              </ul>

              {/* Mostrar estado de entrega */}
              {rental.entregado ? (
                <p className="delivered">✅ Entregado</p>
              ) : (
                <button onClick={() => markAsDelivered(rental.id)}>📦 Marcar como Entregado</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentalList;


