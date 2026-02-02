import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Card = ({ data = {} }) => {
  const navigate = useNavigate(); // inside component

  const { name, type_label, location, status, imageUrl, id } = data;

  if (!data || !name) return null;

  const statusText =
    status.readiness === "yes"
      ? `Качество воды: ${status.water_quality_label}`
      : `Время запуска: ${status.launch_time}`;

  const handleDetailsClick = () => {
    navigate("/map", {
      state: { lakeId: data.id },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white/70 rounded-2xl shadow-lg overflow-hidden w-full sm:max-w-4xl mx-auto my-4">
      <img
        src={imageUrl}
        alt={name}
        width="192"
        height="192"
        loading="lazy"
        className="w-full sm:w-48 sm:h-auto h-48 object-cover"
      />
      <div className="flex flex-col justify-center p-4 flex-1">
        <h3 className="text-xl font-bold text-[#1F3A5F]">{name}</h3>
        <p className="text-sm text-[#3E6BA8] mt-1">{type_label}</p>
        <p className="text-sm mt-1">
          {location.district}, {location.landmark}
        </p>
        <p className="text-sm font-semibold mt-2">{statusText}</p>
        <NavLink to={`/island/${data.id}`}>
          <button className="mt-3 bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors w-max">
            Подробнее
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
