import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { slugToFile } from "./components/DocumentationSidebar"; // wherever you exported it

const basename = import.meta.env.PROD ? "/SemEval-2026-Task2" : undefined;

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* "/" -> overview */}
        <Route path="/" element={<Navigate to="/overview" replace />} />
        {/* "/:slug" -> map to file */}
        <Route path=":slug" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
