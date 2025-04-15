import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import BackendConnectionFix from "./components/BackendConnectionFix";
import ConnectionTest from "./components/ConnectionTest";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/backend-fix" element={<BackendConnectionFix />} />
          <Route path="/connection-test" element={<ConnectionTest />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
