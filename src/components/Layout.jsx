import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 shadow-sm bg-sky-50">
        <div className="flex items-center justify-between px-4 sm:px-10 h-16">
          {/* Logo */}
          <NavLink to={"/"} className="">
            <h1 className="text-2xl font-bold text-center sm:text-center text-sky-400">
              ZWE
            </h1>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex gap-10 justify-center absolute left-1/2 transform -translate-x-1/2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underlined text-sky-400" : "text-gray-700"
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive ? "underlined text-sky-400" : "text-gray-700"
              }
            >
              Карта
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive ? "underlined text-blue-500" : "text-gray-700"
              }
            >
              Галерея
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "underlined text-blue-500" : "text-gray-700"
              }
            >
              Добавить островок
            </NavLink>
          </nav>

          {/* Mobile burger */}
          <button className="sm:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-800" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`
            sm:hidden overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-60" : "max-h-0"}
            bg-sky-50
          `}
        >
          <nav className="flex flex-col gap-4 p-4">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underlined text-blue-500 text-lg"
                  : "text-gray-700 text-lg"
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/map"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underlined text-blue-500 text-lg"
                  : "text-gray-700 text-lg"
              }
            >
              Карта
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underlined text-blue-500 text-lg"
                  : "text-gray-700 text-lg"
              }
            >
              Галерея
            </NavLink>
            <NavLink
              to="/add"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underlined text-blue-500 text-lg"
                  : "text-gray-700 text-lg"
              }
            >
              Добавить островок
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="bg-[#1F3A5F] text-white py-8">
  <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
    
    {/* Logo + Nav */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      {/* Logo */}
      <NavLink to={"/"}>
        <h2 className="text-2xl font-bold">ZWE</h2>
      </NavLink>

      {/* Nav Links */}
      <nav className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-4 sm:mt-0">
        <NavLink
          to="/map"
          className="hover:text-sky-400 transition-colors duration-200"
        >
          Карта
        </NavLink>
        <NavLink
          to="/gallery"
          className="hover:text-sky-400 transition-colors duration-200"
        >
          Галлерея
        </NavLink>
        <NavLink
          to="/add"
          className="hover:text-sky-400 transition-colors duration-200"
        >
          Добавить островок
        </NavLink>
      </nav>
    </div>

    {/* Copyright text */}
    <div className="mt-4 sm:mt-0 text-right text-sm text-gray-400">
      © 2026 ZWE — экологический проект по очистке водоёмов
    </div>
  </div>
</footer>

    </div>
  );
};

export default Layout;
