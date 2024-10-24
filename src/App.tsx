import { Route, Routes } from "react-router-dom";
import { Home, AboutUs, Tickets, NotFound } from "./pages";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
