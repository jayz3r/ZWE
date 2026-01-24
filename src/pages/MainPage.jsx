import React from "react";
import { NavLink } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <div className="wrapper bg-sky-100 ">
        <div className="main__section bg-[url('/zweBG.jpg')] bg-cover bg-center h-screen shadow-lg rounded-lg flex flex-col justify-start  items-center  ">
          <div className="container mx-auto px-6">
            <div className="main__desc w-lg gap-10">
              <h1 className="font-bold text-[#1F3A5F] text-4xl">
                Очищаем водоёмы с помощью фито-островов
              </h1>
              <h3 className="text-[#3E6BA8] font-bold text-2xl">
                Экологичное решение проблемы загрязнения воды в Кыргызстане
              </h3>
              <button className="cursor-pointer border border-white/50 bg-white/50 p-2.5 rounded-2xl">
                <NavLink to={"/add"}>Подключить водоём</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
