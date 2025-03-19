import React, { useState } from "react";
import { db } from "../services/firebase"; // Asegúrate de importar la configuración de Firebase
import { collection, addDoc } from "firebase/firestore";

const RentalForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [items, setItems] = useState([]); 
  const [itemName, setItemName] = useState(""); 

  // Agregar ítems a la lista
  const handleAddItem = () => {
    if (itemName.trim() !== "") {
      setItems([...items, itemName]); 
      setItemName(""); 
    }
  };

  // Eliminar un ítem de la lista
  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Guardar el alquiler en Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !rentalDate || !returnDate || items.length === 0) {
      alert("Todos los campos y al menos un ítem son obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "alquileres"), {
        name,
        phone,
        rentalDate,
        returnDate,
        items,
        timestamp: new Date(), // Para ordenamiento en Firestore
      });
      alert("✅ Alquiler guardado correctamente en Firestore!");

      // Reiniciar formulario
      setName("");
      setPhone("");
      setRentalDate("");
      setReturnDate("");
      setItems([]);
    } catch (error) {
      console.error("❌ Error al guardar en Firestore:", error);
      alert("Error al guardar en Firebase");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Alquiler</h2>
      <input type="text" placeholder="Nombre del Cliente" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="date" value={rentalDate} onChange={(e) => setRentalDate(e.target.value)} required />
      <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />

      {/* Sección para agregar ítems */}
      <div className="item-section">
        <input type="text" placeholder="Agregar ítem (ej. Mesa, Silla...)" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <button type="button" onClick={handleAddItem}>➕ Agregar Ítem</button>
      </div>

      {/* Lista de ítems */}
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index}>
            {item} <button type="button" onClick={() => handleRemoveItem(index)}>❌</button>
          </li>
        ))}
      </ul>

      <button type="submit">Guardar Alquiler</button>
    </form>
  );
};

export default RentalForm;


