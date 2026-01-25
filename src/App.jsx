import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import OverviewPage from "./pages/OverviewPage";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="map" element={<OverviewPage />} />
          <Route path="add" element={<AddPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
  );
}

export default App;
