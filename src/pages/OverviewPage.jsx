import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import locdot from "/locdot.svg";
import Modal from "../components/Modal";
import data from "/data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5ejNyIiwiYSI6ImNta2Y5MDl5bzA4cHYzZHNiNTI1bjRzZTYifQ.uwZNK7pqv30stDP6mlXQOw";

const lakesGeoJSON = {
  type: "FeatureCollection",
  features: data.data.map((lake) => ({
    type: "Feature",
    properties: {
      id: lake.id, // only id here
    },
    geometry: {
      type: "Point",
      coordinates: [
        lake.location.coordinates.lng,
        lake.location.coordinates.lat,
      ],
    },
  })),
};

export default function OverviewPage() {
  const mapRef = useRef(null);
  const [modalData, setModalData] = useState(null); // store info to show in modal

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/jayz3r/cmkfateu0002m01sf21yp5tao",
      center: [75.5, 41.5],
      zoom: 6,
      maxBounds: [
        [69.1, 39.2],
        [80.3, 43.3],
      ],
      fadeDuration: 0,
      preserveDrawingBuffer: false,
      attributionControl: false,
    });

    map.on("load", () => {
      map.resize();
      map.setPadding({ top: 40, bottom: 40, left: 40, right: 40 });

      map.addSource("lakes", { type: "geojson", data: lakesGeoJSON });

      const img = new Image();
      img.onload = () => {
        map.addImage("locdot-icon", img);

        map.addLayer({
          id: "lakes-symbol",
          type: "symbol",
          source: "lakes",
          layout: {
            "icon-image": "locdot-icon",
            "icon-size": 0.5,
            "icon-anchor": "bottom",
          },
        });
      };
      img.src = locdot;

      // Click handler for lakes
      map.on("click", "lakes-symbol", (e) => {
        const id = e.features[0].properties.id;

        const lake = data.data.find((item) => item.id === id);

        setModalData(lake); // now this is your REAL object
      });

      map.on(
        "mouseenter",
        "lakes-symbol",
        () => (map.getCanvas().style.cursor = "pointer"),
      );
      map.on(
        "mouseleave",
        "lakes-symbol",
        () => (map.getCanvas().style.cursor = ""),
      );
    });

    return () => map.remove();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-sky-100">
      <div
        ref={mapRef}
        className="w-[95%] h-[95%] rounded-xl shadow-xl overflow-hidden relative will-change-transform"
      />

      {/* Modal */}
      {modalData && (
        <Modal
          isOpen={true}
          onClose={() => setModalData(null)}
          data={modalData}
        />
      )}
    </div>
  );
}
