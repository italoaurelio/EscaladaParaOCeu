import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Calendario from "./pages/Calendario";

function App() {
  return (
    <Router>
      <div className="bg-blackMode-600 min-h-screen flex flex-col items-center justify-center">
      <Header />
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/escalas" element={<Calendario />} />
          <Route path="*" element={<h1 className="text-white">404 - Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
