import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "All you need to know about us",
}

export default function Privacy() {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="content-container">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At Rayvvin, we are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy
          outlines how we collect, use, and safeguard your data when you use our
          platform.
        </p>
        <p className="mb-4">
          <strong>1. Information We Collect:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Personal details (e.g., name, email, phone number) provided during
            account creation or checkout.
          </li>
          <li>
            Payment information (processed securely through trusted payment
            gateways).
          </li>
          <li>
            Browsing and purchase history to improve your shopping experience.
          </li>
          <li>Location data to connect you with vendors in your region.</li>
        </ul>
        <p className="mb-4">
          <strong>2. How We Use Your Information:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To process orders and facilitate transactions.</li>
          <li>
            To personalize your shopping experience and recommend relevant
            products.
          </li>
          <li>
            To communicate with you about orders, promotions, and updates.
          </li>
          <li>
            To improve our platform and services based on user feedback and
            behavior.
          </li>
        </ul>
        <p className="mb-4">
          <strong>3. Data Security:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            We use industry-standard encryption and security measures to protect
            your data.
          </li>
          <li>Your payment information is never stored on our servers.</li>
        </ul>
        <p className="mb-4">
          <strong>4. Sharing Information:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            We do not sell or share your personal information with third parties
            for marketing purposes.
          </li>
          <li>
            Information may be shared with vendors solely for order fulfillment.
          </li>
        </ul>
        <p className="mb-4">
          <strong>5. Your Rights:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            You have the right to access, update, or delete your personal
            information at any time.
          </li>
          <li>
            You can opt out of marketing communications by updating your
            preferences.
          </li>
        </ul>
        <p className="mb-4">
          By using Rayvvin, you agree to the terms of this Privacy Policy. For
          any questions or concerns, please contact us at{" "}
          <em>admin@rayvvin.com</em>.
        </p>
      </div>
    </div>
  )
}
