// components/Modal.jsx
import React, { useEffect, useRef } from "react";
import Gauge from "./Gauge";
import MetricRow from "./Metric";

export default function Modal({ isOpen, onClose, data }) {
  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      ref={modalRef}
      className="
        absolute
    top-46 md:top-20 lg:top-25
    right-0 md:right-15
    z-50
    pointer-events-auto
    rounded-2xl
    shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    max-h-[90vh]   /* limit modal height on small/rotated screens */
    overflow-y-auto /* enable vertical scrolling */
      "
    >
      {/* Horizontal scroll wrapper on small screens */}
      <div className="overflow-x-auto sm:overflow-x-visible ">
        <div
          className="
            inline-block
            pointer-events-auto
            w-[90%] sm:w-90
            max-w-95
            bg-white/50
            backdrop-blur-xl
            
            border border-white/40
            overflow-hidden
          "
        >
          <div className="p-4 sm:p-4 space-y-4">
            {/* HEADER */}
            <div className="flex w-full h-auto sm:h-30 rounded-tr-2xl overflow-hidden">
              <div className="flex flex-col justify-center flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-900">
                  {data.name}
                </h2>
                <p className="text-xs sm:text-sm text-blue-800">{data.type}</p>
                <p className="text-xs sm:text-sm text-blue-800">
                  {data.type_label}
                </p>
              </div>

              <div className="relative w-20 h-20 sm:w-45 sm:h-full shrink-0">
                <img
                  src={data.imageUrl}
                  className="w-full h-full object-cover mask-l-from-50% mask-l-to-90%"
                  loading="lazy"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div
              className="
                flex flex-col gap-1 p-2 sm:p-3
                bg-linear-to-b from-sky-100 to-sky-200
                border border-sky-200/60 rounded-xl
              "
            >
              <p className="font-medium text-xs sm:text-sm">
                {data.location.district}
              </p>
              <p className="font-medium text-xs sm:text-sm">
                {data.location.landmark}
              </p>
            </div>

            {/* METRICS */}
            <div className="space-y-2 sm:space-y-3">
              <MetricRow
                label="Координаты"
                value={`${data.location.coordinates.lat}, ${data.location.coordinates.lng}`}
              />

              <MetricRow
                label="Общая площадь"
                value={`${data.metrics.total_area_m2} м²`}
              />

              <MetricRow
                label="Площадь острова"
                value={`${data.metrics.islands_area_m2} м²`}
              />

              <MetricRow
                label="Время эксплуатации"
                value={`${data.metrics.exploitation_days} дней`}
              />

              <MetricRow label="Бионар" value={data.metrics.bionar_amount} />

              <MetricRow
                label="Аэробные бактерии"
                value={data.metrics.aerobic_bacteria_amount}
                underline={true}
              />

              <MetricRow label="Уровень качества воды" underline={false} />

              <Gauge
                qualityLevel={data.status.water_quality_level}
                label={data.status.water_quality_label}
                temp={data.status.temperature_c}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
