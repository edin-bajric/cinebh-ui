import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTimer = (initialTime: number, isPaymentRoute: boolean) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    return storedTimeLeft ? parseInt(storedTimeLeft, 10) : initialTime;
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsPopupVisible(true);
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("timeLeft", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isPaymentRoute) {
        localStorage.removeItem("timeLeft");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (!isPaymentRoute) {
        localStorage.removeItem("timeLeft");
      }
    };
  }, [isPaymentRoute]);

  const resetTimer = () => {
    setIsPopupVisible(false);
    setTimeLeft(initialTime);
    localStorage.setItem("timeLeft", initialTime.toString());
    window.location.reload();
    if (isPaymentRoute) {
      navigate(-1);
    }
  };

  return { timeLeft, isPopupVisible, resetTimer };
};

export default useTimer;
