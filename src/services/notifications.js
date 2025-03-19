// src/services/notifications.js
export const sendWhatsAppReminder = (telefono, nombre, fechaEntrega) => {
    const mensaje = `Hola ${nombre}, te recordamos que debes devolver los ítems alquilados el ${fechaEntrega}. ¡Gracias!`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };
  