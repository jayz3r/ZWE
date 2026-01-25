import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import locdot from "/locdot.svg";
import Modal from "../components/Modal";
import data from "/data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamF5ejNyIiwiYSI6ImNta2Y5MDl5bzA4cHYzZHNiNTI1bjRzZTYifQ.uwZNK7pqv30stDP6mlXQOw";

export default function OverviewPage() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // store Mapbox instance
  const [modalData, setModalData] = useState(null);
  const location = useLocation(); // check if coming from Gallery with lakeId

  // Prepare GeoJSON for markers
  const lakesGeoJSON = {
    type: "FeatureCollection",
    features: data.data.map((lake) => ({
      type: "Feature",
      properties: { id: lake.id },
      geometry: {
        type: "Point",
        coordinates: [
          lake.location.coordinates.lng,
          lake.location.coordinates.lat,
        ],
      },
    })),
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/jayz3r/cmkfateu0002m01sf21yp5tao",
      center: [75.5, 41.5],
      zoom: 6,
      maxBounds: [
        [69.1, 39.2],
        [80.3, 43.3],
      ],
      attributionControl: false,
    });

    mapRef.current = map; // save instance

    map.on("load", () => {
      map.resize();

      // Add lakes source
      map.addSource("lakes", { type: "geojson", data: lakesGeoJSON });

      // Add custom marker image
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

      // Click on marker opens modal
      map.on("click", "lakes-symbol", (e) => {
        const id = e.features[0].properties.id;
        const lake = data.data.find((item) => item.id === id);
        if (lake) setModalData(lake);
      });

      map.on("mouseenter", "lakes-symbol", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "lakes-symbol", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, []);

  // Fly to lake if coming from Gallery "Подробнее" button
  useEffect(() => {
    const lakeId = location.state?.lakeId;
    if (lakeId && mapRef.current) {
      const lake = data.data.find((item) => item.id === lakeId);
      if (lake) {
        mapRef.current.flyTo({
          center: [lake.location.coordinates.lng, lake.location.coordinates.lat],
          zoom: 10,
          essential: true,
        });
        setModalData(lake); // optionally open modal immediately
      }
    }
  }, [location.state]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-sky-100">
      <div
        ref={mapContainerRef}
        className="w-[95%] h-[95%] rounded-xl shadow-xl overflow-hidden relative"
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
