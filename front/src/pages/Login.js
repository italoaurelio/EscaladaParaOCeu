import React from "react";

function Login() {
  return (
    <div className="bg-blackMode-700 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
      <form>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold-900 focus:border-gold-900 sm:text-sm"
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
