import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';
import { API_PATHS } from '../../../../utils/apipaths';
import { toast } from 'react-toastify';

const BuyModal = ({ amount, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.USERS.PAYMENT, { amount });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (amount > 0) createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      toast.error(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      toast.success("Payment successful!");
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4">Complete Payment</h2>
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button
            disabled={!stripe}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Pay ${amount / 100}
          </button>
        </form>
        <button
          className="mt-4 text-red-500 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyModal;
