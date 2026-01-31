import React from "react";

const SolutionCard = ({ img, text }) => {
  return (
    <div className="bg-white/75 rounded-3xl shadow-lg flex items-center p-4 w-full sm:max-w-xl mx-auto">
      <img
        src={img}
        alt=""
        className="w-16 h-16 object-cover rounded-lg shrink-0"
      />
      <h3 className="text-xl font-semibold text-[#1F3A5F] ml-4 text-left">
        {text}
      </h3>
    </div>
  );
};

const Solution = () => {
  const cards = [
    { img: "/azot.png", text: "Поглощает азот и фосфор" },
    { img: "/kislorod.png", text: "Насыщает воду кислородом" },
    { img: "/mutnost.png", text: "Снижает мутность и цветение" },
  ];

  return (
    <div className="bg-sky-200/50 mx-auto max-w-7xl px-5 sm:px-8 lg:px-8 py-16 rounded-3xl shadow-lg">
      <h2 className="text-4xl font-bold text-[#1F3A5F] text-center">
        Наше решение
      </h2>

      {/* Text + image section */}
      <div className="mt-8 flex flex-col lg:flex-row gap-6 items-center">
        {/* Text */}
        <h4 className="text-2xl sm:text-3xl font-semibold text-[#1F3A5F] text-center lg:text-left lg:w-1/2">
          ZWE использует плавучие фито-острова из местных растений, которые
          естественным образом очищают воду и восстанавливают экосистему.
          <br />
          1 м² фито-острова очищает 100–150 м³ воды
        </h4>

        {/* Image */}
        <img
          src="/zweBG.webp"
          alt=""
          className="w-full sm:w-3/4 lg:w-1/2 rounded-3xl object-cover"
        />
      </div>

      {/* Cards section */}
      <div className="mt-12">
        <h3 className="text-4xl font-bold text-center mb-6">
          Как работает остров?
        </h3>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
          {cards.map((card, index) => (
            <SolutionCard key={index} img={card.img} text={card.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solution;
