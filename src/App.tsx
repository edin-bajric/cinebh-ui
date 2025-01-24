import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  AboutUs,
  Tickets,
  NotFound,
  CurrentlyShowingPage,
  UpcomingPage,
  BuyTicketPage,
  BuyTicketPaymentPage
} from "./pages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import MovieDetails from "./components/MovieDetails";
import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store"; 

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"signin" | "signup">("signin");
  const { userToken } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const openLoginModal = () => {
    setModalType("signin");
    setModalOpen(true);
  };

  const closeLoginModal = () => {
    setModalOpen(false);
    setModalType("signin");
  };

  const shouldDisplayFooter =
    !(location.pathname === "/buy-ticket" && !userToken);

  return (
    <>
      <ScrollToTop />
      <Navbar
        isModalOpen={isModalOpen}
        modalType={modalType}
        openModal={openLoginModal}
        closeModal={closeLoginModal}
        setModalType={setModalType}
      />
      <div className="navbar_offset">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/currently-showing" element={<CurrentlyShowingPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route
            element={<ProtectedRoute openLoginModal={openLoginModal} />}
          >
            <Route path="/buy-ticket" element={<BuyTicketPage />} />
            <Route path="/buy-ticket-payment" element={<BuyTicketPaymentPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {shouldDisplayFooter && <Footer />}
    </>
  );
}

export default App;
