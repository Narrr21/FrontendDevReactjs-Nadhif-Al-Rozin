import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DetailView from "./pages/DetailView";
import MainView from "./pages/MainView";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/restaurant/:id" element={<DetailView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
