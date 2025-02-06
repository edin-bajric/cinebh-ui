import style from "./new-card.module.scss";
import Button from "../../../../Button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { BASE_URL } from "../../../../../constants";
import { SeatType } from "../../../../../utils/types";

const NewCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const appearance = {
    base: {
      fontSize: "16px",
      color: "#344054",
      fontFamily: "Urbanist, sans-serif",
      "::placeholder": {
        color: "#667085",
      },
    },
  };

  const location = useLocation();
  const { state } = location;
  const { totalPrice, userEmail, projectionDetails, selectedSeats } =
    state || {};

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
          error.message ||
            "An error occurred while creating the payment method."
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
          setMessage(
            ticketResult.message || "Payment and ticket creation successful!"
          );
          console.log(message);
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

  return (
    <div className={style.container}>
      <form className={style.card_form} onSubmit={handleSubmit}>
        <CardNumberElement options={{ style: appearance }} />
        <div className={style.expiry_cvc}>
          <div className={style.expiry}>
            <CardExpiryElement options={{ style: appearance }} />
          </div>
          <div className={style.cvc}>
            <CardCvcElement options={{ style: appearance }} />
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
          disabled={loading || !stripe || !elements}
        />
      </form>
    </div>
  );
};

export default NewCard;
