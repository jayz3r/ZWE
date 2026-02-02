import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";
import GalleryPage from "./pages/GalleryPage";
import IslandPage from "./pages/IslandPage";
import { lazy, Suspense } from "react";

const OverviewPage = lazy(() => import("./pages/OverviewPage"));
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="map"
          element={
            <Suspense fallback={<div>Loading map...</div>}>
              <OverviewPage />
            </Suspense>
          }
        />
        <Route path="add" element={<AddPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="island/:id" element={<IslandPage />} />
      </Route>
    </Routes>
  );
}

export default App;
