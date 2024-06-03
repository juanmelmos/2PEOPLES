'use client';

import { useSearchParams } from "next/navigation";
import style from "../ui/events.module.css";
import React from "react";

const fetchEventData = async (id: string) => {
  // Simulación de la carga de datos desde una API
  const eventData = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        foto: "imagen.jpg",
        descripcion: "Descripción del evento",
        nombre: "Nombre del evento",
        ubicacion: "Ubicación del evento",
      });
    }, 1000); // Simulamos una demora de 1 segundo
  });
  return eventData;
};

const EventComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  // Utilizamos React.lazy y React.Suspense para cargar el componente de manera asincrónica
  const SuspendedEventDetail = React.lazy(() => import("./evenDetail"));

  return (
    <div className={style.event}>
      <React.Suspense fallback={<div>Cargando evento...</div>}>
        <SuspendedEventDetail eventId={id} />
      </React.Suspense>
    </div>
  );
};

export default EventComponent;