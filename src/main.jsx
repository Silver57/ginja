import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import GinjasPage from "./GinjasPage.jsx";
import SobrePage from "./pages/SobrePage";
import MissaoPage from "./pages/MissaoPage";
import ContatoPage from "./pages/ContatoPage";
import VoluntarioPage from "./pages/VoluntarioPage";
import ArtigosPage from "./pages/ArtigosPage";
import SiteParaAssociacoesPage from "./pages/articles/SiteParaAssociacoesPage";

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
        <Route path="/artigos" element={<ArtigosPage />} />
        <Route path="/artigos/site-para-associacoes" element={<SiteParaAssociacoesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
