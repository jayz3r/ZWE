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
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen w-full bg-sky-100">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-400 border-t-transparent"></div>
                    <p className="text-lg md:text-xl font-medium text-gray-700">
                      Загружаем карту...
                    </p>
                  </div>
                </div>
              }
            >
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
