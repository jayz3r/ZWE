import { useParams, useNavigate } from "react-router-dom";
import data from "/data.json";

export default function IslandPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const lake = data.data.find((item) => item.id === id);

  if (!lake) return <p className="text-center mt-10">Не найдено</p>;

  return (
    <div className="min-h-screen bg-[url('/island.webp')] bg-cover bg-center p-4 sm:p-6 md:p-10">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-sky-100/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-sky-100/70 transition-colors"
        >
          ← Назад
        </button>

        {/* Show on Map Button */}
        
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#1F3A5F] mb-6 sm:mb-8">
        Остров №{lake.id}
      </h1>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <img
          src={lake.imageUrl}
          loading="lazy"
          alt={lake.name}
          className="w-full md:w-1/2 h-48 md:h-auto object-cover"
        />

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F3A5F] mb-2">
              {lake.name}
            </h1>
            <p className="text-sm sm:text-base text-[#3E6BA8]">{lake.type_label}</p>
            <p className="text-sm sm:text-base mt-1">
              {lake.location.district}, {lake.location.landmark}
            </p>

            <div className="mt-3 sm:mt-4 space-y-1 text-sm sm:text-base">
              <p>Состояние: {lake.status.state}</p>
              <p>Изношенность: {lake.wear_percent}</p>
              <p>Качество воды: {lake.status.water_quality_label}</p>
              <p>Температура: {lake.status.temperature_c}°C</p>
              <p>Аэрация: {lake.status.aeration_system ? "Да" : "Нет"}</p>
            </div>
          </div>

          {/* Inspection History */}
          {lake.inspections && lake.inspections.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <h3 className="font-semibold text-[#1F3A5F] mb-2 text-sm sm:text-base">
                История осмотров
              </h3>

              <div className="space-y-2">
                {lake.inspections.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-sky-50 rounded-lg p-2 sm:p-3"
                  >
                    <span className="text-sm sm:text-base">{item.date}</span>
                    <span className="text-sm sm:text-base font-semibold text-sky-600 mt-1 sm:mt-0">
                      {item.condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
          onClick={() => navigate("/map", { state: { lakeId: lake.id } })}
          className="bg-sky-500 hover:bg-sky-600 text-white mt-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base transition-colors"
        >
          Показать на карте
        </button>
        </div>
      </div>
    </div>
  );
}
