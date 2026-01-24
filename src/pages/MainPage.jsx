import React from "react";
import { NavLink } from "react-router-dom";
import Problems from "../components/Problems";
import Solution from "../components/Solution";

const MainPage = () => {
  return (
    <div>
      <div className="wrapper bg-sky-100 ">
        <div className="main__section bg-[url('/zweBG.jpg')] bg-cover bg-center h-screen shadow-lg rounded-lg flex flex-col justify-start  items-center ">
          <div className="absolute inset-0  from-white/80 via-white/50 to-transparent"></div>

          <section className="relative">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
              <div className="grid lg:grid-cols-2 items-center min-h-[80vh] pt-24">
                <div className="max-w-xl sm:text-left text-left">
                  <h1 className="text-4xl font-bold text-[#1F3A5F]">
                    Очищаем водоёмы
                    <br />с помощью фито-островов
                  </h1>

                  <p className="mt-4 text-2xl text-[#3E6BA8] lg:w-lg">
                    Экологичное решение проблемы загрязнения воды в Кыргызстане
                  </p>

                  <button className="mt-6 px-6 py-3 rounded-xl hover:bg-sky-500 hover:text-white bg-white/75 text-sky-600 transition-colors duration-300">
                  <NavLink to="/add">
                    Подключить водоём
                  </NavLink>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Problems/>
        <Solution/>
      </div>
    </div>
  );
};

export default MainPage;
