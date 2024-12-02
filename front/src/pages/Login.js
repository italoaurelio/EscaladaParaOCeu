import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Email: "",
      Senha: ""
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token;

        // Armazenando o token no localStorage
        localStorage.setItem("token", token);

        // Redirecionando para a página /escalas
        navigate("/escalas");
      } else {
        const errorData = await response.json();
        setErro(errorData.errors ? errorData.errors[0].msg : "Erro ao realizar login");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="bg-blackMode-700 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={Senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-blackMode-600 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gold-900 text-blackMode-700 px-4 py-2 rounded-md shadow-md hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-4"
        >
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-300">
        Já tem conta?{" "}
        <a
          href="/cadastro"
          className="text-gold-900 font-semibold hover:underline"
        >
          Cadastre-se
        </a>
      </p>
    </div>
  );
}

export default Login;
