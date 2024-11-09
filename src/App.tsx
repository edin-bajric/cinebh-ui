import { Route, Routes } from "react-router-dom";
import { Home, AboutUs, Tickets, NotFound, CurrentlyShowingPage, UpcomingPage } from "./pages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/currently-showing" element={<CurrentlyShowingPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
