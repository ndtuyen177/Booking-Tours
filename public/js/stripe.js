/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51LRs4LE5OLTv5bir0g5OWWDMBQ0gH2ERMqDP6bOmYhc5B5ODYoz9uowW7NFjgbcIzULWKjBkYhNDUvgLwSfnp56m00q8PZ3jVb'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
