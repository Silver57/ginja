import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import GinjasPage from "./GinjasPage.jsx";
import SobrePage from "./pages/SobrePage";
import MissaoPage from "./pages/MissaoPage";
import ContatoPage from "./pages/ContatoPage";
import VoluntarioPage from "./pages/VoluntarioPage";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GinjasPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/missao" element={<MissaoPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/voluntario" element={<VoluntarioPage />} />
        <Route path="/participe" element={<VoluntarioPage />} />
        <Route path="/apoio" element={<ContatoPage />} />
        <Route path="/privacidade" element={<SobrePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
