import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import locdot from "/locdot.png"; // png for speed
import Modal from "../components/Modal";
import data from "/data.json";

mapboxgl.accessToken = "pk.eyJ1IjoiamF5ejNyIiwiYSI6ImNta2Y5MDl5bzA4cHYzZHNiNTI1bjRzZTYifQ.uwZNK7pqv30stDP6mlXQOw";

export default function OverviewPage() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [modalData, setModalData] = useState(null);
  const location = useLocation();

  // ✅ 1. Memoize GeoJSON (build once only)
  const lakesGeoJSON = useMemo(() => ({
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
  }), []);

  // ✅ 2. Fast O(1) lookup instead of find()
  const lakeMap = useMemo(() => {
    const map = new Map();
    data.data.forEach((l) => map.set(l.id, l));
    return map;
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

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

    mapRef.current = map;

    map.on("load", () => {
  // SOURCE with clustering
  map.addSource("lakes", {
    type: "geojson",
    data: lakesGeoJSON,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  // CLUSTER CIRCLES
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "lakes",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "#38bdf8",
      "circle-radius": [
        "step",
        ["get", "point_count"],
        18,   // < 10 points
        10, 22, // 10–29
        30, 28  // 30+
      ],
      "circle-opacity": 0.9,
    },
  });

  // CLUSTER COUNT TEXT
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "lakes",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-size": 14,
      "text-font": ["Open Sans Bold"],
    },
    paint: {
      "text-color": "#ffffff",
    },
  });

  // LOAD ICON
  map.loadImage(locdot, (err, image) => {
    if (err) return;

    map.addImage("locdot-icon", image);

    // UNCLUSTERED POINTS
    map.addLayer({
      id: "unclustered-point",
      type: "symbol",
      source: "lakes",
      filter: ["!", ["has", "point_count"]],
      layout: {
        "icon-image": "locdot-icon",
        "icon-size": 0.1,
        "icon-anchor": "bottom",
      },
    });
  });

  // CLICK CLUSTER → ZOOM IN
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });

    const clusterId = features[0].properties.cluster_id;

    map.getSource("lakes").getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      }
    );
  });

  // CLICK SINGLE POINT → OPEN MODAL
  map.on("click", "unclustered-point", (e) => {
    const id = e.features[0].properties.id;
    const lake = lakeMap.get(id);

    if (lake) setModalData(lake);
  });

  // POINTER CURSOR
  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("mouseenter", "unclustered-point", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "unclustered-point", () => {
    map.getCanvas().style.cursor = "";
  });
});

    return () => map.remove();
  }, [lakesGeoJSON, lakeMap]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-sky-100">
      <div
        ref={mapContainerRef}
        className="w-[95%] h-[95%] rounded-xl shadow-xl overflow-hidden relative"
      />

      {modalData && (
        <Modal
          isOpen
          onClose={() => setModalData(null)}
          data={modalData}
        />
      )}
    </div>
  );
}
