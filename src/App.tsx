import { Route, Routes } from "react-router-dom";
import { Home, AboutUs, Tickets, NotFound } from "./pages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import CurrentlyShowing from "./components/CurrentlyShowing";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/currently-showing" element={<CurrentlyShowing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
