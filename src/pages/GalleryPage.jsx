import React, { useState } from "react";
import galleryData from "/data.json"; // your JSON file
import Card from "../components/Card";

const GalleryPage = () => {
  const [filters, setFilters] = useState({
    region: "",
    status: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter data according to selected region and status
  const filteredData = galleryData.data.filter((item) => {
    const regionMatch =
      filters.region && filters.region !== "all"
        ? item.location.region === filters.region
        : true;
    // Status logic
    const statusLabel =
      item.status.readiness === "yes" ? "В процессе" : "Запланированные";
    const statusMatch =
      filters.status && filters.status !== "all"
        ? statusLabel === filters.status
        : true;

    return regionMatch && statusMatch;
  });

  return (
    <div className='bg-[url("/island.webp")] bg-cover bg-center min-h-screen flex flex-col items-center px-6 py-10 gap-6'>
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Наши острова</h1>
        <h2 className="text-2xl font-bold text-[#3E6BA8] mb-6">
          Реализованные и планируемые проекты по очистке водоемов
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            name="region"
            value={filters.region}
            onChange={handleChange}
            className="inputs w-full sm:w-40 text-[#314D8B] bg-white/60 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="" disabled hidden>
              Выберите регион
            </option>
            <option value="all">Все регионы</option>
            <option>Бишкек</option>
            <option>Ош</option>
            <option>Чуйская область</option>
            <option>Иссык-Кульская область</option>
            <option>Нарынская область</option>
            <option>Таласская область</option>
            <option>Джалал-Абадская область</option>
            <option>Баткенская область</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="inputs w-full sm:w-40 text-[#314D8B] bg-white/60 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="" disabled hidden>
              Статус проекта
            </option>
            <option value="all">Все</option>
            <option>Запланированные</option>
            <option>В процессе</option>
            <option>Завершенные</option>
          </select>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {filteredData.length ? (
            filteredData.map((item) => <Card key={item.id} data={item} />)
          ) : (
            <p className="text-center text-gray-500">
              Нет проектов по выбранным фильтрам
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
