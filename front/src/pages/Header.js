import React from 'react';


const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blackMode-700 text-white p-4 shadow-lg z-50">
      <div className="flex items-center">
        {/* Logo */}
        <img
          src="/assets/SVG/logomarca.svg" // Coloque o caminho da sua logo aqui
          alt="Logo"
          className="h-10 w-10"
        />
      </div>
    </header>
  );
};

export default Header;