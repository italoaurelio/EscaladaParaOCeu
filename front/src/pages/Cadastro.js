import React, { useState } from "react";
import axios from "axios";

function Cadastro() {
  const [formData, setFormData] = useState({
    Nome: "",
    Email: "",
    Senha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    try {
      const response = await axios.post("http://localhost:3000/cadastro", formData);
      console.log('Resposta do servidor:', response);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="bg-blackMode-700 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Nome" className="block text-sm font-medium text-white">
            Nome
          </label>
          <input
            type="text"
            id="Nome"
            name="Nome"
            value={formData.Nome}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-blackMode-600 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="Email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-blackMode-600 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="Senha" className="block text-sm font-medium text-white">
            Senha
          </label>
          <input
            type="password"
            id="Senha"
            name="Senha"
            value={formData.Senha}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-blackMode-600 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gold-900 text-blackMode-700 px-4 py-2 rounded-md shadow-md hover:bg-gold-700 focus:outline-none focus:ring-2 focus:white focus:ring-offset-2"
        >
          Cadastrar
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-300">
        Já tem conta?{" "}
        <a
          href="/login"
          className="text-gold-900 font-semibold hover:underline"
        >
          Faça login
        </a>
      </p>
    </div>
  );
}

export default Cadastro;
