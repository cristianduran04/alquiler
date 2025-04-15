import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import "../styles/styles.css";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const rentalsRef = collection(db, "alquileres");
    const q = query(rentalsRef, orderBy("timestamp", "desc")); // Ordena por fecha de creación

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rentalData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRentals(rentalData);
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = (rental) => {
    setEditingId(rental.id);
    setEditData({ ...rental, totalPrice: Number(rental.totalPrice) || 0 });
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      const rentalRef = doc(db, "alquileres", editingId);
      await updateDoc(rentalRef, {
        name: editData.name,
        phone: editData.phone,
        rentalDate: editData.rentalDate,
        returnDate: editData.returnDate,
        totalPrice: Number(editData.totalPrice) || 0,
        items: editData.items,
      });
      setEditingId(null);
      setEditData({});
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "alquileres", id));
  };

  const togglePaid = async (id, isPaid) => {
    const rentalRef = doc(db, "alquileres", id);
    await updateDoc(rentalRef, { isPaid: !isPaid });
  };

  const toggleDelivered = async (id, isDelivered) => {
    const rentalRef = doc(db, "alquileres", id);
    await updateDoc(rentalRef, { isDelivered: !isDelivered });
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
              {editingId === rental.id ? (
                // Modo Edición
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={editData.rentalDate}
                    onChange={(e) =>
                      setEditData({ ...editData, rentalDate: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={editData.returnDate}
                    onChange={(e) =>
                      setEditData({ ...editData, returnDate: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={editData.totalPrice}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        totalPrice: Number(e.target.value) || 0,
                      })
                    }
                  />
                  <textarea
                    value={editData.items.join(", ")}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        items: e.target.value.split(",").map((item) => item.trim()),
                      })
                    }
                  />
                  <button className="save-btn" onClick={handleSaveEdit}>
                    💾 Guardar
                  </button>
                </div>
              ) : (
                // Modo Vista
                <div>
                  <strong>{rental.name}</strong> - 📞 {rental.phone}
                  <p>📅 Alquiler: {rental.rentalDate} | 🏠 Devolución: {rental.returnDate}</p>
                  <p>💰 Total: <strong>${(Number(rental.totalPrice) || 0).toFixed(2)}</strong></p>
                  
                  {/* Estado de pago y entrega */}
                  <p className={rental.isPaid ? "paid" : "not-paid"}>
                    {rental.isPaid ? "✅ Pagado" : "❌ Pendiente de Pago"}
                  </p>
                  <p className={rental.isDelivered ? "delivered" : "not-delivered"}>
                    {rental.isDelivered ? "📦 Entregado" : "⏳ No entregado"}
                  </p>

                  {/* Lista de ítems */}
                  <ul className="rental-items">
                    {rental.items.map((item, i) => (
                      <li key={i}>🛠️ {item}</li>
                    ))}
                  </ul>

                  {/* Botones */}
                  <button onClick={() => handleEditClick(rental)}>✏️ Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(rental.id)}>🗑️ Borrar</button>
                  <button className="paid-btn" onClick={() => togglePaid(rental.id, rental.isPaid)}>
                    {rental.isPaid ? "❌ Marcar como NO pagado" : "✅ Marcar como pagado"}
                  </button>
                  <button className="delivered-btn" onClick={() => toggleDelivered(rental.id, rental.isDelivered)}>
                    {rental.isDelivered ? "⏳ Marcar como NO entregado" : "📦 Marcar como entregado"}
                  </button>
                </div>
              )}
              <hr /> {/* Línea separadora */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalList;

