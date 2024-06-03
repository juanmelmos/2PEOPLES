'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from '../ui/events.module.css';
import { useAuth } from '../context/authContext';
import { exitEvent, participate } from '@/lib/actions';


interface Event {
  id: number;
  image: string;
  description: string;
  resum: string;
  name: string;
  ubication: string;
  owner: number;
  participants: number[];
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isAuthenticated } = useAuth();
  const [idUser, setIdUser] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState('Participate');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])) as { id: number };
      setIdUser(payload.id);
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleParticipateClick = async (event: Event) => {
    setButtonText('Inside');

    const formData = new FormData();
    formData.append('idUser', idUser.toString());
    formData.append('idEvent', event.id.toString());

    await participate(formData);
    event.participants.push(idUser);
    setSelectedEvent({ ...event });
  };

  const handleExitEventClick = async (event: Event) => {
    setButtonText('Participate');

    const formData = new FormData();
    formData.append('idUser', idUser.toString());
    formData.append('idEvent', event.id.toString());

    await exitEvent(formData);
    event.participants = event.participants.filter(participant => participant !== idUser);
    setSelectedEvent({ ...event });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!selectedEvent && events.sort((a, b) => b.id - a.id).map((event, index) => (
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
              <p><strong>Owner: </strong>{selectedEvent.owner}</p>
              <p><strong>Participants: </strong>{selectedEvent.participants.length}</p>
              <div className={style.participateContainer}>
                {(idUser !== 0 ? (selectedEvent.participants.includes(idUser) ? (
                  <button
                    type="button"
                    className={style.participate}
                    onClick={() => handleExitEventClick(selectedEvent)}
                  >
                    Exit
                  </button>
                ) : (
                  <button
                    type="button"
                    className={style.participate}
                    onClick={() => handleParticipateClick(selectedEvent)}
                  >
                    {buttonText}
                  </button>
                )) : null)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}