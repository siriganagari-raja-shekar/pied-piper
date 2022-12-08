import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import './CheckoutForm.scss';
import { userSignUp } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({user}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignUpError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    try {
        const { paymentIntent } = await stripe.confirmPayment({
            elements,  
            redirect: 'if_required'
        });
        if(paymentIntent.status === "succeeded"){
            const result = await userSignUp(user);
            if(result.status === "success"){
                setSignupSuccess(true);
                setTimeout(() => {
                    navigate('/signin');
                }, 5000);
            }
        }
    } catch (error) {
        setSignUpError(error.message);
        setTimeout(() => {
            navigate('/subscribe');
        }, 5000);
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h3>Subscription payment</h3>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {
        signupError
        &&
        <div className="alert alert-danger" role="alert">
            Something went wrong. Please try again. You are being redirected to the subscribe page again.
        </div>
      }
      {
          signupSuccess
          &&
          <div className="alert alert-success" role="alert">
              Payment and sign up successful. Please wait while you are being redirected to signin.
          </div>
      }
    </form>
  );
}