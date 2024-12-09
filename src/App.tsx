import { Route, Routes } from "react-router-dom";
import {
  Home,
  AboutUs,
  Tickets,
  NotFound,
  CurrentlyShowingPage,
  UpcomingPage,
  BuyTicketPage,
} from "./pages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import MovieDetails from "./components/MovieDetails";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="navbar_offset">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/currently-showing" element={<CurrentlyShowingPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/buy-ticket" element={<BuyTicketPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
