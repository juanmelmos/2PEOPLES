'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from '../ui/events.module.css';
import { useAuth } from '../context/authContext';
import { exitEvent, participate, isMine, deleteEvent, editEvent } from '@/lib/actions';
import EditEventForm from './editEventForm';

interface Event {
  id: number;
  image: string;
  description: string;
  resum: string;
  name: string;
  ubication: string;
  owner: number;
  participants: number[];
  date: string;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated } = useAuth();
  const [idUser, setIdUser] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState('Participate');
  const [isMyEvent, setMyEvent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])) as { id: number };
      setIdUser(payload.id);
    }
    setIsLoading(false);
  }, [isAuthenticated]);


  // Handle para mostrar los detalles del evento
  const handleEventClick = async (event: Event) => {
    setSelectedEvent(event);
    setMyEvent(await isMine(event.owner.toString(), idUser));
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setMyEvent(false);
    setIsEditing(false);
  };

  // Handle para participar en el evento
  const handleParticipateClick = async (event: Event) => {
    setButtonText('Exit');

    const formData = new FormData();
    formData.append('idUser', idUser.toString());
    formData.append('idEvent', event.id.toString());

    await participate(formData);
    event.participants.push(idUser);
    setSelectedEvent({ ...event });
  };

  // Handle para salirse del evento
  const handleExitEventClick = async (event: Event) => {
    setButtonText('Participate');

    const formData = new FormData();
    formData.append('idUser', idUser.toString());
    formData.append('idEvent', event.id.toString());

    await exitEvent(formData);
    event.participants = event.participants.filter(participant => participant !== idUser);
    setSelectedEvent({ ...event });
  };


  // Handle para eliminar el evento
  const handleDeleteEventClick = async (event: Event) => {
    const formData = new FormData();
    formData.append('eventId', event.id.toString());
    await deleteEvent(formData);
  };

  // Handle para activar el poder editar el evento
  const handleEditEvent = (event: Event) => {
    setIsEditing(true);
  };

  // Handle para guardar los valores que has puesto al editar el evento
  const handleSaveEvent = (updatedEvent: Event) => {
    editEvent(updatedEvent);
    setSelectedEvent(updatedEvent);
    setIsEditing(false);
  };


  // Función para formatear la fecha
  function formatDate(dateString: string) {
    const date = new Date(dateString);

    //Intl.DateTimeFormatOptions hace que pasandole estas opciones y despues la
    //date en formato de Date, no en String, te la muestre como esta establecida
    //internacionalmente
    //Chat GPT hizo esto ya que manejar fechas se complica bastante y no habia
    //tiempo

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZoneName: 'short'
    };

    const formatter = new Intl.DateTimeFormat(undefined, options);
    let formattedDate = formatter.format(date);

    //Poner la primera letra en mayúsculas
    formattedDate = formattedDate.replace(/^\w/, (c) => c.toUpperCase());

    return formattedDate;
  }

   // Fecha y hora actual
  const now = new Date();

  // Filtrar los eventos que aún no han pasado
  const futureEvents = events.filter(event => new Date(event.date) > now);
  // Ordenar los eventos por fecha, de recientes a futuros
  const sortedEventsByDate = futureEvents.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Para que aparezca loading hasta que haya conseguido el id del usuario
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!selectedEvent && sortedEventsByDate.map((event, index) => (
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
                <p>Ubication: {event.ubication}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedEvent && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.closeButton} onClick={closeModal}>&times;</span>
            {isEditing ? (
              <EditEventForm event={selectedEvent} onSave={handleSaveEvent} onCancel={closeModal} />
            ) : (
              <>
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
                  <p><strong>Date: </strong>{formatDate(selectedEvent.date.toString())}</p>
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

                    {isMyEvent ? (
                      <>
                        <button
                          type="button"
                          className={style.participate}
                          onClick={() => handleEditEvent(selectedEvent)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={`${style.participate} ${style.delete}`}
                          onClick={() => handleDeleteEventClick(selectedEvent)}
                        >
                          Delete
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}