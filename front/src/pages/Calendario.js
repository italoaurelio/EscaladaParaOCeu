import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Para interação
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/interaction/main.css';

// Definindo as cores dos tempos litúrgicos
const liturgicalColors = {
  Advento: '#4F46E5',
  Natal: '#DC2626',
  Páscoa: '#FBBF24',
  Comum: '#16A34A',
};

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleDateClick = (info) => {
    setCurrentEvent({
      id: Date.now(),
      title: '',
      description: '',
      category: 'Advento', // Cor inicial, pode ser alterado
      people: 10, // Número de pessoas inicialmente
      date: info.dateStr,
    });
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    alert(`Evento: ${event.title}\nDescrição: ${event.extendedProps.description}`);
    // Mostra o botão "Eu vou" ou algo do tipo, e decrementa 1 na quantidade de pessoas
    if (event.extendedProps.people > 0) {
      event.setExtendedProp('people', event.extendedProps.people - 1);
    }
  };

  const handleSaveEvent = () => {
    setEvents([...events, currentEvent]);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Calendário de Missas</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          ...event,
          backgroundColor: liturgicalColors[event.category],
          borderColor: liturgicalColors[event.category],
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl mb-4">Editar Missa</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg">Nome da Missa</label>
              <input
                type="text"
                id="title"
                name="title"
                value={currentEvent.title}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg">Descrição</label>
              <textarea
                id="description"
                name="description"
                value={currentEvent.description}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="people" className="block text-lg">Quantas pessoas</label>
              <input
                type="number"
                id="people"
                name="people"
                value={currentEvent.people}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-lg">Selecione o Tempo Litúrgico</label>
              <select
                id="category"
                name="category"
                value={currentEvent.category}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              >
                <option value="Advento">Advento</option>
                <option value="Natal">Natal</option>
                <option value="Páscoa">Páscoa</option>
                <option value="Comum">Comum</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
