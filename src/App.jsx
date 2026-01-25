import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import OverviewPage from "./pages/OverviewPage";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="map" element={<OverviewPage />} />
        <Route path="add" element={<AddPage />} />

      </Route>
    </Routes>
  );
}

export default App;
