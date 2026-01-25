import React, { useState } from "react";

const contactRegex =
  /(^\+?[0-9\s\-]{7,15}$)|(^[^\s@]+@[^\s@]+\.[^\s@]+$)/;

const AddPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    region: "",
    type: "",
    comment: "",
  });

  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  const token = "8349676665:AAG9sWMyYNnuculKzngoR4lGN6qYR27cnck";
  const chat_id = "@zweproject"; 
  const API = `https://api.telegram.org/bot${token}/sendMessage`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactRegex.test(formData.contact)) {
      setError("Введите корректный номер телефона или email");
      return;
    }

    setError("");

    const text = `
🌱 Заявка на фито-остров

👤 Имя: ${formData.name}
📞 Контакт: ${formData.contact}
📍 Регион: ${formData.region}
🌊 Тип водоёма: ${formData.type}
💬 Комментарий: ${formData.comment || "—"}
`;

    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text }),
      });

      setFormData({
        name: "",
        contact: "",
        region: "",
        type: "",
        comment: "",
      });

      showToast("Заявка отправлена! Мы скоро свяжемся с вами", "success");
    } catch (err) {
      showToast("Ошибка при отправке заявки", "error");
    }
  };

  return (
    <div className="form bg-[url('/zweBG.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4 ">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col gap-4
          w-full max-w-lg
          sm:max-w-md
          bg-white/60 backdrop-blur-sm px-6 py-6 rounded-2xl text-[#314D8B] shadow-lg
        "
      >
        <div className="text-center">
          <h2 className="font-bold text-2xl">Запуск фито-острова</h2>
          <h3 className="text-[#3E6BA8] text-sm sm:text-base">
            Оставьте заявку, и мы подберем эффективное решение
          </h3>
        </div>

        <input
          className="inputs w-full"
          placeholder="Имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className={`inputs w-full ${error ? "border-red-400" : ""}`}
          placeholder="Телефон или e-mail"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

        <select
          className="inputs w-full"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Выберите регион
          </option>
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
          className="inputs w-full"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Выберите тип водоёма
          </option>
          <option>Озеро</option>
          <option>Река</option>
          <option>Водохранилище</option>
          <option>Пруд</option>
          <option>Канал</option>
          <option>Другое</option>
        </select>

        <input
          className="inputs w-full"
          placeholder="Комментарий (необязательно)"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <button className="bg-[#314D8B] text-white p-3 rounded-2xl mt-4 w-full sm:w-auto">
          Оставить заявку
        </button>
      </form>

      {/* Toast notification */}
      {toast.message && (
        <div
          className={`fixed bottom-5 right-5 px-5 py-3 rounded-xl shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AddPage;
