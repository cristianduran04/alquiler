import React, { useState } from "react";

const RentalForm = ({ addRental }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [items, setItems] = useState([]); // Lista de ítems
  const [itemName, setItemName] = useState(""); // Campo para ingresar ítem

  // Agregar ítems a la lista
  const handleAddItem = () => {
    if (itemName.trim() !== "") {
      setItems([...items, itemName]); // Agrega el ítem a la lista
      setItemName(""); // Limpia el campo
    }
  };

  // Eliminar un ítem de la lista
  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Guardar el alquiler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !rentalDate || !returnDate || items.length === 0) {
      alert("Todos los campos y al menos un ítem son obligatorios.");
      return;
    }

    addRental({ name, phone, rentalDate, returnDate, items });

    // Reiniciar formulario
    setName("");
    setPhone("");
    setRentalDate("");
    setReturnDate("");
    setItems([]);
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


