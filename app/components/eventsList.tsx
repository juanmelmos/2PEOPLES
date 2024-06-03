'use client'

import { useState } from 'react';
import Image from 'next/image';
import style from '../ui/events.module.css';


interface Event {
  id: number;
  foto: string;
  descripcion: string;
  nombre: string;
  ubicacion: string;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      {events.map((event, index) => (
        <div
          key={index}
          className={style.event}
          onClick={() => handleEventClick(event)}
        >
          <div className={style.imageContainer}>
            <Image
              src={event.foto}
              alt={event.descripcion}
              className={style.image}
              width={300}
              height={200}
            />
            <div className={style.overlay}>
              <h2 className={style.eventTitle}>{event.nombre}</h2>
              <div className={style.overlayContent}>
                <p>{event.descripcion}</p>
                <p>Ubicación: {event.ubicacion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedEvent && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.closeButton} onClick={closeModal}>&times;</span>
            <h1>{selectedEvent.nombre}</h1>
            <Image
              src={selectedEvent.foto}
              alt={selectedEvent.descripcion}
              width={600}
              height={400}
            />
            <p>{selectedEvent.descripcion}</p>
            <p>Ubicación: {selectedEvent.ubicacion}</p>
          </div>
        </div>
      )}
    </>
  );
}