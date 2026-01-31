
const ProblemCard = ({ img, text }) => {
  return (
    <div className="bg-white/75 rounded-4xl shadow-lg  flex justify-between items-center p-4 max-w-4xl w-full mx-4 my-2">
      <img
        src={img}
        alt=""
        className="w-32 h-32 object-cover rounded-lg shrink-0"
        loading="lazy"
      />

      <h3 className="text-xl sm:text-2xl font-semibold text-[#1F3A5F] text-left flex-1 ml-6">
        {text}
      </h3>
    </div>
  );
};
const Problems = () => {
  const cards = [
    { img: "/lake.svg", text: "В Кыргызстане  около 2000 озёр" },
    { img: "/norms.png", text: "Почти 40% превышают нормы загрязнений" },
    { img: "/o2.svg", text: "Малые водоёмы Чуйской долины теряют кислород" },
    { img: "/Money.svg", text: "«Цветение» воды → массовая гибель рыбы" },
    { img: "/yearly.svg", text: "Экономический ущерб: $24–31 млн ежегодно" },
    { img: "/fish.svg", text: "120 тонн рыбы = до 100 тонн CO₂-эквивалента" },
  ];
 
  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8 py-16">
          <div className="items-center min-h-[80vh]">
            <div className=" text-center ">
              <h2 className="text-4xl font-bold text-[#1F3A5F]">
                Проблема загрязнения водоёмов
              </h2>
              <div className="flex justify-center flex-col items-center mt-4">
                {cards.map((card, index) => (
                  <ProblemCard key={index} img={card.img} text={card.text} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
