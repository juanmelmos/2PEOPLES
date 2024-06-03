import { useEffect, useState } from "react";

interface EventData {
  id: number;
  foto: string;
  descripcion: string;
  nombre: string;
  ubicacion: string;
}

const EventDetail: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('/api/events/test');
        if (!response.ok) {
          throw new Error('Evento no encontrado');
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Error al obtener el evento:', error);
        setError(error.message);
      }
    };

    fetchEventData();
  }, [eventId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!eventData) {
    return <div>Cargando evento...</div>;
  }

  return (
    <div>
      <h2>{eventData.nombre}</h2>
      <p>{eventData.descripcion}</p>
      <p>Ubicación: {eventData.ubicacion}</p>
      <img src={eventData.foto} alt={eventData.descripcion} />
    </div>
  );
};

export default EventDetail;