import { useCheckout } from "@lib/context/checkout-context"
import { PaymentSession } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useElements, useStripe, useCheckout } from "@stripe/react-stripe-js"
import { useCart } from "medusa-react"
import React, { useEffect, useState } from "react"
import { PaystackButton } from "react-paystack"
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3"

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const { cart } = useCart()

  useEffect(() => {
    setNotReady(true)

    if (!cart) {
      return
    }

    if (!cart.shipping_address) {
      return
    }

    if (!cart.billing_address) {
      return
    }

    if (!cart.email) {
      return
    }

    if (cart.shipping_methods.length < 1) {
      return
    }

    setNotReady(false)
  }, [cart])

  switch (paymentSession?.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton session={paymentSession} notReady={notReady} />
      )
    case "paystack":
      return (
        <PayStackPaymentButton session={paymentSession} notReady={notReady} />
      )
    case "flutterwave":
      return (
        <FlutterwavePaymentButton
          session={paymentSession}
          notReady={notReady}
        />
      )
    case "manual":
      return <ManualTestPaymentButton notReady={notReady} />
    case "paypal":
      return (
        <PayPalPaymentButton notReady={notReady} session={paymentSession} />
      )
    default:
      return <Button className="!bg-[#CCCCCC] !border-[#CCCCCC] rounded-lg text-black" disabled>Select a payment method</Button>
  }
}

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""
const PayStackPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const txRef = String(session.data?.paystackTxRef)
  const total = cart?.total || 0
  const email = cart?.email || ""
  const currency =
    cart?.region.currency_code.toUpperCase() === "NGN" ? "NGN" : "NGN" || "NGN"

  return (
    <PaystackButton
      email={email}
      amount={total}
      reference={txRef}
      publicKey={PAYSTACK_PUBLIC_KEY}
      currency={currency}
      text="Pay with Paystack"
      onSuccess={onPaymentCompleted}
    />
  )
}

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("cardNumber")
  const {confirm} = useCheckout()

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [stripe, elements])

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !cart) {
      console.log(stripe);
      console.log(elements);
      // console.log(card);
      console.log(cart);
      setSubmitting(false)
      return
    }

    await confirm({
      billingAddress: {
        name:
          cart.billing_address.first_name +
          " " +
          cart.billing_address.last_name,
        address: {
          city: cart.billing_address.city ?? undefined,
          country: cart.billing_address.country_code ?? undefined,
          line1: cart.billing_address.address_1 ?? undefined,
          line2: cart.billing_address.address_2 ?? undefined,
          postal_code: cart.billing_address.postal_code ?? undefined,
          state: cart.billing_address.province ?? undefined,
        },}
        email: cart.email,
            phoneNumber: cart.billing_address.phone ?? undefined,
            redirect: 'always',
            returnUrl: "https://www.rayvvin.com/checkout"


    })
    .then(({ error, success, type }) => {
      if (type === 'error') {
        const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message)
          return
      }
      else if(type === 'success'){
        return onPaymentCompleted()
      }
      setLoading(false);
    })
    .finally(() => {
      setSubmitting(false)
    })
    
    // stripe
    //   .confirmCardPayment(session.data.client_secret as string, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         name:
    //           cart.billing_address.first_name +
    //           " " +
    //           cart.billing_address.last_name,
    //         address: {
    //           city: cart.billing_address.city ?? undefined,
    //           country: cart.billing_address.country_code ?? undefined,
    //           line1: cart.billing_address.address_1 ?? undefined,
    //           line2: cart.billing_address.address_2 ?? undefined,
    //           postal_code: cart.billing_address.postal_code ?? undefined,
    //           state: cart.billing_address.province ?? undefined,
    //         },
    //         email: cart.email,
    //         phone: cart.billing_address.phone ?? undefined,
    //       },
    //     },
    //   })
    //   .then(({ error, paymentIntent }) => {
    //     if (error) {
    //       const pi = error.payment_intent

    //       if (
    //         (pi && pi.status === "requires_capture") ||
    //         (pi && pi.status === "succeeded")
    //       ) {
    //         onPaymentCompleted()
    //       }

    //       setErrorMessage(error.message)
    //       return
    //     }

    //     if (
    //       (paymentIntent && paymentIntent.status === "requires_capture") ||
    //       paymentIntent.status === "succeeded"
    //     ) {
    //       return onPaymentCompleted()
    //     }

    //     return
    //   })
    //   .finally(() => {
    //     setSubmitting(false)
    //   })
    // }

  //   await stripe
  //     .confirmCardPayment(session.data.client_secret as string, {
  //       payment_method: {
  //         card: card,
  //         billing_details: {
  //           name:
  //             cart.billing_address.first_name +
  //             " " +
  //             cart.billing_address.last_name,
  //           address: {
  //             city: cart.billing_address.city ?? undefined,
  //             country: cart.billing_address.country_code ?? undefined,
  //             line1: cart.billing_address.address_1 ?? undefined,
  //             line2: cart.billing_address.address_2 ?? undefined,
  //             postal_code: cart.billing_address.postal_code ?? undefined,
  //             state: cart.billing_address.province ?? undefined,
  //           },
  //           email: cart.email,
  //           phone: cart.billing_address.phone ?? undefined,
  //         },
  //       },
  //     })
  //     .then(({ error, paymentIntent }) => {
  //       if (error) {
  //         const pi = error.payment_intent

  //         if (
  //           (pi && pi.status === "requires_capture") ||
  //           (pi && pi.status === "succeeded")
  //         ) {
  //           onPaymentCompleted()
  //         }

  //         setErrorMessage(error.message)
  //         return
  //       }

  //       if (
  //         (paymentIntent && paymentIntent.status === "requires_capture") ||
  //         paymentIntent.status === "succeeded"
  //       ) {
  //         return onPaymentCompleted()
  //       }

  //       return
  //     })
  //     .finally(() => {
  //       setSubmitting(false)
  //     })
  // }

  return (
    <>
      <Button
        disabled={submitting || disabled || notReady}
        onClick={handlePayment}
      >
        {submitting ? <Spinner /> : "Stripe Checkout"}
      </Button>
      {errorMessage && (
        <div className="text-red-500 text-small-regular mt-2">
          {errorMessage}
        </div>
      )}
    </>
  )
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

const PayPalPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: cart?.region.currency_code.toUpperCase(),
        intent: "authorize",
      }}
    >
      {errorMessage && (
        <span className="text-rose-500 mt-4">{errorMessage}</span>
      )}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async () => session.data.id as string}
        onApprove={handlePayment}
        disabled={notReady || submitting}
      />
    </PayPalScriptProvider>
  )
}

const FLW_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || ""

const config = {
  public_key: FLW_PUBLIC_KEY,
}

const FlutterwavePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const txRef = String(session.data?.flutterwaveTxRef)
  const total = cart?.total || 0
  const email = cart?.email || ""
  const phone = cart?.customer?.phone || ""
  const first_name = cart?.customer?.first_name || ""
  const last_name = cart?.customer?.last_name || ""
  const currency = cart?.region.currency_code
    ? cart?.region.currency_code.toUpperCase()
    : ""

  const fwConfig = {
    ...config,
    tx_ref: txRef,
    amount: total,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: `${first_name} ${last_name}`,
    },
    customizations: {
      title: "Afriomarkets",
      description: "Payment for items in cart",
      logo: "https://www.afriomarkets.com/_next/image?url=%2Fafriomarket_pngs%2Fafrio%20market%20-%20logo.png&w=256&q=75",
    },
    text: "Pay with Flutterwave!",
    callback: (response: any) => {
      onPaymentCompleted()
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  }

  return <FlutterWaveButton {...fwConfig} />
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted } = useCheckout()

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()

    setSubmitting(false)
  }

  return (
    <Button disabled={submitting || notReady} onClick={handlePayment}>
      {submitting ? <Spinner /> : "Checkout"}
    </Button>
  )
}

export default PaymentButton
