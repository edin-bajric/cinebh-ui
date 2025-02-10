import style from "./new-card.module.scss";
import Button from "../../../../Button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { BASE_URL } from "../../../../../constants";
import { SeatType } from "../../../../../utils/types";
import Popup from "../../Popup";

const NewCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { totalPrice, userEmail, projectionDetails, selectedSeats } =
    state || {};

  const appearance = {
    base: {
      fontSize: "16px",
      color: "rgba(52, 64, 84, 1)",
      fontFamily: "Urbanist, sans-serif",
      "::placeholder": {
        color: "rgba(102, 112, 133, 1)",
      },
    },
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    if (message) setMessage(null); 
  };
  
  const handleExpiryChange = (event: any) => {
    setExpiryComplete(event.complete);
    if (message) setMessage(null); 
  };
  
  const handleCvcChange = (event: any) => {
    setCvcComplete(event.complete);
    if (message) setMessage(null); 
  };

  const isFormComplete = cardComplete && expiryComplete && cvcComplete;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please try again later.");
      return;
    }
  
    setLoading(true);
  
    try {
      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });
  
      if (error) {
        setMessage(
          error.message || "An error occurred while creating the payment method."
        );
        setLoading(false);
        return;
      }
  
      const paymentResponse = await fetch(`${BASE_URL}/payments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalPrice * 100,
        }),
      });
  
      const paymentResult = await paymentResponse.json();
  
      if (paymentResponse.ok) {
        const ticketResponse = await fetch(`${BASE_URL}/tickets/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            projectionId: projectionDetails.projectionIds[0],
            selectedSeats: selectedSeats.map((seat: SeatType) => seat.id),
            totalPrice: totalPrice,
          }),
        });
  
        const ticketResult = await ticketResponse.json();
  
        if (ticketResponse.ok) {
          if (ticketResult.message && ticketResult.message !== "Ticket created successfully") {
            setMessage(ticketResult.message);
          }
          setIsPopupVisible(true);
        } else {
          setMessage(ticketResult.error || "Ticket creation failed.");
        }
      } else {
        setMessage(paymentResult.error || "Payment failed.");
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };  

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className={style.container}>
      <form className={style.card_form} onSubmit={handleSubmit}>
        <label>Card Number</label>
        <div className={style.stripe_element_wrapper}>
          <div className={style.stripe_element}>
            <CardNumberElement
              options={{ style: appearance }}
              onChange={handleCardChange}
            />
          </div>
        </div>
        <div className={style.expiry_cvc}>
          <div className={style.expiry}>
            <label>Expiry Date</label>
            <div className={style.stripe_element_wrapper}>
              <div className={style.stripe_element}>
                <CardExpiryElement
                  options={{ style: appearance }}
                  onChange={handleExpiryChange}
                />
              </div>
            </div>
          </div>
          <div className={style.cvc}>
            <label>CVC</label>
            <div className={style.stripe_element_wrapper}>
              <div className={style.stripe_element}>
                <CardCvcElement
                  options={{ style: appearance }}
                  onChange={handleCvcChange}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          text={
            loading
              ? "Processing..."
              : `Make Payment - ${totalPrice ? `${totalPrice} KM` : ""}`
          }
          type="submit"
          variant="solid"
          width="100%"
          disabled={loading || !isFormComplete || !stripe || !elements}
        />
      </form>

      {message && (
        <div className={style.message}>
          <p>{message.split(";")[0]} Please check your card details or try a different payment method.</p>
        </div>
      )}

      {isPopupVisible && (
        <Popup
          title="Payment Successful!"
          subtitle="The receipt and ticket have been sent to your email."
          buttonText="Back to Home"
          buttonAction={handleBackToHome}
          className={style.popup_button}
        />
      )}
    </div>
  );
};

export default NewCard;
