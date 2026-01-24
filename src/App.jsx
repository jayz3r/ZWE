import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import OverviewPage from "./pages/OverviewPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="map" element={<OverviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
