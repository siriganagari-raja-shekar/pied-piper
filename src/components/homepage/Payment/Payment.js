import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./../CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser]  = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location.state){
        navigate("/subscribe");
    }
    else{
        setUser(location.state.user);
        console.log(user);
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PAYMENTS}config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PAYMENTS}create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>Subscription payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm user={user}/>
        </Elements>
      )}
    </>
  );
}

export default Payment;