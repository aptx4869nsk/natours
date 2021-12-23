/* eslint-disable */
import axios from 'axios';
import showAlert from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51K8fbCG5WUUglpFc88AnQzpl854bPdfIVYNzyy7VDqUTqgdVqyoM43SImRdLdunbWDptz3z8WbifWkdT1jkd3p8900iPhvmmKZ'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
