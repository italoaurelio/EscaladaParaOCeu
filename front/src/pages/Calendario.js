import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootswatch/dist/darkly/bootstrap.min.css"; // Tema escuro
import "../styles/calendarioCustom.css";

// Cores litúrgicas
const liturgicalColors = {
  verde: "#28a745",
  branco: "#ffffff",
  vermelho: "#dc3545",
  roxo: "#6f42c1",
  preto: "#000000",
  rosa: "#ffc0cb",
};

const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ministryModalOpen, setMinistryModalOpen] = useState(false);
  const [ministryName, setMinistryName] = useState("");
  const [parishes, setParishes] = useState([]); // Estado para armazenar as paróquias
  const [selectedParish, setSelectedParish] = useState(""); // Paróquia selecionada

  // Função para buscar as paróquias do banco de dados
  useEffect(() => {
    const fetchParishes = async () => {
      try {
        const response = await axios.get("/paroquias"); // Substitua pela URL da sua API
        setParishes(response.data); // Supondo que o retorno seja um array de paróquias
      } catch (error) {
        console.error("Erro ao carregar paróquias:", error);
      }
    };

    fetchParishes();
  }, []);

  const handleMinistrySubmit = async (e) => {
    e.preventDefault();
    if (!selectedParish) {
      alert("Por favor, selecione uma paróquia.");
      return;
    }

    try {
      const ministryData = { name: ministryName, parishID: selectedParish };
      await axios.post("/ministerios", ministryData); // Substitua pela URL da sua API
      alert(`Ministério '${ministryName}' criado com sucesso!`);
      setMinistryName("");
      setSelectedParish("");
      setMinistryModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ministério:", error);
      alert("Ocorreu um erro ao criar o ministério.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-center text-3xl mb-6 text-white">Calendário Litúrgico</h1>
      <div className="flex justify-between mb-6">
        <button
          className="px-4 py-2 bg-gold-900 text-black rounded"
          onClick={() => setMinistryModalOpen(true)}
        >
          Criar Ministério
        </button>
      </div>
      <div className="p-6 rounded-lg shadow-xl">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          style={{ height: 600 }}
          className="rounded-lg"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
              border: "none",
            },
          })}
        />
      </div>

      {/* Modal para adicionar ministério */}
      {ministryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-blackMode-700 p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4 text-center text-white">Criar Ministério</h2>
            <form onSubmit={handleMinistrySubmit} className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm mb-2 text-white">Nome do Ministério</label>
                <input
                  type="text"
                  placeholder="Digite o nome do ministério"
                  value={ministryName}
                  onChange={(e) => setMinistryName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-blackMode-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2 text-white">Selecione a Paróquia</label>
                <select
                  value={selectedParish}
                  onChange={(e) => setSelectedParish(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-blackMode-700 text-white"
                  required
                >
                  <option value="">Selecione uma paróquia</option>
                  {parishes.map((parish) => (
                    <option key={parish.paroquiaID} value={parish.paroquiaID}>
                      {parish.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMinistryModalOpen(false)}
                  className="px-6 py-2 mr-4 bg-gray-600 text-white rounded"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2 bg-gold-900 text-black rounded">
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;
