import { Route, Routes } from "react-router-dom";
import { Home, AboutUs, Tickets, NotFound } from "./pages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
