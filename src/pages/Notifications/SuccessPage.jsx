import { useSearchParams } from "react-router-dom"

 

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div>
      <h1>¡Pago Existoso!</h1>
      <p>Payment ID: {paymentId}</p>
      <p>Status: {status}</p>
    </div>
  );
};
