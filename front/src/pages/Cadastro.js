import React, { useState } from "react";
import axios from "axios";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifique se a URL está correta, no caso, o backend está rodando na porta 3000
      const response = await axios.post("http://localhost:3000/usuarios/cadastro", formData);
      console.log(response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="bg-blackMode-700 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-white">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-white">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gold-900 text-blackMode-700 px-4 py-2 rounded-md shadow-md hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
