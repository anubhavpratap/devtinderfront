import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import dotenv from 'dotenv';

const plans = [
  {
    name: "Silver",
    price: "5.00",
    features: ["Basic Chat Access", "Limited Messages per Day", "No Ads"],
    badgeColor: "badge-neutral",
  },
  {
    name: "Gold",
    price: "10.00",
    features: [
      "Unlimited Chat",
      "Priority Support",
      "Exclusive Features",
      "Ad-Free Experience",
    ],
    badgeColor: "badge-warning",
  },
];

const MembershipPage = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const triggerToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const currentPlan = user?.membershipType;

  if (currentPlan === "Gold" || currentPlan === "Silver") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center">
        <div className="card bg-base-300 shadow-xl p-10">
          <h2 className="text-4xl font-bold mb-4 text-white">
            🎉 You are a {currentPlan} Member!
          </h2>
          <p className="text-lg text-white/80">
            Thank you for supporting us. Enjoy your exclusive features!
          </p>
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          clientId,
      }}
    >
      <div className="min-h-screen bg-base-100 py-12 px-4 flex flex-col items-center relative">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-white-800">
          Upgrade Your Membership
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="card bg-base-300 shadow-2xl rounded-3xl border border-gray-200 transition hover:scale-[1.02] duration-300"
            >
              <div className="card-body p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-white-800">
                    {plan.name} Plan
                  </h2>
                  <span
                    className={`badge ${plan.badgeColor} text-lg py-3 px-4`}
                  >
                    ${plan.price}
                  </span>
                </div>
                <ul className="space-y-2 text-white-600 font-medium mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="mr-2 text-white-500">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: plan.price },
                            description: `${plan.name} Membership`,
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const order = await actions.order.capture();

                      triggerToast(`✅ Payment successful for ${plan.name} plan!`, "success");

                      try {
                        const res = await axios.post(
                          BASE_URL + "/payment/verify",
                          {
                            orderID: order.id,
                            planName: plan.name,
                            emailId: user.emailId,
                          },
                          { withCredentials: true }
                        );
                        dispatch(addUser(res.data));

                      } catch (err) {
                        triggerToast("❌ Error saving payment info.", "error");
                      }
                    }}
                    onCancel={() => {
                      triggerToast("❌ Payment cancelled by user.", "error");
                    }}
                    onError={(err) => {
                      console.error("Payment Error:", err);
                      triggerToast("⚠️ Payment failed. Please try again.", "error");
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {showToast && (
          <div className="toast toast-top toast-center z-50 fixed">
            <div className={`alert alert-${toastType} text-white shadow-lg`}>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default MembershipPage;
