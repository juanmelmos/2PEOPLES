'use client'

import { useState } from 'react';
import Image from 'next/image';
import style from '../ui/events.module.css';


interface Event {
  id: number;
  image: string;
  description: string;
  resum: string;
  name: string;
  ubication: string;
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
      {!selectedEvent && events.map((event, index) => (
        <div
          key={index}
          className={style.event}
          onClick={() => handleEventClick(event)}
        >
          <div className={style.imageContainer}>
            <Image
              src={event.image}
              alt={event.resum}
              className={style.image}
              width={300}
              height={200}
            />
            <div className={style.overlay}>
              <h2 className={style.eventTitle}>{event.name}</h2>
              <div className={style.overlayContent}>
                <p>{event.resum}</p>
                <p>Ubicación: {event.ubication}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedEvent && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.closeButton} onClick={closeModal}>&times;</span>
            <Image
              src={selectedEvent.image}
              alt={selectedEvent.resum}
              className={style.modalImage}
              width={600}
              height={400}
            />
            <h1>{selectedEvent.name}</h1>
            <div className={style.modalText}>
            <p><strong>Description: </strong>{selectedEvent.description}</p>
            <p><strong>Ubication: </strong>{selectedEvent.ubication}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}